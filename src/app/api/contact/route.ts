import { Resend } from "resend";
import { site } from "@/config/site";
import { contactSchema, type ContactData } from "@/lib/contact";
import fr from "@/content/fr.json";

/**
 * POST /api/contact — envoi du formulaire de contact (docs/DESIGN.md §9).
 * Validation zod (même schéma que le formulaire), champ piège, limite de débit (Upstash Redis
 * si configuré, sinon mémoire du serveur), envoi via Resend (RESEND_API_KEY, CONTACT_TO_EMAIL,
 * CONTACT_FROM_EMAIL). Réponses : 200 { ok } · 400 { error: "invalid", fields } · 429 · 503 · 502.
 */

const WINDOW_S = 600;
const MAX_PER_WINDOW = 5;
const memory = new Map<string, { count: number; reset: number }>();

async function isRateLimited(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const key = `contact:${ip}`;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, String(WINDOW_S), "NX"],
        ]),
        cache: "no-store",
      });
      const [incr] = (await res.json()) as [{ result: number }];
      return incr.result > MAX_PER_WINDOW;
    } catch {
      // Redis indisponible : on retombe sur la limite en mémoire.
    }
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + WINDOW_S * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const labels = fr.contact.form;
const escape = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function render(data: ContactData) {
  const types = data.projectTypes.map((t) => labels.projectTypes.options[t]).join(", ");
  const rows: [string, string | undefined][] = [
    [labels.name.label, data.name],
    [labels.company.label, data.company],
    [labels.email.label, data.email],
    [labels.phone.label, data.phone],
    [labels.projectTypes.legend, types],
    [labels.budget.label, data.budget],
    [labels.timeline.label, data.timeline],
  ];
  const filled = rows.filter((r): r is [string, string] => !!r[1]);
  const text = [...filled.map(([k, v]) => `${k} : ${v}`), "", data.message].join("\n");
  const html = `<table cellpadding="6">${filled
    .map(([k, v]) => `<tr><th align="left">${escape(k)}</th><td>${escape(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escape(data.message)}</p>`;
  return { text, html, subject: `Nouvelle demande de projet — ${data.name}` };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Champ piège rempli : réponse identique à un succès, rien n'est envoyé.
  if (typeof body === "object" && body && "website" in body && (body as { website?: string }).website) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    return Response.json({ error: "invalid", fields }, { status: 400 });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  if (await isRateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const mail = render(parsed.data);

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production" || process.env.CONTACT_SIMULATE === "1") {
      // Développement et tests (CONTACT_SIMULATE=1) sans service d'e-mail : demande journalisée.
      console.info("[contact] Envoi simulé (RESEND_API_KEY / CONTACT_FROM_EMAIL absents)\n" + mail.text);
      return Response.json({ ok: true, simulated: true });
    }
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
  if (error) {
    console.error("[contact] Resend :", error.name);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
