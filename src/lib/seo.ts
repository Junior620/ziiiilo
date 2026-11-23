import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { site } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { publishedLocales, type Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Adresse publique d'une route dans une langue (préfixe de langue compris). */
export const localizedPath = (href: Href, locale: Locale) => getPathname({ href, locale });

/**
 * Métadonnées d'une page (§SEO) : titre « [Page] — ZIIIILO » (gabarit du layout), description =
 * chapô, URL canonique, Open Graph. Hreflang seulement quand `/en` est publié (`showEnglish`).
 */
export async function buildMetadata({
  title,
  description,
  href,
}: {
  title: string | { absolute: string };
  description?: string;
  href: Href;
}): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const canonical = localizedPath(href, locale);
  const languages =
    publishedLocales.length > 1
      ? Object.fromEntries(publishedLocales.map((l) => [l, localizedPath(href, l)]))
      : undefined;
  const ogTitle = typeof title === "string" ? `${title} — ${site.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/brand/ziiiilo-logo-couleur-2536px.png", alt: site.name }],
    },
  };
}
