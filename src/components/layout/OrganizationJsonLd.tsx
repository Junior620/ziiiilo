import { site } from "@/config/site";
import { siteUrl } from "@/lib/seo";

/** JSON-LD Organization (toutes les pages) : coordonnées réelles de `site.ts` uniquement. */
export function OrganizationJsonLd() {
  const sameAs = Object.values(site.social as Record<string, string>).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legal.companyName,
    alternateName: site.name,
    url: siteUrl,
    logo: new URL("/brand/ziiiilo-logo-couleur-2536px.png", siteUrl).toString(),
    email: site.contact.email,
    telephone: site.contact.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bonamoussadi – Rond-point Maetur",
      postOfficeBoxNumber: "8283",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
