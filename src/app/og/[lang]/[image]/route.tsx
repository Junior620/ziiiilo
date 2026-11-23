import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { publishedLocales, type Locale } from "@/i18n/routing";
import { getOgPage, ogIds } from "@/lib/og/pages";
import { renderOgImage } from "@/lib/og/render";
import { siteUrl } from "@/lib/seo";

/**
 * Images de partage (Open Graph, X, LinkedIn, WhatsApp) : /og/<langue>/<page>.jpg, 1200 × 630.
 * Toutes générées au build ; l'adresse contient un point, donc le proxy i18n ne s'applique pas.
 */
export function generateStaticParams() {
  return publishedLocales.flatMap((lang) => ogIds().map((id) => ({ lang, image: `${id}.jpg` })));
}

async function render(lang: Locale, id: string): Promise<Uint8Array | null> {
  "use cache";
  const page = await getOgPage(lang, id);
  if (!page) return null;
  const t = await getTranslations({ locale: lang, namespace: "og" });
  return renderOgImage(page, t("tagline"), new URL(siteUrl).host);
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[lang]/[image]">) {
  const { lang, image } = await params;
  const id = image.replace(/\.jpg$/, "");
  if (!image.endsWith(".jpg") || !hasLocale(publishedLocales, lang)) {
    return new Response("Not found", { status: 404 });
  }
  const bytes = await render(lang, id);
  if (!bytes) return new Response("Not found", { status: 404 });
  return new Response(bytes as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
