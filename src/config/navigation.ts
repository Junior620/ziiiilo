/**
 * Plan de navigation (docs/DESIGN.md §9 bis). Les clés renvoient à `nav.*` dans content/*.json.
 * Le lien actif correspond à la rubrique : un détail service active « Services »,
 * une étude active « Réalisations », FleetRent et DocCloud activent « Solutions ».
 */
export const MAIN_NAV = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "solutions", href: "/solutions" },
  { key: "realisations", href: "/realisations" },
  { key: "about", href: "/a-propos" },
  { key: "contact", href: "/contact" },
] as const;

export type MainNavKey = (typeof MAIN_NAV)[number]["key"];

/** Rubrique active d'après le chemin interne (sans préfixe de langue). */
export function activeSection(pathname: string): MainNavKey | null {
  if (pathname === "/") return "home";
  const match = MAIN_NAV.find((item) => item.href !== "/" && pathname.startsWith(item.href));
  return match?.key ?? null;
}

/** Services du footer desktop (6) et mobile (4), dans l'ordre Figma 5:202 / 5:255. */
export const FOOTER_SERVICES = [
  "sites-web",
  "applications-mobiles",
  "logiciels-sur-mesure",
  "transformation-digitale",
  "ui-ux-design",
  "automatisation-integration",
] as const;
