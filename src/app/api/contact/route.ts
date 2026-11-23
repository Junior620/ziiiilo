/**
 * POST /api/contact — envoi du formulaire de contact (docs/DESIGN.md §9).
 * Implémenté à l'étape 4 : validation zod, champ piège, limite de débit, envoi via Resend
 * (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).
 */
export function POST() {
  return Response.json({ error: "not_implemented" }, { status: 501 });
}
