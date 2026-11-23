import { Car, FileText, Info, RefreshCw, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/cards/ProductCard";
import { statutTone } from "@/components/cards/RealisationCard";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/motion/text";
import {
  Catalogue,
  CatalogueGroupVisible,
  CatalogueItem,
  type CatalogueGroup,
} from "@/components/sections/solutions/Catalogue";
import {
  SolutionBlock,
  type SolutionFeature,
  type SolutionTarget,
} from "@/components/sections/solutions/SolutionBlock";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import type { BadgeTone } from "@/components/ui/StatusBadge";
import { getRealisation, STATUTS_ACTIFS, type Realisation } from "@/data/realisations";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("solutions.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/solutions" });
}

/** Visuels « Grande image produit » exportés de Figma (2×, WebP). */
const VISUALS: Record<string, { src: string; width: number; height: number }> = {
  fleetrent: { src: "/media/solutions/fleetrent.webp", width: 1240, height: 1540 },
  doccloud: { src: "/media/solutions/doccloud.webp", width: 1240, height: 1624 },
  "scpb-commercial": { src: "/media/solutions/scpb-commercial.webp", width: 1240, height: 1582 },
  staftrack: { src: "/media/solutions/staftrack.webp", width: 1240, height: 1440 },
  "previsions-cacao-robusta": {
    src: "/media/solutions/previsions-cacao-robusta.webp",
    width: 1240,
    height: 1770,
  },
  "scpb-survey": { src: "/media/solutions/scpb-survey.webp", width: 1240, height: 1582 },
};

const PRODUCTS = [
  { slug: "fleetrent", icon: Car, title: "FleetRent" },
  { slug: "doccloud", icon: FileText, title: "DocCloud" },
] as const;

const BUSINESS = ["scpb-commercial", "staftrack", "previsions-cacao-robusta", "scpb-survey"] as const;

const FEATURE_TONES: Record<string, BadgeTone> = {
  "en-developpement": "development",
  prevu: "planned",
  "en-conception": "planned",
};

const APPROACH_ICONS = [Target, Users, RefreshCw];

const groupOf = (r: Realisation): CatalogueGroup =>
  STATUTS_ACTIFS.includes(r.statut) ? "commercialises" : "en-developpement";

/** Mot-symbole DocCloud (Figma 89:10401) : « Doc » bleu nuit, « Cloud » sarcelle. */
function DocCloudWordmark() {
  return (
    <>
      <span className="text-secondary-dark">Doc</span>
      <span className="text-accent-teal-strong">Cloud</span>
    </>
  );
}

/**
 * Solutions — Figma 14:2193 (desktop), 24:1931 (mobile), 380:676 (tablette).
 * En-tête → catalogue filtrable (FleetRent, DocCloud, cartes produit, note) → solutions métiers
 * (4 réalisations SCPB, non commercialisées) → approche produit → CTA.
 */
