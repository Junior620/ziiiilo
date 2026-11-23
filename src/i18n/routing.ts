import { defineRouting } from "next-intl/routing";
import { site } from "@/config/site";

/**
 * Routes FR / EN (docs/DESIGN.md §9 bis). Les dossiers de src/app/[locale] suivent
 * les chemins français ; next-intl réécrit les adresses anglaises traduites.
 */
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // Français à la racine pour tout le monde : pas de redirection selon le navigateur.
  localeDetection: false,
  // Pas d'en-tête hreflang vers /en tant que la traduction n'est pas publiée.
  alternateLinks: site.features.showEnglish,
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/services/[slug]": "/services/[slug]",
    "/solutions": "/solutions",
    "/solutions/fleetrent": "/solutions/fleetrent",
    "/solutions/doccloud": "/solutions/doccloud",
    "/realisations": { fr: "/realisations", en: "/work" },
    "/realisations/[slug]": { fr: "/realisations/[slug]", en: "/work/[slug]" },
    "/a-propos": { fr: "/a-propos", en: "/about" },
    "/faq": "/faq",
    "/contact": "/contact",
    "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
    "/confidentialite": { fr: "/confidentialite", en: "/privacy" },
    "/politique-cookies": { fr: "/politique-cookies", en: "/cookie-policy" },
    "/conditions-utilisation": { fr: "/conditions-utilisation", en: "/terms-of-use" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;

/** Langues effectivement publiées (l'anglais reste derrière `features.showEnglish`). */
export const publishedLocales: readonly Locale[] = site.features.showEnglish
  ? routing.locales
  : [routing.defaultLocale];
