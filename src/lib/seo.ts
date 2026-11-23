import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { publishedLocales, type Locale } from "@/i18n/routing";
import { getOgPage } from "@/lib/og/pages";
import { OG_SIZE } from "@/lib/og/size";

type Href = Parameters<typeof getPathname>[0]["href"];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Adresse publique d'une route dans une langue (préfixe de langue compris). */
export const localizedPath = (href: Href, locale: Locale) => getPathname({ href, locale });

const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };

/** Identifiant de l'image de partage d'une route (voir `src/lib/og/pages.ts`). */
function ogIdFor(href: Href): string {
  const pathname = typeof href === "string" ? href : href.pathname;
  const slug = typeof href === "object" && "params" in href ? String(href.params?.slug ?? "") : "";
  if (pathname === "/") return "accueil";
  if (pathname === "/realisations/[slug]") return `etude-${slug}`;
  if (pathname === "/services/[slug]") return `service-${slug}`;
  if (pathname.startsWith("/solutions/")) return `produit-${pathname.slice("/solutions/".length)}`;
  return pathname.slice(1);
}

/**
 * Image de partage 1200 × 630 (JPEG, URL absolue via `metadataBase`). Le texte alternatif
 * reprend le titre écrit sur l’image ; une page sans image propre prend celle de l’accueil.
 */
export async function ogImage(requested: string, locale: Locale) {
  const t = await getTranslations({ locale, namespace: "og" });
  const page = await getOgPage(locale, requested);
  const id = page ? requested : "accueil";
  const title = (page ?? (await getOgPage(locale, id)))?.title ?? site.name;
  return {
    url: `/og/${locale}/${id}.jpg`,
    ...OG_SIZE,
    type: "image/jpeg",
    alt: t("alt", { title }),
  };
}

/**
 * Métadonnées d'une page (§SEO) : titre « [Page] — ZIIIILO » (gabarit du layout), description =
 * chapô, URL canonique, Open Graph et carte X avec l'image de la page. Hreflang seulement
 * quand `/en` est publié (`showEnglish`).
 */
export async function buildMetadata({
  title,
  description,
  href,
  shareTitle,
}: {
  title: string | { absolute: string };
  description?: string;
  href: Href;
  /** Titre des aperçus de partage, s’il doit différer du titre de l’onglet (accueil). */
  shareTitle?: string;
}): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const canonical = localizedPath(href, locale);
  const languages =
    publishedLocales.length > 1
      ? Object.fromEntries(publishedLocales.map((l) => [l, localizedPath(href, l)]))
      : undefined;
  const ogTitle = shareTitle ?? (typeof title === "string" ? `${title} — ${site.name}` : title.absolute);
  const image = await ogImage(ogIdFor(href), locale);
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: publishedLocales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
