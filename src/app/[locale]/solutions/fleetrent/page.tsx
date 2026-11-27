import {
  Building2,
  CalendarDays,
  Car,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  LayoutGrid,
  Map,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealLines } from "@/components/motion/text";
import {
  BuilderBand,
  CheckList,
  Eyebrowed,
  IconCard,
  ProductHero,
  Short,
  StatusFeatureCard,
} from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { Breadcrumb } from "@/components/ui/Misc";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { isConfigured, site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

type Problem = { title: string; text: string; short: string };
type Brick = { title: string; titleShort: string; points: string[]; short: string };
type Feature = { title: string; text: string; status: "development" | "planned" };

const PROBLEM_ICONS = [FileText, Eye, Search];
const BRICK_ICONS = [LayoutGrid, Globe, ShoppingBag];
const BRICK_TONES = ["blue", "violet", "orange"] as const;
const FEATURE_ICONS = [Car, CalendarDays, FileText, SlidersHorizontal, Globe, ShoppingBag, Map, Zap];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products.fleetrent");
  return buildMetadata({ title: "FleetRent", description: t("lead"), href: "/solutions/fleetrent" });
}

/**
 * FleetRent — Figma desktop 15:2676, mobile 24:2440 (§7) : hero produit → présentation →
 * problématique → trois briques → fonctionnalités (6 « En développement », 2 « Prévu »,
 * aucune « Disponible ») → aperçu (desktop seulement, données d'illustration) →
 * positionnement → développé par ZIIIILO → CTA. Le bouton vers le site officiel n'apparaît
 * qu'une fois `site.products.fleetrentUrl` renseigné.
 */