export default async function SolutionsPage() {
  const t = await getTranslations("solutions");
  const statuts = await getTranslations("portfolio.statuts");

  const products = PRODUCTS.flatMap((p) => {
    const realisation = getRealisation(p.slug);
    return realisation?.published ? [{ ...p, realisation }] : [];
  });
  const business = BUSINESS.flatMap((slug) => {
    const realisation = getRealisation(slug);
    return realisation?.published ? [{ slug, realisation }] : [];
  });
  const counts: Record<CatalogueGroup, number> = { commercialises: 0, "en-developpement": 0 };
  for (const { realisation } of products) counts[groupOf(realisation)]++;

  const statusBadge = (r: Realisation) => ({
    label: statuts(r.statut),
    tone: statutTone(r.statut),
    pulse: STATUTS_ACTIFS.includes(r.statut),
  });

  return (
    <>
      <PageHeader
        eyebrow={t("header.eyebrow")}
        title={t("header.title")}
        titleShort={t("header.titleShort")}
        lead={t("header.lead")}
        leadShort={t("header.leadShort")}
      >
        <div className="flex flex-col gap-12 pt-4 tablet:flex-row">
          <Button href="/solutions/fleetrent" block className="tablet:w-auto">
            {t("header.primary")}
          </Button>
          <Button href="/contact" variant="secondary" icon={null} className="hidden tablet:inline-flex">
            {t("header.secondary")}
          </Button>
        </div>
      </PageHeader>

      {/* Catalogue des produits ZIIIILO */}
      <section aria-label={t("catalogue.label")} className="pt-32 pb-64 desktop:py-120">
        <div className="container flex flex-col gap-20 desktop:gap-40">
          <Catalogue counts={counts}>
            {products.map(({ slug, title, realisation }, index) => {
              const features = (
                t.raw(`products.${slug}.features`) as { label: string; short?: string; status: string }[]
              ).map<SolutionFeature>((f) => ({
                label: f.label,
                short: f.short,
                badge: { label: t(`featureStatus.${f.status}`), tone: FEATURE_TONES[f.status] ?? "neutral" },
              }));
              const visual = VISUALS[slug];
              return (
                <CatalogueItem key={slug} group={groupOf(realisation)}>
                  <SolutionBlock
                    id={slug}
                    title={slug === "doccloud" ? <DocCloudWordmark /> : title}
                    badges={[
                      {
                        label: t(`products.${slug}.badge`),
                        short: t(`products.${slug}.badgeShort`),
                        tone: "product",
                      },
                      statusBadge(realisation),
                    ]}
                    description={t(`products.${slug}.description`)}
                    descriptionShort={t(`products.${slug}.descriptionShort`)}
                    targetsLabel={t("labels.targets")}
                    targets={t.raw(`products.${slug}.targets`) as SolutionTarget[]}
                    featuresLabel={t("labels.features")}
                    features={features}
                    image={visual.src}
                    imageWidth={visual.width}
                    imageHeight={visual.height}
                    imageAlt={t(`products.${slug}.imageAlt`)}
                    reverse={index % 2 === 1}
                    priority={index === 0}
                    primary={{ label: t(`products.${slug}.cta`), href: realisation.route }}
                    /* FleetRent : « Site officiel » masqué tant qu’aucune URL n’est fournie. */
                    secondary={slug === "doccloud" ? { label: t("labels.contact"), href: "/contact" } : null}
                  />
                </CatalogueItem>
              );
            })}

            <CatalogueGroupVisible>
              <h2 className="pt-12 text-h4 text-text-primary desktop:pt-0">{t("catalogue.allTitle")}</h2>
            </CatalogueGroupVisible>
            <ul className="grid gap-20 tablet:grid-cols-2 tablet:gap-24">
              {products.map(({ slug, title, icon, realisation }, i) => (
                <CatalogueItem key={slug} as="li" group={groupOf(realisation)}>
                  <Reveal delay={i * 100} className="h-full">
                    <ProductCard
                      name={title}
                      icon={icon}
                      status={statusBadge(realisation)}
                      description={t(`products.${slug}.card.description`)}
                      descriptionShort={
                        t.has(`products.${slug}.card.descriptionShort`)
                          ? t(`products.${slug}.card.descriptionShort`)
                          : undefined
                      }
                      tags={t(`products.${slug}.card.tags`)}
                      linkLabel={t("labels.discoverProduct")}
                      href={realisation.route}
                    />
                  </Reveal>
                </CatalogueItem>
              ))}
            </ul>

            <p className="flex items-start gap-10 rounded-md bg-primary-subtle p-14 text-text-secondary text-body-s tablet:p-16">
              <Info aria-hidden size={18} strokeWidth={1.75} className="mt-2 shrink-0 text-primary-default" />
              <span>
                <span className="max-tablet:hidden">{t("catalogue.note")}</span>
                <span className="tablet:hidden">{t("catalogue.noteShort")}</span>
              </span>
            </p>
          </Catalogue>
        </div>
      </section>

      {/* Solutions métiers (réalisations clientes, pas des produits ZIIIILO) */}
      {business.length > 0 && (
        <section
          aria-labelledby="solutions-metiers-title"
          className="border-t border-border-default py-64 desktop:py-120"
        >
          <div className="container flex flex-col gap-24 desktop:gap-40">
            <SectionHeader
              id="solutions-metiers-title"
              eyebrow={t("business.eyebrow")}
              title={t("business.title")}
              description={t("business.description")}
              descriptionClassName="max-tablet:hidden"
            >
              <p className="text-body-l text-text-secondary tablet:hidden">
                {t("business.descriptionShort")}
              </p>
            </SectionHeader>
            {business.map(({ slug, realisation }) => {
              const key = `business.items.${slug}` as const;
              const visual = VISUALS[slug];
              return (
                <SolutionBlock
                  key={slug}
                  id={slug}
                  title={realisation.nom}
                  badges={[{ label: t(`${key}.badge`), tone: "neutral" }, statusBadge(realisation)]}
                  description={t(`${key}.description`)}
                  descriptionShort={
                    t.has(`${key}.descriptionShort`) ? t(`${key}.descriptionShort`) : undefined
                  }
                  targetsLabel={t("labels.targets")}
                  targets={(t.raw(`${key}.targets`) as string[]).map((label) => ({ label }))}
                  featuresLabel={t("labels.features")}
                  features={(t.raw(`${key}.features`) as string[]).map((label) => ({ label }))}
                  image={visual.src}
                  imageWidth={visual.width}
                  imageHeight={visual.height}
                  imageAlt={t(`${key}.imageAlt`)}
                  reverse
                  primary={{
                    label: t("labels.discoverRealisation"),
                    href: realisation.route,
                    ariaLabel: `${t("labels.discoverRealisation")} — ${realisation.nom}`,
                  }}
                  secondary={{ label: t("labels.contact"), href: "/contact" }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Notre approche produit */}
      <section aria-labelledby="approche-title" className="bg-background-subtle py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-64">
          <SectionHeader
            id="approche-title"
            align="center"
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
            description={t("approach.description")}
            descriptionClassName="max-tablet:hidden"
            className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
          />
          <ul className="grid gap-32 tablet:grid-cols-3 tablet:gap-24">
            {(t.raw("approach.items") as { title: string; text: string; short: string }[]).map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 100}
                className="flex flex-col gap-16 tablet:rounded-xl tablet:border tablet:border-border-default tablet:bg-surface-default tablet:p-24 desktop:p-32"
              >
                <IconTile icon={APPROACH_ICONS[i]} size="M" />
                <h3 className="text-text-primary text-h5">{item.title}</h3>
                <p className="text-text-secondary text-body-s">
                  <span className="max-tablet:hidden">{item.text}</span>
                  <span className="tablet:hidden">{item.short}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title={t("cta.title")}
        titleShort={t("cta.titleShort")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/services" }}
      />
    </>
  );
}
