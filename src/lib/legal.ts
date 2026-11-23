import { site } from "@/config/site";

/**
 * Valeurs des pages juridiques lues dans `site.ts` (jamais dans les textes) : une valeur vide
 * s'affiche « À configurer » (docs/DESIGN.md §12). Les clés sans champ dans `site.ts`
 * (tableau des cookies, sécurité, localisation des serveurs) restent à configurer.
 */
export type LegalValue = { text: string; href?: string } | null;

const hosts = site.legal.hosts;
const value = (text: string, href?: string): LegalValue => (text ? { text, href } : null);

const resolvers: Record<string, () => LegalValue> = {
  companyName: () => value(site.legal.companyName),
  capital: () => value(site.legal.capital ? `${site.legal.capital} (XAF)` : ""),
  headOffice: () => value(site.legal.headOffice ? `${site.legal.headOffice}, Cameroun` : ""),
  rccm: () => value(site.legal.rccm),
  niu: () => value(site.legal.niu ? `NIU : ${site.legal.niu}` : ""),
  email: () => value(site.contact.email, `mailto:${site.contact.email}`),
  phone: () => value(site.contact.phone, site.contact.phoneHref),
  publisher: () =>
    value([site.legal.publisher, site.legal.publisherRole as string].filter(Boolean).join(", ")),
  hostNames: () => value(hosts.map((h) => h.name).join(" et ")),
  hostAddresses: () => value(hosts.map((h) => `${h.name} — ${h.address}`).join("\n")),
  governingLaw: () => value(site.legal.governingLaw),
  retention: () => value(site.legal.retention),
  emailService: () => value(site.legal.emailService),
  analyticsTool: () => value(site.legal.analyticsTool),
  updatedAt: () => value(site.legal.updatedAt),
};

export function resolveLegal(key: string): LegalValue {
  return resolvers[key]?.() ?? null;
}