export default async function FleetRentPage() {
  const t = await getTranslations("products.fleetrent");
  const a11y = await getTranslations("a11y");
  const problems = t.raw("problem.items") as Problem[];
  const bricks = t.raw("solution.items") as Brick[];
  const features = t.raw("features.items") as Feature[];
  const agencies = t.raw("model.agencies.points") as string[];
  const clients = t.raw("model.clients.points") as string[];
  const clientsShort = t.raw("model.clients.pointsShort") as string[];
  const officialUrl = site.products.fleetrentUrl;

  return (
    <>
      <ReadingProgress />
      <ProductHero
        product
        breadcrumb={
          <Breadcrumb
            theme="dark"
            label={a11y("breadcrumb")}
            items={[
              { label: t("crumbHome"), href: "/" },
              { label: t("crumbSolutions"), href: "/solutions" },
              { label: t("crumb") },
            ]}
          />
        }
        badges={
          <>
            <StatusBadge tone="dark">
              <Short full={t("badge")} short={t("badgeShort")} />
            </StatusBadge>
            <StatusBadge tone="development">{t("status")}</StatusBadge>
          </>
        }
        title={t("title")}
        lead={t("lead")}
        leadShort={t("leadShort")}
        actions={
          <div className="flex flex-col gap-12 tablet:flex-row">
            {isConfigured(officialUrl) && (
              <Button
                externalHref={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visitLabel")}
                variant="inverse"
                icon={ExternalLink}
                className="w-full tablet:w-auto"
              >
                {t("visit")}
              </Button>
            )}
            <Button
              href="/contact"
              variant={isConfigured(officialUrl) ? "inverse-outline" : "inverse"}
              icon={isConfigured(officialUrl) ? null : undefined}
              className="w-full tablet:w-auto"
            >
              {t("talk")}
            </Button>
          </div>
        }
        visual={
          <>
            <Image
              src="/media/produits/fleetrent/hero.webp"
              alt={t("visualAlt")}
              width={1440}
              height={1117}
              priority
              sizes="(min-width: 75rem) 592px, 1px"
              className="hidden h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] desktop:block"
            />
            <Image
              src="/media/produits/fleetrent/hero-mobile.webp"
              alt={t("visualAlt")}
              width={684}
              height={480}
              priority
              sizes="(min-width: 75rem) 1px, (min-width: 48rem) 560px, 100vw"
              className="mx-auto h-auto w-full max-w-[35rem] rounded-xl desktop:hidden"
            />
          </>
        }
      />

      {/* Présentation */}
      <section aria-labelledby="presentation-title" className="py-64 desktop:py-120">
        <div className="container grid gap-16 tablet:gap-32 desktop:grid-cols-[minmax(0,31.25rem)_minmax(0,1fr)] desktop:gap-96">
          <div className="flex flex-col gap-16">
            <Eyebrowed eyebrow={t("presentation.eyebrow")} />
            <h2 id="presentation-title" className="text-h2 text-text-primary">
              <RevealLines as="span" text={t("presentation.title")} preset="h2" />
            </h2>
          </div>
          <div className="flex flex-col gap-20 text-body-l text-text-secondary">
            <p className="tablet:hidden">{t("presentation.short")}</p>
            <Reveal className="flex flex-col gap-20 max-tablet:hidden">
              <p>{t("presentation.text")}</p>
              <p>{t("presentation.status")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problématique */}
      <section aria-labelledby="probleme-title" className="bg-background-subtle py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="probleme-title"
            eyebrow={t("problem.eyebrow")}
            title={t("problem.title")}
            titleShort={t("problem.titleShort")}
            description={t("problem.description")}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-32 tablet:grid-cols-3 tablet:gap-24">
            {problems.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100}>
                <IconCard
                  icon={PROBLEM_ICONS[i]}
                  tone="orange"
                  title={item.title}
                  headingClassName="text-h5"
                  flatOnMobile
                >
                  <p className="text-text-secondary text-body-s">
                    <Short full={item.text} short={item.short} />
                  </p>
                </IconCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* La solution : trois briques */}
      <section aria-labelledby="solution-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="solution-title"
            eyebrow={t("solution.eyebrow")}
            title={t("solution.title")}
            description={t("solution.description")}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-16 tablet:grid-cols-3 tablet:gap-24">
            {bricks.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100}>
                <IconCard
                  icon={BRICK_ICONS[i]}
                  tone={BRICK_TONES[i]}
                  title={<Short full={item.title} short={item.titleShort} />}
                  headingClassName="max-tablet:text-h5 tablet:text-h4"
                  largeTile
                >
                  <p className="text-text-secondary text-body-s tablet:hidden">{item.short}</p>
                  <CheckList items={item.points} className="max-tablet:hidden" />
                </IconCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Fonctionnalités principales */}
      <section
        aria-labelledby="fonctionnalites-title"
        className="bg-background-inverse py-64 text-text-inverse desktop:py-120"
      >
        <div className="container flex flex-col gap-32 desktop:gap-40">
          <SectionHeader
            id="fonctionnalites-title"
            theme="dark"
            eyebrow={t("features.eyebrow")}
            title={t("features.title")}
            description={t("features.description")}
            descriptionShort={t("features.descriptionShort")}
          />
          <ul className="grid grid-cols-1 gap-10 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-4 desktop:gap-20">
            {features.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 4) * 80}>
                <StatusFeatureCard
                  icon={FEATURE_ICONS[i]}
                  title={item.title}
                  text={item.text}
                  status={{
                    label: t(`features.${item.status}`),
                    tone: item.status === "planned" ? "planned" : "development",
                  }}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Aperçu de l'interface — desktop uniquement (§7) */}
      <section aria-labelledby="apercu-title" className="hidden bg-background-subtle py-120 desktop:block">
        <div className="container flex flex-col gap-48">
          <SectionHeader
            id="apercu-title"
            align="center"
            eyebrow={t("preview.eyebrow")}
            title={t("preview.title")}
            description={t("preview.description")}
          />
          <Reveal distance={24}>
            <Image
              src="/media/produits/fleetrent/apercu.webp"
              alt={t("preview.alt")}
              width={2400}
              height={1120}
              sizes="(min-width: 75rem) 1200px, 1px"
              className="h-auto w-full rounded-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Positionnement SaaS & marketplace */}
      <section aria-labelledby="modele-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-16 tablet:gap-32 desktop:gap-48">
          <SectionHeader
            id="modele-title"
            eyebrow={t("model.eyebrow")}
            title={t("model.title")}
            titleShort={t("model.titleShort")}
          />
          <div className="grid gap-16 tablet:grid-cols-2 tablet:gap-24">
            <Reveal className="flex flex-col gap-12 rounded-xl bg-primary-subtle p-24 tablet:gap-20 tablet:p-32 desktop:rounded-2xl desktop:p-40">
              <IconTile icon={Building2} tone="blue" size="L" className="max-tablet:hidden" />
              <div className="flex flex-col gap-8">
                <h3 className="text-h4 text-text-primary tablet:text-h3">{t("model.agencies.title")}</h3>
                <p className="text-text-secondary text-body-s max-tablet:hidden desktop:text-body-m">
                  {t("model.agencies.subtitle")}
                </p>
              </div>
              <CheckList items={agencies} large />
            </Reveal>
            <Reveal
              delay={100}
              className="relative isolate flex flex-col gap-12 overflow-hidden rounded-xl bg-background-inverse p-24 tablet:gap-20 tablet:p-32 desktop:rounded-2xl desktop:p-40"
            >
              <IconTile icon={Users} tone="glass" size="L" className="max-tablet:hidden" />
              <div className="flex flex-col gap-8">
                <h3 className="text-h4 text-text-inverse tablet:text-h3">{t("model.clients.title")}</h3>
                <p className="text-text-inverse-muted text-body-s max-tablet:hidden desktop:text-body-m">
                  {t("model.clients.subtitle")}
                </p>
              </div>
              <CheckList
                dark
                large
                items={clients.map((full, i) => (
                  <Short key={full} full={full} short={clientsShort[i]} />
                ))}
              />
            </Reveal>
          </div>
          <p className="text-text-muted text-body-xs max-tablet:hidden">{t("model.note")}</p>
        </div>
      </section>

      <BuilderBand
        title={t("builder.title")}
        text={t("builder.text")}
        textShort={t("builder.textShort")}
        action={{ label: t("builder.action"), href: "/a-propos" }}
      />

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
