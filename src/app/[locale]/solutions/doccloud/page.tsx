import {
  Building2,
  ChevronRight,
  CircleCheck,
  Clock,
  Eye,
  FileText,
  Layers,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
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
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { buildMetadata } from "@/lib/seo";

type Item = { title: string; text: string; short?: string };
type Brick = { title: string; points: string[]; short: string };

const PROBLEM_ICONS = [Search, Layers, MapPin, ShieldCheck];
const ACTOR_ICONS = [FileText, Search, Building2];
const ACTOR_TONES = ["blue", "violet", "orange"] as const;
const STEP_ICONS = [FileText, Building2, Search, CircleCheck];
const FEATURE_ICONS = [Search, FileText, Sparkles, Building2, MessageCircle, ShieldCheck];
const SECURITY_ICONS = [ShieldCheck, Layers, Users, Clock, Eye, CircleCheck];
/** Couleurs des 7 statuts du dossier (DS DocCloud 83:739). */
const STATUS_TONES: BadgeTone[] = ["neutral", "development", "product", "planned", "teal", "product", "available"];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products.doccloud");
  return buildMetadata({ title: "DocCloud", description: t("lead"), href: "/solutions/doccloud" });
}

/**
 * DocCloud — Figma desktop 90:11552, mobile 92:9403 (§7, v1.4) : hero → le problème → notre
 * solution (3 acteurs) → comment ça marche (4 étapes + 7 statuts) → six piliers « En conception »
 * → aperçu (maquettes, données fictives) → sécurité et confiance (aucune certification revendiquée)
 * → vision → développé par ZIIIILO → CTA. Toujours « En développement », aucun montant, aucun partenaire.
 */
