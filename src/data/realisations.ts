/**
 * Portfolio ZIIIILO (docs/DESIGN.md §3, §7, §12).
 *
 * - `categories` = filtres de la page Réalisations (9 filtres v2.4, classement du tableau v2.4).
 * - `tags` = domaines et technologies affichés sur les cartes et les pages (distincts des filtres).
 * - Les statuts viennent d'ici, jamais codés en dur dans les composants.
 * - Aucun texte éditorial ici : titres, descriptions et tags d'affichage viennent de Figma
 *   (content/fr.json), ajoutés avec chaque page.
 */
import { site } from "@/config/site";

export const CATEGORIES = [
  "produits-ziiiilo",
  "sites-web",
  "applications-mobiles",
  "solutions-metiers",
  "intelligence-artificielle",
  "data-science",
  "creativetech",
  "saas",
] as const;
export type Categorie = (typeof CATEGORIES)[number];

/** Filtres dans l'ordre v2.4 : « Tous les projets » puis les catégories. */
export const FILTRES = ["tous", ...CATEGORIES] as const;
export type Filtre = (typeof FILTRES)[number];

export type TypeRealisation = "produit" | "solution-metier" | "realisation-client";

export type Statut =
  | "en-developpement"
  | "a-confirmer"
  | "disponible"
  | "en-ligne"
  | "pilote-en-preparation"
  | "en-production"
  | "livree-modules-en-evolution"
  | "solution-metier-interne";

/** Statuts « actifs » : pastille qui pulse (§8 n° 16). */
export const STATUTS_ACTIFS: readonly Statut[] = ["disponible", "en-ligne", "en-production"];

export type Route =
  | { pathname: "/solutions/fleetrent" }
  | { pathname: "/solutions/doccloud" }
  | { pathname: "/realisations/[slug]"; params: { slug: string } };

export type Realisation = {
  slug: string;
  nom: string;
  type: TypeRealisation;
  client: string | null;
  realisePar: "ZIIIILO" | "ZIIIILO SARL";
  roleZiiiilo: "conception-developpement" | "refonte" | "a-confirmer" | null;
  categories: readonly Categorie[];
  tags: readonly string[];
  statut: Statut;
  /** Lien externe (nouvel onglet). `null` = aucun lien (application interne, pas de site public). */
  siteUrl: string | null;
  route: Route;
  /** Mise en avant sur l'accueil (4 blocs, v2.6). */
  featured: boolean;
  /** Faux = page et cartes masquées. */
  published: boolean;
  /** Droits de propriété intellectuelle revendiqués par ZIIIILO. */
  ipRevendiquee: boolean;
  /** Maquette desktop de l'étude ou de la page produit (Figma). */
  figma: { desktop: string; mobile: string };
};

const etude = (slug: string): Route => ({ pathname: "/realisations/[slug]", params: { slug } });

