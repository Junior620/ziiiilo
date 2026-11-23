import { getTranslations } from "next-intl/server";
import type { ProjectBadge } from "@/components/cards/ProjectCards";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/ui/Misc";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getRealisation } from "@/data/realisations";

/**
 * Page provisoire d'une étude ou d'un produit : en-tête (textes déjà validés de la carte
 * Réalisations) + CTA. Chaque session de la phase B remplace son `EtudePage` par l'étude
 * complète de sa maquette Figma (`realisation.figma`).
 */
export async function EtudeStub({ slug, parent }: { slug: string; parent: "realisations" | "solutions" }) {
  const r = getRealisation(slug);
  if (!r) return null;
  const t = await getTranslations("realisations");
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  const badges = t.raw(`items.${slug}.mobile.badges`) as ProjectBadge[];

  return (
    <>
      <PageHeader
        title={t(`items.${slug}.title`)}
        lead={t(`items.${slug}.mobile.text`)}
        breadcrumb={
          <Breadcrumb
            label={a11y("breadcrumb")}
            items={[
              { label: nav("home"), href: "/" },
              parent === "solutions"
                ? { label: nav("solutions"), href: "/solutions" }
                : { label: nav("realisations"), href: "/realisations" },
              { label: r.nom },
            ]}
          />
        }
      >
        <ul className="flex flex-wrap gap-8">
          {badges.map((badge) => (
            <li key={badge.label}>
              <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
            </li>
          ))}
        </ul>
      </PageHeader>
      <CtaSection />
    </>
  );
}
