import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { site } from "./config/site";
import { getEtudes } from "./data/realisations";
import { getServicesWithDetail } from "./data/services";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

/** Préfixes des langues non publiées (l'anglais tant que `features.showEnglish` est faux). */
const hiddenPrefixes = routing.locales
  .filter((l) => l !== routing.defaultLocale && !site.features.showEnglish)
  .map((l) => `/${l}`);

/**
 * Slugs connus des routes dynamiques. Avec Cache Components, un slug inconnu serait rendu à la
 * demande et notFound() arriverait après le début du flux (statut 200) : on le rejette ici
 * pour répondre un vrai 404 dès la première visite.
 */
const knownSlugs: Record<string, ReadonlySet<string>> = {
  realisations: new Set(getEtudes().map((r) => r.slug)),
  services: new Set(getServicesWithDetail().map((s) => s.slug)),
};
const dynamicRoute = new RegExp(`^(?:/${routing.defaultLocale})?/(realisations|services)/([^/]+)/?$`);

/** Page introuvable (404) sans redirection : la route attrape-tout appelle notFound(). */
function notFoundRewrite(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${routing.defaultLocale}/page-introuvable`;
  return NextResponse.rewrite(url);
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Langue non publiée : page introuvable.
  if (hiddenPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return notFoundRewrite(request);
  }

  const match = dynamicRoute.exec(pathname);
  if (match && !knownSlugs[match[1]].has(decodeURIComponent(match[2]))) {
    return notFoundRewrite(request);
  }

  return handleI18n(request);
}

export const config = {
  // Ignore l'API, les fichiers internes de Next/Vercel et les fichiers avec extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
