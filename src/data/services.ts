/**
 * Services ZIIIILO (docs/DESIGN.md §7, §9 bis). Slugs identiques en FR et en EN.
 * Les textes viennent de Figma (content/fr.json) ; les services 09 et 10 n'ont pas
 * de page de détail : leur bouton « Voir le détail du service » est masqué.
 */
export type Service = {
  numero: string;
  slug: string;
  /** Faux = pas de page /services/[slug] (bouton de détail masqué). */
  hasDetail: boolean;
  figma: { desktop: string | null; mobile: string | null };
};

export const SERVICES: readonly Service[] = [
  { numero: "01", slug: "sites-web", hasDetail: true, figma: { desktop: "68:6024", mobile: "68:11748" } },
  {
    numero: "02",
    slug: "applications-mobiles",
    hasDetail: true,
    figma: { desktop: "13:2161", mobile: "23:1975" },
  },
  {
    numero: "03",
    slug: "logiciels-sur-mesure",
    hasDetail: true,
    figma: { desktop: "68:6541", mobile: "68:12292" },
  },
  {
    numero: "04",
    slug: "transformation-digitale",
    hasDetail: true,
    figma: { desktop: "69:7091", mobile: "69:13736" },
  },
  { numero: "05", slug: "ui-ux-design", hasDetail: true, figma: { desktop: "69:7641", mobile: "69:14313" } },
  {
    numero: "06",
    slug: "automatisation-integration",
    hasDetail: true,
    figma: { desktop: "69:8170", mobile: "69:14869" },
  },
  {
    numero: "07",
    slug: "conseil-architecture",
    hasDetail: true,
    figma: { desktop: "70:8236", mobile: "70:15211" },
  },
  {
    numero: "08",
    slug: "maintenance-evolution",
    hasDetail: true,
    figma: { desktop: "70:8772", mobile: "70:15774" },
  },
  { numero: "09", slug: "data-science-ia", hasDetail: false, figma: { desktop: "167:40651", mobile: null } },
  {
    numero: "10",
    slug: "tableaux-de-bord-bi",
    hasDetail: false,
    figma: { desktop: "167:40737", mobile: null },
  },
];

export const getServicesWithDetail = () => SERVICES.filter((s) => s.hasDetail);
export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug && s.hasDetail);
