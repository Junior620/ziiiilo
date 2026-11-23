import { existsSync } from "node:fs";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { getEtudes } from "@/data/realisations";
import { getServicesWithDetail } from "@/data/services";
import type { Locale } from "@/i18n/routing";

/**
 * Contenu des images de partage, page par page : surtitre et titre repris des textes du site
 * (en-têtes de page, cartes de réalisation), visuel réel du projet quand il existe.
 */
export type OgPage = {
  eyebrow: string;
  title: string;
  /** Chemin sous `public/` du visuel du projet ; absent = composition de marque. */
  image?: string;
  /** Composition de l'accueil (repères « Web & mobile », « Produits SaaS »…). */
  markers?: string[];
};

/** Pages simples : espace de noms de l'en-tête de page → identifiant d'image. */
const HEADER_PAGES = {
  services: "services",
  solutions: "solutions",
  realisations: "realisations",
  "a-propos": "about",
  contact: "contact",
  faq: "faq",
  "mentions-legales": "legalNotice",
  confidentialite: "privacy",
  "politique-cookies": "cookiePolicy",
  "conditions-utilisation": "terms",
} as const;

const HEADER_IMAGES: Partial<Record<keyof typeof HEADER_PAGES, string>> = {
  solutions: "media/realisations/couverture-fleetrent.webp",
  realisations: "media/realisations/couverture-ste-scpb.webp",
};

/** Identifiants de toutes les images (accueil, pages, services, produits, études). */
export function ogIds(): string[] {
  return [
    "accueil",
    ...Object.keys(HEADER_PAGES),
    ...getServicesWithDetail().map((s) => `service-${s.slug}`),
    "produit-fleetrent",
    "produit-doccloud",
    ...getEtudes().map((r) => `etude-${r.slug}`),
  ];
}

const publicFile = (path: string) => existsSync(join(process.cwd(), "public", path));

/** Premier visuel réel disponible pour une réalisation (couverture, visuel de solution, vignette). */
function projectImage(slug: string): string | undefined {
  return [
    `media/realisations/couverture-${slug}.webp`,
    `media/solutions/${slug}.webp`,
    `media/realisations/vignette-${slug}.webp`,
  ].find(publicFile);
}

type Badge = { label: string };
type Item = {
  title: string;
  card?: { badge?: Badge };
  featured?: { badges?: Badge[] };
  mobile?: { badges?: Badge[] };
};

export async function getOgPage(locale: Locale, id: string): Promise<OgPage | null> {
  if (!ogIds().includes(id)) return null;

  if (id === "accueil") {
    const t = await getTranslations({ locale, namespace: "home.hero" });
    return {
      eyebrow: t("badge"),
      title: t("title"),
      markers: [t("markers.web"), t("markers.software"), t("markers.saas")],
    };
  }

  if (id in HEADER_PAGES) {
    const key = id as keyof typeof HEADER_PAGES;
    const t = await getTranslations({ locale, namespace: `${HEADER_PAGES[key]}.header` as "faq.header" });
    return { eyebrow: t("eyebrow"), title: t("title"), image: HEADER_IMAGES[key] };
  }

  if (id.startsWith("service-")) {
    const slug = id.slice("service-".length);
    const t = await getTranslations({ locale, namespace: "serviceDetail" });
    const nav = await getTranslations({ locale, namespace: "nav" });
    return {
      eyebrow: nav("services"),
      title: t(`items.${slug}.title` as "eyebrow"),
      image: `media/services/${slug}.webp`,
    };
  }

  const slug = id.replace(/^(produit|etude)-/, "");
  const t = await getTranslations({ locale, namespace: "realisations" });
  const item = t.raw(`items.${slug}` as "header") as unknown as Item;
  const eyebrow =
    item.card?.badge?.label ?? item.featured?.badges?.[0]?.label ?? item.mobile?.badges?.[0]?.label ?? "";
  return { eyebrow, title: item.title, image: projectImage(slug) };
}
