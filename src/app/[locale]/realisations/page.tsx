import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ProjectCard,
  ProjectFeature,
  ProjectMobileCard,
  type ProjectBadge,
} from "@/components/cards/ProjectCards";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/text";
import { FilterGroup, FilterItem, PortfolioFilter } from "@/components/sections/realisations/PortfolioFilter";
import { Button } from "@/components/ui/Button";
import { getRealisations, type Realisation } from "@/data/realisations";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("realisations.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/realisations" });
}

/** « Visiter le site » affiché comme sur les maquettes (sites publics des réalisations clientes). */
const VISIT = new Set(["ste-scpb", "ninety-one-foot-academy", "golden-beans", "agora-film-invest"]);

type Sheet = { label: string; value: string }[];

/**
 * Réalisations — Figma 17:3849 (desktop), 24:3083 (mobile), 380:3382 (tablette).
 * Filtres `?categorie=` → 4 projets à la une + grille « Autres réalisations » (desktop) ;
 * en mobile et tablette, les 11 projets en cartes empilées → CTA.
 */
export default async function RealisationsPage() {
  const t = await getTranslations("realisations");
  const all = getRealisations();
  const featured = all.filter((r) => r.featured);
  const others = all.filter((r) => !r.featured);
  const categoriesOf = (list: readonly Realisation[]) => list.map((r) => r.categories);

  const visitOf = (r: Realisation) =>
    r.siteUrl && VISIT.has(r.slug) ? { href: r.siteUrl, label: t("visit"), newTabLabel: t("newTab") } : null;
  const key = (r: Realisation) => `items.${r.slug}` as const;

  return (
    <>
      <PageHeader
        eyebrow={t("header.eyebrow")}
        title={t("header.title")}
        lead={t("header.lead")}
        leadShort={t("header.leadShort")}
      />

      <section aria-label={t("header.title")} className="pt-32 pb-64 desktop:py-120">
        <div className="container flex flex-col gap-20 desktop:gap-40">
          <PortfolioFilter items={categoriesOf(all)}>
            {/* Desktop : projets à la une */}
            <div className="hidden flex-col gap-40 desktop:flex">
              {featured.map((r, i) => (
                <FilterItem key={r.slug} categories={r.categories}>
                  <Reveal>
                    <ProjectFeature
                      name={r.nom}
                      title={t(`${key(r)}.title`)}
                      badges={t.raw(`${key(r)}.featured.badges`) as ProjectBadge[]}
                      text={t(`${key(r)}.featured.text`)}
                      sheet={t.raw(`${key(r)}.featured.sheet`) as Sheet}
                      cover={`/media/realisations/couverture-${r.slug}.webp`}
                      coverAlt={t(`${key(r)}.coverAlt`)}
                      reverse={i > 0}
                      priority={i === 0}
                      cta={t(`${key(r)}.featured.cta`)}
                      href={r.route}
                      visit={visitOf(r)}
                    />
                  </Reveal>
                </FilterItem>
              ))}

              <FilterGroup items={categoriesOf(others)}>
                <h2 className="pt-16 text-overline text-text-secondary">{t("others")}</h2>
              </FilterGroup>
              <ul className="grid grid-cols-3 gap-24">
                {others.map((r, i) => (
                  <FilterItem key={r.slug} as="li" categories={r.categories}>
                    <Reveal delay={(i % 3) * 100} className="h-full">
                      <ProjectCard
                        name={r.nom}
                        badge={t.raw(`${key(r)}.card.badge`) as ProjectBadge}
                        text={t(`${key(r)}.card.text`)}
                        cta={t(`${key(r)}.card.cta`)}
                        href={r.route}
                        image={`/media/realisations/vignette-${r.slug}.webp`}
                        imageAlt={t(`${key(r)}.coverAlt`)}
                      />
                    </Reveal>
                  </FilterItem>
                ))}
                {/* État vide (17:4225) : complète la dernière rangée de la grille complète. */}
                <FilterItem as="li" categories={[]} className="col-span-2">
                  <Reveal delay={100} className="h-full">
                    <div className="flex h-full items-center gap-24 rounded-xl bg-background-subtle p-32">
                      <span
                        aria-hidden
                        className="flex size-60 shrink-0 items-center justify-center rounded-full bg-surface-default text-primary-default"
                      >
                        <FileText size={26} strokeWidth={1.75} />
                      </span>
                      <div className="flex flex-1 flex-col gap-6">
                        <p className="text-h4 text-text-primary">{t("empty.title")}</p>
                        <p className="text-text-secondary text-body-m">{t("empty.text")}</p>
                      </div>
                      <Button href="/contact" variant="secondary" size="M">
                        {t("empty.cta")}
                      </Button>
                    </div>
                  </Reveal>
                </FilterItem>
              </ul>
            </div>

            {/* Mobile et tablette : toutes les réalisations en cartes */}
            <ul className="grid gap-20 tablet:grid-cols-2 tablet:gap-24 desktop:hidden">
              {all.map((r) => (
                <FilterItem key={r.slug} as="li" categories={r.categories}>
                  <ProjectMobileCard
                    name={r.nom}
                    title={t(`${key(r)}.title`)}
                    badges={t.raw(`${key(r)}.mobile.badges`) as ProjectBadge[]}
                    text={t(`${key(r)}.mobile.text`)}
                    cta={t(`${key(r)}.mobile.cta`)}
                    href={r.route}
                    visit={visitOf(r)}
                    image={`/media/realisations/vignette-${r.slug}.webp`}
                    imageAlt={t(`${key(r)}.coverAlt`)}
                  />
                </FilterItem>
              ))}
            </ul>
          </PortfolioFilter>
        </div>
      </section>

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/services" }}
      />
    </>
  );
}
