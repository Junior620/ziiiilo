/**
 * Configuration du site ZIIIILO (docs/DESIGN.md §12, §1 bis).
 *
 * Règle : aucune valeur inventée. Une chaîne vide = « À configurer » :
 * le bloc qui l'affiche est masqué (voir `isConfigured`), jamais rempli par un exemple.
 */
export const site = {
  name: "ZIIIILO",
  url: "https://ziiiilo.tech",

  contact: {
    /** Adresse affichée et adresse de réception du formulaire. */
    email: "christian.momo@ziiiilo.tech",
    phone: "+237 695 607 089",
    phoneHref: "tel:+237695607089",
    /** À configurer : seulement si un numéro WhatsApp distinct est confirmé. */
    whatsapp: "",
    address: "Bonamoussadi – Rond-point Maetur, BP 8283 Douala",
  },

  /** N'afficher que les comptes réels (URL fournies par ZIIIILO). */
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },

  legal: {
    companyName: "ZIIIILO SARL",
    capital: "900 000 FCFA",
    niu: "M012318000983X",
    /** À configurer : numéro complet (préfixe connu : RC/DLA/2023/B/). */
    rccm: "",
    headOffice: "Bonamoussadi – Rond-point Maetur, BP 8283 Douala",
    publisher: "DJOUNDA NGAPGHO MOMO Christian",
    /** À configurer : fonction du directeur de la publication. */
    publisherRole: "",
    hosts: [
      {
        name: "Vercel Inc.",
        address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
      },
      {
        name: "Cloudflare, Inc.",
        address: "101 Townsend Street, San Francisco, CA 94107, États-Unis",
      },
    ],
    /** À configurer avant mise en ligne (texte à valider par un juriste). */
    emailService: "",
    retention: "",
    analyticsTool: "",
    governingLaw: "",
    updatedAt: "",
  },

  features: {
    /** Section Équipe de la page À propos : masquée tant qu'aucun vrai membre n'est fourni. */
    showTeam: false,
    /** Publier /en une fois la traduction relue par ZIIIILO (§10). */
    showEnglish: false,
  },

  /** Publication soumise à validation du client. */
  publication: {
    /** CocoaTrack : soumis à l'accord de STE-SCPB. Passer à false pour masquer page et cartes. */
    cocoatrack: true,
  },

  /**
   * Splash d'ouverture (§8 v2.8) : première visite de la session, sur l'accueil uniquement.
   * Durée validée le 23/11/2026 : ≈ 13,8 s ; « Passer » visible dès 30 %.
   */
  splash: {
    enabled: true,
    durationMs: 13800,
    /** Au-delà, ouverture même si le chargement réel n'est pas fini. */
    maxLoadMs: 12000,
  },

  form: {
    /** Fourchettes de budget et délais : à valider par ZIIIILO (§9). */
    budgets: [] as string[],
    timelines: [] as string[],
  },
} as const;

export type SiteConfig = typeof site;

/** Vrai si la valeur est renseignée (chaîne non vide, tableau non vide). */
export function isConfigured(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
}

/** Comptes sociaux réellement configurés, dans l'ordre du footer. */
export function configuredSocials() {
  return (Object.entries(site.social) as [keyof typeof site.social, string][])
    .filter(([, href]) => isConfigured(href))
    .map(([network, href]) => ({ network, href }));
}
