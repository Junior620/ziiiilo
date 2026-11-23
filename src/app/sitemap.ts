import type { MetadataRoute } from "next";
import { getEtudes } from "@/data/realisations";
import { getServicesWithDetail } from "@/data/services";
import { publishedLocales } from "@/i18n/routing";
import { localizedPath, siteUrl } from "@/lib/seo";

type Href = Parameters<typeof localizedPath>[0];

/** Plan du site : pages publiées dans les langues publiées (hreflang si `/en` est actif). */
export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: Href[] = [
    "/",
    "/services",
    ...getServicesWithDetail().map(({ slug }) => ({
      pathname: "/services/[slug]" as const,
      params: { slug },
    })),
    "/solutions",
    "/solutions/fleetrent",
    "/solutions/doccloud",
    "/realisations",
    ...getEtudes().map(({ slug }) => ({ pathname: "/realisations/[slug]" as const, params: { slug } })),
    "/a-propos",
    "/faq",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
    "/politique-cookies",
    "/conditions-utilisation",
  ];
  const url = (path: string) => new URL(path, siteUrl).toString();
  return hrefs.flatMap((href) =>
    publishedLocales.map((locale) => ({
      url: url(localizedPath(href, locale)),
      alternates:
        publishedLocales.length > 1
          ? { languages: Object.fromEntries(publishedLocales.map((l) => [l, url(localizedPath(href, l))])) }
          : undefined,
    })),
  );
}
