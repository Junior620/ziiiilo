import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { site } from "./config/site";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

/** Préfixes des langues non publiées (l'anglais tant que `features.showEnglish` est faux). */
const hiddenPrefixes = routing.locales
  .filter((l) => l !== routing.defaultLocale && !site.features.showEnglish)
  .map((l) => `/${l}`);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Langue non publiée : page introuvable (404), sans redirection.
  if (hiddenPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}/page-introuvable`;
    return NextResponse.rewrite(url);
  }

  return handleI18n(request);
}

export const config = {
  // Ignore l'API, les fichiers internes de Next/Vercel et les fichiers avec extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