export default async function DocCloudPage() {
  const t = await getTranslations("products.doccloud");
  const a11y = await getTranslations("a11y");
  const problems = t.raw("problem.items") as Item[];
  const actors = t.raw("solution.items") as Brick[];
  const steps = t.raw("steps.items") as Item[];
  const statuses = t.raw("steps.statuses") as string[];
  const features = t.raw("features.items") as Item[];
  const security = t.raw("security.items") as Item[];

  return (
    <>
      <ReadingProgress />
      <ProductHero
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
            {/* Logotype provisoire (83:788) : symbole exporté de Figma + « DocCloud » en Sora */}
            <span className="flex w-full items-center gap-10">
              <Image
                src="/media/produits/doccloud/symbole-provisoire.svg"
                alt=""
                width={40}
                height={40}
                unoptimized
                className="size-36 tablet:size-40"
              />
              <span className="text-h3 text-text-inverse">
                Doc<span className="text-accent-cyan">Cloud</span>
              </span>
            </span>
            <StatusBadge tone="dark">{t("badge")}</StatusBadge>
            <StatusBadge tone="development">{t("status")}</StatusBadge>
          </>
        }
        title={t("title")}
        lead={t("lead")}
        actions={
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12 tablet:flex-row">
              <Button externalHref="#fonctionnement" variant="inverse" className="w-full tablet:w-auto">
                {t("how")}
              </Button>
              <Button href="/contact" variant="inverse-outline" icon={null} className="w-full tablet:w-auto">
                {t("contact")}
              </Button>
            </div>
            <p className="text-body-xs text-text-inverse-muted">
              <Short full={t("note")} short={t("noteShort")} />
            </p>
          </div>
        }
        visual={
          <>
            <Image
              src="/media/produits/doccloud/hero.webp"
              alt={t("visualAlt")}
              width={1553}
              height={1360}
              priority
              sizes="(min-width: 75rem) 592px, (min-width: 48rem) 560px, 1px"
              className="mx-auto hidden h-auto w-full max-w-[35rem] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] tablet:block desktop:max-w-none"
            />
            <Image
              src="/media/produits/doccloud/hero-mobile.webp"
              alt={t("visualAlt")}
              width={780}
              height={480}
              priority
              sizes="(min-width: 48rem) 1px, 100vw"
              className="-mx-gutter h-auto w-[calc(100%+2*var(--container-gutter))] max-w-none tablet:hidden"
            />
          </>
        }
      />

      {/* Le problème */}
      <section aria-labelledby="probleme-title" className="bg-background-subtle py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="probleme-title"
            eyebrow={t("problem.eyebrow")}
            title={t("problem.title")}
            description={t("problem.description")}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-32 tablet:grid-cols-2 tablet:gap-24 desktop:grid-cols-4">
            {problems.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100}>
                <IconCard
                  icon={PROBLEM_ICONS[i]}
                  tone="orange"
                  title={item.title}
                  headingClassName="text-h5"
                  flatOnMobile
                >
                  <p className="text-body-s text-text-secondary">{item.text}</p>
                </IconCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Notre solution : trois acteurs */}
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
            {actors.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100}>
                <IconCard icon={ACTOR_ICONS[i]} tone={ACTOR_TONES[i]} title={item.title} headingClassName="text-h4">
                  <p className="text-body-s text-text-secondary tablet:hidden">{item.short}</p>
                  <CheckList items={item.points} className="max-tablet:hidden" />
                </IconCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Comment fonctionne DocCloud ? */}
      <section
        id="fonctionnement"
        aria-labelledby="fonctionnement-title"
        className="scroll-mt-(--header-height) bg-background-subtle py-64 desktop:py-120"
      >
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="fonctionnement-title"
            eyebrow={t("steps.eyebrow")}
            title={t("steps.title")}
            description={t("steps.description")}
            descriptionClassName="hidden tablet:block"
          />
          <ol className="grid gap-24 tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-24">
            {steps.map((step, i) => {
              const number = String(i + 1).padStart(2, "0");
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 120}
                  className="relative flex gap-16 tablet:flex-col tablet:rounded-lg tablet:border tablet:border-border-default tablet:bg-surface-default tablet:p-24"
                >
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-40 -bottom-24 left-16 w-2 -translate-x-1/2 bg-linear-to-b from-accent-teal to-transparent tablet:hidden"
                    />
                  )}
                  <span className="flex items-center gap-16 max-tablet:self-start">
                    <span
                      aria-hidden
                      className="relative flex size-36 shrink-0 items-center justify-center rounded-full bg-secondary-dark font-mono text-label-s text-accent-cyan"
                    >
                      {number}
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-2 flex-1 bg-linear-to-r from-accent-teal to-transparent tablet:block"
                    />
                  </span>
                  <span className="flex min-w-0 flex-col gap-12 tablet:gap-16">
                    <IconTile icon={STEP_ICONS[i]} tone="blue" size="M" className="max-tablet:hidden" />
                    <h3 className="text-h4 text-text-primary">
                      <span className="sr-only">{number}. </span>
                      {step.title}
                    </h3>
                    <p className="text-body-s text-text-secondary">
                      <Short full={step.text} short={step.short} />
                    </p>
                  </span>
                </Reveal>
              );
            })}
          </ol>
          <Reveal className="flex flex-col gap-16 rounded-lg border border-border-default bg-surface-default p-16 tablet:p-24">
            <h3 className="text-label-l text-text-primary">
              <Short full={t("steps.statusesTitle")} short={t("steps.statusesTitleShort")} />
            </h3>
            <ol className="flex flex-wrap items-center gap-x-8 gap-y-12">
              {statuses.map((status, i) => (
                <li key={status} className="flex items-center gap-8">
                  <StatusBadge tone={STATUS_TONES[i]}>{status}</StatusBadge>
                  {i < statuses.length - 1 && (
                    <ChevronRight
                      aria-hidden
                      size={14}
                      strokeWidth={1.75}
                      className="text-text-muted max-tablet:hidden"
                    />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Six piliers fonctionnels */}
      <section
        aria-labelledby="piliers-title"
        className="bg-background-inverse py-64 text-text-inverse desktop:py-120"
      >
        <div className="container flex flex-col gap-32 desktop:gap-40">
          <SectionHeader
            id="piliers-title"
            theme="dark"
            eyebrow={t("features.eyebrow")}
            title={t("features.title")}
            description={t("features.description")}
            descriptionShort={t("features.descriptionShort")}
          />
          <ul className="grid grid-cols-1 gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-3 desktop:gap-20">
            {features.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 80}>
                <StatusFeatureCard
                  icon={FEATURE_ICONS[i]}
                  title={
                    <>
                      <span className="max-tablet:hidden">{String(i + 1).padStart(2, "0")} — </span>
                      {item.title}
                    </>
                  }
                  text={item.text}
                  status={{ label: t("features.status"), tone: "planned" }}
                />
              </Reveal>
            ))}
          </ul>
          <p className="text-body-xs text-text-inverse-muted">
            <Short full={t("features.note")} short={t("features.noteShort")} />
          </p>
        </div>
      </section>

      {/* Aperçu de l'application */}
      <section aria-labelledby="apercu-title" className="bg-background-subtle py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="apercu-title"
            align="center"
            eyebrow={t("preview.eyebrow")}
            title={t("preview.title")}
            description={t("preview.description")}
            descriptionShort={t("preview.descriptionShort")}
            className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
          />
          <Reveal as="div" distance={24}>
            <figure className="flex flex-col gap-24">
              <Image
                src="/media/produits/doccloud/apercu.webp"
                alt={t("preview.alt")}
                width={2400}
                height={1120}
                sizes="(min-width: 75rem) 1200px, (min-width: 48rem) 100vw, 1px"
                className="h-auto w-full rounded-xl max-tablet:hidden desktop:rounded-2xl"
              />
              <Image
                src="/media/produits/doccloud/apercu-mobile.webp"
                alt={t("preview.altShort")}
                width={684}
                height={920}
                sizes="(min-width: 48rem) 1px, 100vw"
                className="h-auto w-full rounded-xl tablet:hidden"
              />
              <figcaption className="text-body-s text-text-secondary tablet:text-center">
                <Short full={t("preview.caption")} short={t("preview.captionShort")} />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Sécurité et confiance */}
      <section aria-labelledby="securite-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="securite-title"
            eyebrow={t("security.eyebrow")}
            title={t("security.title")}
            description={t("security.description")}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-32 tablet:grid-cols-2 tablet:gap-24 desktop:grid-cols-3">
            {security.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 100}>
                <IconCard
                  icon={SECURITY_ICONS[i]}
                  tone="orange"
                  title={item.title}
                  headingClassName="text-h5"
                  flatOnMobile
                >
                  <p className="text-body-s text-text-secondary">
                    <Short full={item.text} short={item.short} />
                  </p>
                </IconCard>
              </Reveal>
            ))}
          </ul>
          <p className="text-body-xs text-text-muted">
            <Short full={t("security.note")} short={t("security.noteShort")} />
          </p>
        </div>
      </section>

      {/* Vision du projet */}
      <section aria-labelledby="vision-title" className="pb-64 desktop:pb-120">
        <div className="container grid gap-16 tablet:gap-32 desktop:grid-cols-2 desktop:gap-96">
          <div className="flex flex-col gap-16">
            <Eyebrowed eyebrow={t("vision.eyebrow")} />
            <h2 id="vision-title" className="text-h2 text-text-primary">
              <RevealLines as="span" text={t("vision.title")} preset="h2" />
            </h2>
          </div>
          <div className="flex flex-col gap-20 text-body-l text-text-secondary">
            <p className="tablet:hidden">{t("vision.short")}</p>
            <Reveal className="flex flex-col gap-20 max-tablet:hidden">
              <p>{t("vision.text1")}</p>
              <p>{t("vision.text2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <BuilderBand
        title={t("builder.title")}
        text={t("builder.text")}
        action={{ label: t("builder.action"), href: "/realisations" }}
      />

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/realisations" }}
      />
    </>
  );
}