/** Ordre : les 4 réalisations à la une, puis les 7 autres (ordre à vérifier sur Figma, étape 4). */
const REALISATIONS: readonly Realisation[] = [
  {
    slug: "fleetrent",
    nom: "FleetRent",
    type: "produit",
    client: null,
    realisePar: "ZIIIILO",
    roleZiiiilo: null,
    categories: ["produits-ziiiilo", "saas", "applications-mobiles"],
    tags: [],
    statut: "en-developpement",
    siteUrl: null,
    route: { pathname: "/solutions/fleetrent" },
    featured: true,
    published: true,
    ipRevendiquee: true,
    figma: { desktop: "15:2676", mobile: "24:2440" },
  },
  {
    slug: "cocoatrack",
    nom: "CocoaTrack",
    type: "realisation-client",
    client: "STE-SCPB",
    realisePar: "ZIIIILO SARL",
    roleZiiiilo: null,
    categories: ["solutions-metiers", "data-science"],
    tags: ["AgriTech", "GeoTech", "Traçabilité", "Intelligence satellite"],
    statut: "solution-metier-interne",
    siteUrl: null, // application interne : aucun lien externe
    route: etude("cocoatrack"),
    featured: true,
    published: site.publication.cocoatrack,
    ipRevendiquee: false,
    figma: { desktop: "319:1014", mobile: "325:1796" },
  },
  {
    slug: "ste-scpb",
    nom: "STE-SCPB",
    type: "solution-metier",
    client: "STE-SCPB",
    realisePar: "ZIIIILO SARL",
    roleZiiiilo: "conception-developpement",
    categories: ["sites-web", "solutions-metiers"],
    tags: [],
    statut: "en-production",
    siteUrl: "https://ste-scpb.com",
    route: etude("ste-scpb"),
    featured: true,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "233:23711", mobile: "240:19126" },
  },
  {
    slug: "ninety-one-foot-academy",
    nom: "Ninety One Foot Academy",
    type: "solution-metier",
    client: "Ninety One Foot Academy",
    realisePar: "ZIIIILO SARL",
    roleZiiiilo: "conception-developpement",
    categories: ["sites-web", "applications-mobiles", "solutions-metiers"],
    tags: [],
    statut: "livree-modules-en-evolution",
    siteUrl: "https://www.ninetyonefootacademy.com/fr/accueil",
    route: etude("ninety-one-foot-academy"),
    featured: true,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "278:25463", mobile: "281:20482" },
  },
  {
    slug: "doccloud",
    nom: "DocCloud",
    type: "produit",
    client: null,
    realisePar: "ZIIIILO",
    roleZiiiilo: null,
    categories: ["produits-ziiiilo", "saas"],
    tags: [],
    statut: "en-developpement",
    siteUrl: null,
    route: { pathname: "/solutions/doccloud" },
    featured: false,
    published: true,
    ipRevendiquee: true,
    figma: { desktop: "90:11552", mobile: "92:9403" },
  },
  {
    slug: "scpb-commercial",
    nom: "SCPB Commercial",
    type: "solution-metier", // jamais « produit »
    client: "SCPB",
    realisePar: "ZIIIILO",
    roleZiiiilo: "a-confirmer",
    categories: ["solutions-metiers", "intelligence-artificielle"],
    tags: [],
    statut: "a-confirmer",
    siteUrl: null,
    route: etude("scpb-commercial"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "103:11672", mobile: "111:11199" },
  },
  {
    slug: "staftrack",
    nom: "StafTrack",
    type: "solution-metier",
    client: "SCPB",
    realisePar: "ZIIIILO",
    roleZiiiilo: "conception-developpement",
    categories: ["solutions-metiers"],
    tags: [],
    statut: "disponible",
    siteUrl: "https://staf-track.com",
    route: etude("staftrack"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "126:14817", mobile: "131:14099" },
  },
  {
    slug: "previsions-cacao-robusta",
    nom: "Prévisions Cacao & Robusta",
    type: "solution-metier",
    client: "SCPB",
    realisePar: "ZIIIILO",
    roleZiiiilo: "conception-developpement",
    categories: ["solutions-metiers", "data-science", "intelligence-artificielle"],
    tags: [],
    statut: "en-ligne",
    siteUrl: "https://forecast.ste-scpb.com",
    route: etude("previsions-cacao-robusta"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "149:20336", mobile: "157:17634" },
  },
  {
    slug: "scpb-survey",
    nom: "SCPB Survey",
    type: "solution-metier",
    client: "SCPB",
    realisePar: "ZIIIILO",
    roleZiiiilo: "conception-developpement",
    categories: ["solutions-metiers", "applications-mobiles"],
    tags: [],
    statut: "pilote-en-preparation",
    siteUrl: null, // Android (APK interne), pas de site public
    route: etude("scpb-survey"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "200:23564", mobile: "204:16328" },
  },
  {
    slug: "golden-beans",
    nom: "Golden Beans SA",
    type: "solution-metier",
    client: "Golden Beans SA",
    realisePar: "ZIIIILO SARL",
    roleZiiiilo: "conception-developpement",
    categories: ["sites-web", "solutions-metiers", "intelligence-artificielle"],
    tags: [],
    statut: "en-production",
    siteUrl: "https://goldenbeans.cm",
    route: etude("golden-beans"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "262:24524", mobile: "266:19740" },
  },
  {
    slug: "agora-film-invest",
    nom: "Agora Film Invest",
    type: "realisation-client",
    client: "Agora Film Invest",
    realisePar: "ZIIIILO",
    roleZiiiilo: "refonte", // le pied de page public mentionne encore Fastgraphiste
    categories: ["sites-web", "creativetech"],
    tags: [],
    statut: "en-production",
    siteUrl: "https://www.agorafilminvest.com/",
    route: etude("agora-film-invest"),
    featured: false,
    published: true,
    ipRevendiquee: false,
    figma: { desktop: "297:27498", mobile: "300:22316" },
  },
];

/** Volets de Ninety One Foot Academy (§3) : statuts réels par volet. */
export const voletsN91 = {
  siteOfficiel: "en-production",
  espacePrive: "partiel",
  matchlabWeb: "livre",
  matchlabMobile: "v1",
  laboratoireIA: "non-connecte",
} as const;

/** Statut par module de SCPB Survey (§3) : ne jamais tout afficher « Disponible ». */
export const modulesSurvey = {
  disponible: [
    "planteurs",
    "consentement",
    "enquete-menage",
    "scolarisation",
    "enquete-annuelle",
    "campagnes",
    "partage-par-site",
    "formations-missions",
    "synchronisation",
    "administration",
  ],
  finalisation: {
    parcelles: "en test",
    clmrs: "moteur prêt, branchement à faire",
    questionnaires: "diffusion aux téléphones à faire",
  },
  maquette: ["tracabilite-lots", "espace-auditeur"],
} as const;

export function isCategorie(value: string | null | undefined): value is Categorie {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}

/** Réalisations publiées, filtrées par catégorie (filtre « tous » ou absent = toutes). */
export function getRealisations(options: { categorie?: Filtre | null } = {}): Realisation[] {
  const { categorie } = options;
  return REALISATIONS.filter(
    (r) => r.published && (!categorie || categorie === "tous" || r.categories.includes(categorie)),
  );
}

export function getFeaturedRealisations(): Realisation[] {
  return getRealisations().filter((r) => r.featured);
}

/** Études de réalisation publiées (pages /realisations/[slug]). */
export function getEtudes(): Realisation[] {
  return getRealisations().filter((r) => r.route.pathname === "/realisations/[slug]");
}

export function getRealisation(slug: string): Realisation | undefined {
  return getRealisations().find((r) => r.slug === slug);
}
