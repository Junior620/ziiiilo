import {
  ArrowDown,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock,
  Cloud,
  Code,
  Cpu,
  Database,
  Eye,
  Globe,
  Layers,
  LayoutDashboard,
  Lightbulb,
  PanelsTopLeft,
  RefreshCw,
  Send,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { Reveal } from "@/components/motion/text";
import { IconTile } from "@/components/ui/IconTile";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import {
  CheckChips,
  EtudeHero,
  EtudeSection,
  HeroActions,
  IconCard,
  InfoAlert,
  MentionsBand,
  MockupFigure,
  Note,
  StepArrow,
  Visual,
} from "../scpb-commercial/kit";

/**
 * Prévisions Cacao & Robusta — Figma desktop 149:20336, mobile 157:17634 (identité 146:4013,
 * statut de prévision 146:4031, maquettes 146:4045…). Tablette : version mobile élargie, grilles
 * en 2 colonnes. Aucun horizon validé au 20/11/2026 : pas de badge « Validé », le MAPE est une
 * erreur (jamais une « précision ») et seuls les MAPE du cacao (vue 05, graphique) sont réels.
 */

const MEDIA = "/media/etudes/previsions-cacao-robusta";
const SCPB_LOGO = { src: "/media/etudes/clients/scpb.svg", width: 290, height: 160 };
const PLATFORM_URL = "https://forecast.ste-scpb.com";

type Titled = { title: string; text: string };

const DEFI_ICONS: LucideIcon[] = [TrendingUp, Globe, Cloud, Layers, Eye, CircleAlert];
const PILLAR_ICONS: LucideIcon[] = [Database, Workflow, Cpu, ShieldCheck];
const ENGINE_ICONS: LucideIcon[] = [BarChart3, Cpu, TrendingUp];
const CHAIN_ICONS: LucideIcon[] = [Database, Workflow, Target, ShieldCheck, Send];
const METHOD_ICONS: LucideIcon[] = [Clock, Calendar, Layers];
const TRACE_ICONS: LucideIcon[] = [Send, Database, Calendar, Target];
const KEY_ICONS: LucideIcon[] = [Database, Workflow, Cpu, CircleCheck, Send, Eye];
const BLOCK_ICONS: LucideIcon[] = [Database, Cpu, Code, PanelsTopLeft, Users];
const BENEFIT_ICONS: LucideIcon[] = [LayoutDashboard, TrendingUp, Target, Clock, Lightbulb, RefreshCw];
const TRACK_ICONS: LucideIcon[] = [Database, TrendingUp, Target, Calendar, BarChart3, ShieldCheck];
const ENGINES = ["XGBoost", "N-HiTS", "Prophet"];
/** Jours de traitement : du mardi au samedi (§7). */
const ACTIVE_DAYS = [1, 2, 3, 4, 5];

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Pastille de code (technologie, horizon) en JetBrains Mono. */
function Mono({ children, dark, className }: { children: string; dark?: boolean; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-xs border px-8 py-2 font-mono! text-body-xs",
        dark
          ? "border-inverse-line bg-surface-inverse text-text-inverse"
          : "border-border-default bg-background-subtle text-text-primary",
        className,
      )}
    >
      {children}
    </li>
  );
}

export default async function EtudePage() {
  const t = await getTranslations("etude-previsions-cacao-robusta");
  const a11y = await getTranslations("a11y");
  const hero = t.raw("hero") as Record<string, string> & { badges: string[] };
  const cut = hero.badges[0].lastIndexOf(" · ");
  const badge0 = cut > 0 ? [hero.badges[0].slice(0, cut), hero.badges[0].slice(cut + 3)] : [hero.badges[0]];
  const defi = t.raw("defi") as Record<string, string> & {
    items: Titled[];
    illustration: Record<string, string>;
  };
  const approche = t.raw("approche") as Record<string, string> & { pillars: Titled[] };
  const marches = t.raw("marches") as Record<string, string> & {
    markets: Record<string, string>[];
    rows: { label: string; value: string }[];
    signals: string[];
  };
  const histo = t.raw("historique") as Record<string, string> & {
    series: (Titled & { tag: string; alt: string })[];
    steps: string[];
  };
  const apercu = t.raw("apercu") as Record<string, string> & { mockups: (Titled & { alt: string })[] };
  const ml = t.raw("ml") as Record<string, string> & {
    engines: (Titled & { tags: string[] })[];
    chain: string[];
    horizons: string[];
  };
  const valid = t.raw("validation") as Record<string, string> & {
    rules: string[];
    method: string[];
    legend: string[];
    notes: string[];
    publish: { badge: string; text: string }[];
  };
  const trace = t.raw("tracabilite") as Record<string, string> & { steps: Titled[]; values: string[] };
  const auto = t.raw("automatisation") as Record<string, string> & {
    days: string[];
    times: { time: string; text: string }[];
    keySteps: string[];
    engine: { title: string; steps: string[] };
    api: { title: string; step: string };
    ui: { title: string; step: string };
  };
  const archi = t.raw("architecture") as Record<string, string> & {
    blocks: (Titled & { chips: string[] })[];
    storage: { title: string; chips: string[]; text: string };
    security: string[];
  };
  const benef = t.raw("benefices") as Record<string, string> & { items: Titled[] };
  const limites = t.raw("limites") as Record<string, string> & { items: string[] };
  const cta = t.raw("cta") as Record<string, string>;

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero */}
      <EtudeHero
        crumb={hero.crumb}
        identity={
          <span className="flex items-center gap-12">
            <span className="flex size-40 items-center justify-center rounded-md bg-primary-brand text-text-inverse tablet:size-44">
              <TrendingUp aria-hidden size={22} strokeWidth={1.75} />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-h4 text-text-inverse">{hero.name}</span>
              <span className="text-text-inverse-muted text-body-s">{hero.product}</span>
            </span>
          </span>
        }
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand max-tablet:hidden">
              {hero.badges[0]}
            </StatusBadge>
            {/* Mobile (157:17634) : le premier badge est scindé en deux pour tenir à 360 px. */}
            {badge0.map((part) => (
              <StatusBadge key={part} tone="dark" className="border-primary-brand tablet:hidden">
                {part}
              </StatusBadge>
            ))}
            <StatusBadge tone="available">{hero.badges[1]}</StatusBadge>
            <StatusBadge tone="neutral" className="bg-surface-default text-text-primary">
              {hero.badges[2]}
            </StatusBadge>
            <StatusBadge tone="neutral" className="bg-surface-default text-text-primary">
              {hero.badges[3]}
            </StatusBadge>
          </>
        }
        title={hero.title}
        lead={hero.lead}
        actions={
          <HeroActions
            primary={{ label: hero.primary, externalHref: PLATFORM_URL, newTab: a11y("newTab") }}
            secondary={{ label: hero.secondary, href: "/realisations" }}
          />
        }
        note={hero.note}
        visual={
          <Visual
            image={{ src: `${MEDIA}/hero.webp`, width: 1395, height: 1127, alt: hero.visualAlt }}
            priority
            sizes="(min-width: 75rem) 572px, (min-width: 48rem) 80vw, 100vw"
            className="mx-auto max-w-[35.75rem] desktop:max-w-none"
          />
        }
        visualMobile={
          <figure className="flex flex-col gap-12">
            <Visual
              image={{ src: `${MEDIA}/hero-mobile.webp`, width: 342, height: 250, alt: hero.visualMobileAlt }}
              priority
              sizes="100vw"
            />
            <figcaption className="w-fit rounded-full border border-inverse-line bg-glass-navy px-12 py-4 text-text-inverse-muted text-body-xs">
              {hero.visualLabel}
            </figcaption>
          </figure>
        }
      />

      {/* 02 — Le défi */}
      <EtudeSection
        id="defi"
        theme="subtle"
        eyebrow={defi.eyebrow}
        title={defi.title}
        description={defi.description}
      >
        <div className="grid gap-16 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,28.75rem)] desktop:gap-24">
          <ul className="grid gap-16 tablet:grid-cols-2 desktop:col-span-2 desktop:gap-24">
            {defi.items.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 2) * 80}>
                <IconCard
                  icon={DEFI_ICONS[i]}
                  title={d.title}
                  text={d.text}
                  className="tablet:gap-16 tablet:p-24"
                />
              </Reveal>
            ))}
          </ul>
          <Reveal className="flex flex-col gap-16 rounded-xl bg-background-inverse p-20 tablet:p-24">
            <p className="text-overline text-text-accent-on-dark">{defi.illustration.label}</p>
            <p className="text-text-inverse-muted text-body-s">{defi.illustration.text}</p>
            <Image
              src={`${MEDIA}/volatilite-courbe.webp`}
              width={412}
              height={422}
              alt={defi.illustration.alt}
              sizes="(min-width: 75rem) 412px, 0px"
              className="mt-auto h-auto w-full max-desktop:hidden"
            />
            <Image
              src={`${MEDIA}/volatilite-courbe-mobile.webp`}
              width={294}
              height={302}
              alt={defi.illustration.alt}
              sizes="(min-width: 75rem) 0px, 80vw"
              className="mx-auto h-auto w-full max-w-[25rem] desktop:hidden"
            />
            <Note dark icon>
              {defi.illustration.note}
            </Note>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 03 — Notre approche */}
      <EtudeSection
        id="approche"
        eyebrow={approche.eyebrow}
        title={approche.title}
        description={approche.description}
      >
        <ol className="grid gap-16 tablet:grid-cols-2 tablet:gap-20 desktop:grid-cols-4 desktop:gap-32">
          {approche.pillars.map((p, i) => {
            const on = i === 3;
            return (
              <Reveal as="li" key={p.title} delay={i * 80} className="relative flex flex-col">
                <div
                  className={cn(
                    "flex h-full flex-col gap-16 rounded-lg border p-20 tablet:p-24",
                    on
                      ? "border-accent-cyan bg-background-inverse"
                      : "border-border-default bg-surface-default",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <IconTile
                      icon={PILLAR_ICONS[i]}
                      tone="blue"
                      size="M"
                      className={cn(on && "bg-surface-default text-primary-default")}
                    />
                    <span
                      aria-hidden
                      className={cn("font-mono! text-body-xs", on ? "text-accent-cyan" : "text-text-muted")}
                    >
                      {pad(i)}
                    </span>
                  </div>
                  <h3 className={cn("text-h5", on ? "text-text-inverse" : "text-text-primary")}>
                    <span className="sr-only">{pad(i)}. </span>
                    {p.title}
                  </h3>
                  <p className={cn("text-body-s", on ? "text-text-inverse-muted" : "text-text-secondary")}>
                    {p.text}
                  </p>
                </div>
                {i < approche.pillars.length - 1 && (
                  <ArrowDown
                    aria-hidden
                    size={16}
                    strokeWidth={1.75}
                    className="mx-auto mt-16 text-primary-brand tablet:hidden"
                  />
                )}
                {i < approche.pillars.length - 1 && (
                  <StepArrow className="absolute top-1/2 -right-30 z-10 -translate-y-1/2 border-0 bg-transparent max-desktop:hidden" />
                )}
              </Reveal>
            );
          })}
        </ol>
      </EtudeSection>

      {/* 04 — Deux marchés, une plateforme */}
      <EtudeSection
        id="marches"
        theme="subtle"
        eyebrow={marches.eyebrow}
        title={marches.title}
        description={marches.description}
      >
        <div className="flex flex-col gap-24 desktop:gap-32">
          <div className="grid gap-24 desktop:grid-cols-2">
            {marches.markets.map((m, i) => (
              <Reveal
                key={m.name}
                delay={i * 120}
                className="flex flex-col gap-20 rounded-xl bg-background-inverse p-20 text-text-inverse tablet:p-32"
              >
                <div className="flex flex-col gap-12 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-16">
                  <div className="flex flex-col gap-4">
                    <p
                      className={cn(
                        "text-overline",
                        i === 0 ? "text-accent-orange" : "text-text-accent-on-dark",
                      )}
                    >
                      {m.label}
                    </p>
                    <h3 className="text-h2 text-text-inverse">{m.name}</h3>
                  </div>
                  <span className="shrink-0 rounded-xs border border-inverse-line px-8 py-4 font-mono! text-text-inverse-muted text-body-xs tablet:mt-8">
                    {m.unit}
                  </span>
                </div>
                <Image
                  src={`${MEDIA}/tendance-${i === 0 ? "cacao" : "robusta"}.webp`}
                  width={516}
                  height={82}
                  alt={m.curveAlt}
                  sizes="(min-width: 75rem) 516px, 90vw"
                  className="h-auto w-full"
                />
                <dl className="flex flex-col">
                  {marches.rows.map((r) => (
                    <div
                      key={r.label}
                      className="grid gap-4 border-t border-inverse-line py-12 tablet:grid-cols-[8.75rem_minmax(0,1fr)] tablet:gap-16"
                    >
                      <dt className="text-text-inverse-muted text-body-s">{r.label}</dt>
                      <dd className="text-text-inverse text-body-m">{r.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-text-inverse-muted text-body-xs">{marches.curveNote}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-20 tablet:p-24">
            <h3 className="text-text-primary text-h5">{marches.signalsTitle}</h3>
            <ul className="flex flex-wrap gap-8">
              {marches.signals.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border-default bg-background-subtle px-12 py-4 text-text-primary text-body-xs"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 05 — Historique continu */}
      <EtudeSection
        id="historique"
        eyebrow={histo.eyebrow}
        title={histo.title}
        description={histo.description}
      >
        <div className="flex flex-col gap-24 desktop:gap-32">
          <div className="grid gap-24 desktop:grid-cols-2">
            {histo.series.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 120}
                className={cn(
                  "flex flex-col gap-16 rounded-xl border bg-surface-default p-20 tablet:p-28",
                  i === 1 ? "border-primary-brand" : "border-border-default",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-8">
                  <h3 className="text-text-primary text-h5">{s.title}</h3>
                  <span
                    className={cn(
                      "rounded-full px-10 py-2 font-medium text-body-xs",
                      i === 0
                        ? "bg-warning-subtle text-warning-default"
                        : "bg-primary-subtle text-primary-default",
                    )}
                  >
                    {s.tag}
                  </span>
                </div>
                <Image
                  src={`${MEDIA}/${i === 0 ? "serie-naive" : "serie-reconstruite"}.webp`}
                  width={530}
                  height={200}
                  alt={s.alt}
                  sizes="(min-width: 48rem) 530px, 0px"
                  className="h-auto w-full max-tablet:hidden"
                />
                <Image
                  src={`${MEDIA}/${i === 0 ? "serie-naive" : "serie-reconstruite"}-mobile.webp`}
                  width={284}
                  height={200}
                  alt={s.alt}
                  sizes="(min-width: 48rem) 0px, 90vw"
                  className="h-auto w-full tablet:hidden"
                />
                <p className="text-text-secondary text-body-s">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <Note icon>{histo.demo}</Note>
          <ol className="grid gap-12 tablet:grid-cols-3 desktop:grid-cols-6">
            {histo.steps.map((s, i) => (
              <Reveal
                as="li"
                key={s}
                delay={i * 60}
                className="flex flex-col gap-8 rounded-lg border border-border-default bg-background-subtle p-16"
              >
                <span aria-hidden className="font-mono! text-primary-default text-label-s">
                  {pad(i)}
                </span>
                <span className="text-text-primary text-body-s">{s}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </EtudeSection>

      {/* 06 — Aperçu du tableau de bord */}
      <EtudeSection
        id="apercu"
        theme="dark"
        eyebrow={apercu.eyebrow}
        title={apercu.title}
        description={apercu.description}
      >
        <div className="grid gap-32 tablet:grid-cols-2 tablet:gap-x-24 tablet:gap-y-48">
          {apercu.mockups.map((m, i) => (
            <MockupFigure
              key={m.title}
              number={pad(i)}
              title={m.title}
              caption={m}
              image={{ src: `${MEDIA}/maquette-${pad(i)}.webp`, width: 588, height: 378, alt: m.alt }}
              mobile={{ src: `${MEDIA}/maquette-${pad(i)}-mobile.webp`, width: 342, height: 260, alt: m.alt }}
            />
          ))}
        </div>
      </EtudeSection>

      {/* 07 — Machine Learning */}
      <EtudeSection id="machine-learning" eyebrow={ml.eyebrow} title={ml.title} description={ml.description}>
        <div className="flex flex-col gap-24 desktop:gap-32">
          <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-24">
            {ml.engines.map((e, i) => (
              <Reveal
                as="li"
                key={e.title}
                delay={i * 80}
                className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-20 tablet:p-28"
              >
                <div className="flex items-center justify-between">
                  <IconTile icon={ENGINE_ICONS[i]} tone="blue" size="M" />
                  <span className="font-mono! text-text-muted uppercase text-body-xs">
                    {ml.engineLabel} {pad(i)}
                  </span>
                </div>
                <h3 className="text-h4 text-text-primary">{e.title}</h3>
                <p className="text-text-secondary text-body-s">{e.text}</p>
                <ul className="flex flex-wrap gap-8">
                  {e.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-background-subtle px-10 py-4 text-text-secondary text-body-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
          <Reveal className="flex flex-col gap-24 rounded-xl bg-background-inverse p-20 text-text-inverse tablet:p-32">
            <p className="text-overline text-text-accent-on-dark">{ml.chainLabel}</p>
            <ol className="flex flex-col items-stretch gap-8 desktop:flex-row desktop:items-center">
              {ml.chain.map((step, i) => {
                const Icon = CHAIN_ICONS[i];
                const last = i === ml.chain.length - 1;
                return (
                  <Fragment key={step}>
                    {i === 2 && (
                      <>
                        <li className="flex flex-col gap-6 self-center rounded-md border border-dashed border-accent-cyan p-10 max-desktop:w-full max-desktop:max-w-[13rem]">
                          <ul className="flex flex-col gap-6">
                            {ENGINES.map((en) => (
                              <Mono key={en} dark className="text-center">
                                {en}
                              </Mono>
                            ))}
                          </ul>
                        </li>
                        <ChainArrow />
                      </>
                    )}
                    <li
                      className={cn(
                        "flex flex-1 flex-col items-center justify-center gap-6 rounded-md border px-12 py-14 text-center text-label-s",
                        last
                          ? "border-primary-brand bg-primary-brand text-text-inverse"
                          : "border-inverse-line bg-surface-inverse text-text-inverse",
                      )}
                    >
                      <Icon
                        aria-hidden
                        size={18}
                        strokeWidth={1.75}
                        className={last ? "text-text-inverse" : "text-accent-cyan"}
                      />
                      {step}
                    </li>
                    {!last && <ChainArrow />}
                  </Fragment>
                );
              })}
            </ol>
            <div className="flex flex-wrap items-center gap-8">
              <p className="text-text-inverse-muted text-body-s">{ml.horizonsLabel}</p>
              <ul className="flex flex-wrap gap-8">
                {ml.horizons.map((h) => (
                  <Mono key={h} dark className="text-accent-cyan">
                    {h}
                  </Mono>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-12 rounded-md bg-surface-inverse p-16 text-text-inverse-muted text-body-s">
              <RefreshCw
                aria-hidden
                size={16}
                strokeWidth={1.75}
                className="mt-4 shrink-0 text-accent-cyan"
              />
              {ml.retraining}
            </p>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 08 — Validation */}
      <EtudeSection
        id="validation"
        theme="dark"
        eyebrow={valid.eyebrow}
        title={valid.title}
        description={valid.description}
      >
        <div className="flex flex-col gap-32 desktop:gap-48">
          <Reveal>
            <blockquote className="border-l-4 border-accent-cyan pl-16 text-text-inverse text-h3">
              {valid.quote}
            </blockquote>
          </Reveal>
          <div className="grid gap-32 desktop:grid-cols-[minmax(0,27.5rem)_minmax(0,1fr)] desktop:gap-24">
            <Reveal className="flex flex-col gap-16">
              <h3 className="font-medium text-text-inverse text-body-m">{valid.rulesTitle}</h3>
              <ol className="flex flex-col gap-12">
                {valid.rules.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-start gap-12 rounded-md border border-glass-card-border bg-glass-card p-16 text-text-inverse text-body-s"
                  >
                    <span
                      aria-hidden
                      className="flex size-24 shrink-0 items-center justify-center rounded-xs bg-accent-cyan font-mono! text-secondary-dark text-label-s"
                    >
                      {i + 1}
                    </span>
                    {r}
                  </li>
                ))}
              </ol>
              <ul className="flex flex-col gap-12">
                {valid.method.map((m, i) => {
                  const Icon = METHOD_ICONS[i];
                  return (
                    <li key={m} className="flex items-start gap-8 text-text-inverse-muted text-body-s">
                      <Icon
                        aria-hidden
                        size={16}
                        strokeWidth={1.75}
                        className="mt-4 shrink-0 text-accent-cyan"
                      />
                      {m}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal className="flex flex-col gap-16 rounded-xl bg-surface-default p-20 text-text-primary tablet:p-28">
              <p
                role="note"
                className="flex items-start gap-12 rounded-md border border-dashed border-warning-default bg-warning-subtle px-16 py-12 text-warning-default text-body-m"
              >
                <CircleAlert aria-hidden size={18} strokeWidth={1.75} className="mt-4 shrink-0" />
                {valid.status}
              </p>
              <h3 className="text-text-primary text-h5">{valid.chartTitle}</h3>
              <Image
                src={`${MEDIA}/mape-cacao.webp`}
                width={680}
                height={260}
                alt={valid.chartAlt}
                sizes="(min-width: 48rem) 680px, 0px"
                className="h-auto w-full max-tablet:hidden"
              />
              <Image
                src={`${MEDIA}/mape-cacao-mobile.webp`}
                width={286}
                height={280}
                alt={valid.chartAlt}
                sizes="(min-width: 48rem) 0px, 90vw"
                className="h-auto w-full tablet:hidden"
              />
              <ul className="flex flex-wrap gap-x-24 gap-y-8 text-text-secondary text-body-s">
                <li className="flex items-center gap-8">
                  <span aria-hidden className="size-12 rounded-xs bg-secondary-dark" />
                  {valid.legend[0]}
                </li>
                <li className="flex items-center gap-8">
                  <span
                    aria-hidden
                    className="size-12 rounded-xs border border-dashed border-accent-orange bg-accent-orange-soft"
                  />
                  {valid.legend[1]}
                </li>
              </ul>
              {valid.notes.map((n) => (
                <p key={n} className="text-text-secondary text-body-s">
                  {n}
                </p>
              ))}
              <div className="flex flex-col gap-8 rounded-md bg-background-subtle p-16 text-text-secondary text-body-s tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-12">
                <p className="font-medium text-text-primary">{valid.publishLabel}</p>
                {valid.publish.map((p, i) => (
                  <p key={p.badge} className="flex flex-wrap items-center gap-8">
                    <span
                      className={cn(
                        "inline-flex items-center gap-4 rounded-full border px-8 py-2 font-medium text-body-xs",
                        i === 0
                          ? "border-primary-brand bg-primary-subtle text-primary-default"
                          : "border-dashed border-warning-default bg-warning-subtle text-warning-default",
                      )}
                    >
                      {i === 0 ? (
                        <Check aria-hidden size={12} strokeWidth={2} />
                      ) : (
                        <CircleAlert aria-hidden size={12} strokeWidth={2} />
                      )}
                      {p.badge}
                    </span>
                    {p.text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </EtudeSection>

      {/* 09 — Traçabilité des prévisions */}
      <EtudeSection
        id="tracabilite"
        theme="subtle"
        eyebrow={trace.eyebrow}
        title={trace.title}
        description={trace.description}
      >
        <div className="grid gap-32 desktop:grid-cols-[minmax(0,1fr)_minmax(0,38.9rem)] desktop:items-center desktop:gap-40">
          <Reveal className="flex flex-col gap-24">
            <ol className="flex flex-col">
              {trace.steps.map((s, i) => {
                const Icon = TRACE_ICONS[i];
                const last = i === trace.steps.length - 1;
                return (
                  <li key={s.title} className="relative flex gap-16 pb-20 last:pb-0">
                    {!last && (
                      <span aria-hidden className="absolute top-40 bottom-0 left-18 w-1 bg-border-strong" />
                    )}
                    <span
                      className={cn(
                        "relative flex size-36 shrink-0 items-center justify-center rounded-full border",
                        last
                          ? "border-primary-brand bg-primary-brand text-text-inverse"
                          : "border-primary-brand bg-surface-default text-primary-brand",
                      )}
                    >
                      <Icon aria-hidden size={16} strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col gap-4">
                      <span className="text-text-primary text-h5">{s.title}</span>
                      <span className="text-text-secondary text-body-s">{s.text}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <ul className="flex flex-wrap gap-8">
              {trace.values.map((v) => (
                <li
                  key={v}
                  className="rounded-full bg-primary-subtle px-10 py-4 text-primary-default text-body-xs"
                >
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal distance={24}>
            <Image
              src={`${MEDIA}/journal.webp`}
              width={666}
              height={401}
              alt={trace.journalAlt}
              sizes="(min-width: 48rem) 623px, 0px"
              className="h-auto w-full rounded-lg border border-border-default shadow-md max-tablet:hidden"
            />
            <Image
              src={`${MEDIA}/journal-mobile.webp`}
              width={342}
              height={280}
              alt={trace.journalAlt}
              sizes="(min-width: 48rem) 0px, 90vw"
              className="h-auto w-full rounded-lg shadow-md tablet:hidden"
            />
          </Reveal>
        </div>
      </EtudeSection>

      {/* 10 — Automatisation */}
      <EtudeSection
        id="automatisation"
        eyebrow={auto.eyebrow}
        title={auto.title}
        description={auto.description}
      >
        <div className="flex flex-col gap-24">
          <div className="grid gap-16 desktop:grid-cols-[minmax(0,21.25rem)_minmax(0,1fr)] desktop:gap-24">
            <Reveal className="flex flex-col gap-16 rounded-xl bg-background-inverse p-20 text-text-inverse tablet:p-24">
              <p className="text-overline text-text-accent-on-dark">{auto.calendarLabel}</p>
              <p className="sr-only">{auto.daysLabel}</p>
              <ul aria-hidden className="flex flex-wrap gap-4">
                {auto.days.map((d, i) => (
                  <li
                    key={d}
                    className={cn(
                      "rounded-xs px-8 py-4 text-body-xs",
                      ACTIVE_DAYS.includes(i)
                        ? "bg-primary-brand text-text-inverse"
                        : "bg-surface-inverse text-text-inverse-muted",
                    )}
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <dl className="flex flex-col gap-12">
                {auto.times.map((tm) => (
                  <div key={tm.time} className="flex items-start gap-16">
                    <dt className="font-mono! text-text-inverse text-h5">{tm.time}</dt>
                    <dd className="text-text-inverse-muted text-body-s">{tm.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="flex flex-col gap-20 rounded-xl border border-border-default bg-background-subtle p-20 tablet:p-24">
              <div className="flex flex-col gap-4">
                <h3 className="text-text-primary text-h5">{auto.keyTitle}</h3>
                <p className="text-text-secondary text-body-s">{auto.keyText}</p>
              </div>
              <ol className="relative grid grid-cols-3 gap-y-16 tablet:grid-cols-6">
                <span
                  aria-hidden
                  className="absolute inset-x-[8%] top-18 h-1 bg-border-strong max-tablet:hidden"
                />
                {auto.keySteps.map((k, i) => {
                  const Icon = KEY_ICONS[i];
                  return (
                    <li
                      key={k}
                      className="relative flex flex-col items-center gap-8 text-center text-label-s"
                    >
                      <span className="flex size-36 items-center justify-center rounded-full border border-primary-brand bg-surface-default text-primary-brand">
                        <Icon aria-hidden size={16} strokeWidth={1.75} />
                      </span>
                      {k}
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
          <div className="grid gap-16 desktop:grid-cols-[minmax(0,38.75rem)_minmax(0,1fr)] desktop:gap-24">
            <Reveal className="flex flex-col gap-12 rounded-xl border border-accent-cyan bg-background-inverse p-20 text-text-inverse tablet:p-24">
              <h3 className="flex items-center gap-8 font-medium text-body-m">
                <Cpu aria-hidden size={16} strokeWidth={1.75} className="text-accent-cyan" />
                {auto.engine.title}
              </h3>
              <ol className="flex flex-col gap-8">
                {auto.engine.steps.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-center gap-12 rounded-sm bg-surface-inverse px-12 py-10 text-body-s"
                  >
                    <span aria-hidden className="font-mono! text-accent-cyan text-body-xs">
                      {pad(i)}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </Reveal>
            <div className="flex flex-col gap-16">
              {[
                { ...auto.api, n: 8, Icon: Code },
                { ...auto.ui, n: 9, Icon: PanelsTopLeft },
              ].map(({ title, step, n, Icon }) => (
                <Reveal
                  key={title}
                  className="flex flex-col gap-12 rounded-xl border border-border-default bg-surface-default p-20"
                >
                  <h3 className="flex items-center gap-8 font-medium text-text-primary text-body-m">
                    <Icon aria-hidden size={16} strokeWidth={1.75} className="text-primary-brand" />
                    {title}
                  </h3>
                  <p className="flex items-center gap-12 rounded-sm bg-background-subtle px-12 py-10 text-text-primary text-body-s">
                    <span aria-hidden className="font-mono! text-primary-default text-body-xs">
                      {pad(n - 1)}
                    </span>
                    {step}
                  </p>
                </Reveal>
              ))}
              <Reveal className="flex flex-col gap-8 rounded-xl border border-border-default bg-background-subtle p-20">
                <p className="text-overline text-primary-default">{auto.rolesLabel}</p>
                <p className="text-text-secondary text-body-s">{auto.roles}</p>
              </Reveal>
            </div>
          </div>
          <Reveal className="flex items-start gap-12 rounded-lg border border-border-default bg-background-subtle px-16 py-12 text-text-primary text-body-s">
            <span aria-hidden className="mt-2 font-mono! text-primary-default text-body-xs">
              10
            </span>
            <CircleAlert
              aria-hidden
              size={16}
              strokeWidth={1.75}
              className="mt-2 shrink-0 text-primary-brand"
            />
            {auto.monitoring}
          </Reveal>
        </div>
      </EtudeSection>

      {/* 11 — Architecture */}
      <EtudeSection
        id="architecture"
        theme="subtle"
        eyebrow={archi.eyebrow}
        title={archi.title}
        description={archi.description}
      >
        <div className="flex flex-col gap-24">
          <ol className="flex flex-col items-stretch gap-8 desktop:flex-row">
            {archi.blocks.map((b, i) => {
              const Icon = BLOCK_ICONS[i];
              const on = i === 1;
              return (
                <Fragment key={b.title}>
                  <Reveal
                    as="li"
                    delay={i * 60}
                    className={cn(
                      "flex flex-1 flex-col gap-8 rounded-lg border p-16",
                      on
                        ? "border-accent-cyan bg-background-inverse text-text-inverse desktop:flex-[1.3]"
                        : "border-border-default bg-surface-default text-text-primary",
                    )}
                  >
                    <h3 className="flex items-center gap-8 font-medium text-body-m">
                      <Icon
                        aria-hidden
                        size={16}
                        strokeWidth={1.75}
                        className={on ? "text-accent-cyan" : "text-primary-brand"}
                      />
                      {b.title}
                    </h3>
                    <p className={cn("text-body-xs", on ? "text-text-inverse-muted" : "text-text-secondary")}>
                      {b.text}
                    </p>
                    {b.chips.length > 0 && (
                      <ul className="flex flex-wrap gap-6">
                        {b.chips.map((c) => (
                          <Mono key={c} dark={on}>
                            {c}
                          </Mono>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                  {i < archi.blocks.length - 1 && <ChainArrow light />}
                </Fragment>
              );
            })}
          </ol>
          <Reveal className="flex flex-col gap-12 rounded-lg border border-border-default bg-surface-default p-16 tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-16">
            <p className="flex items-center gap-8 font-medium text-text-primary text-body-m">
              <Database aria-hidden size={16} strokeWidth={1.75} className="shrink-0 text-primary-brand" />
              {archi.storage.title}
            </p>
            <ul className="flex flex-wrap gap-6">
              {archi.storage.chips.map((c) => (
                <Mono key={c}>{c}</Mono>
              ))}
            </ul>
            <p className="text-text-secondary text-body-s tablet:ml-auto">{archi.storage.text}</p>
          </Reveal>
          <Reveal className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-20 tablet:p-24">
            <h3 className="text-text-primary text-h5">{archi.securityTitle}</h3>
            <CheckChips
              items={archi.security}
              className="max-tablet:items-stretch desktop:grid desktop:grid-cols-3"
            />
          </Reveal>
          <InfoAlert title={archi.alertTitle}>{archi.alertText}</InfoAlert>
        </div>
      </EtudeSection>

      {/* 12 — Bénéfices métiers */}
      <EtudeSection
        id="benefices"
        eyebrow={benef.eyebrow}
        title={benef.title}
        description={benef.description}
      >
        <div className="flex flex-col gap-40">
          <ul className="grid gap-40 tablet:grid-cols-2 tablet:gap-x-24 desktop:grid-cols-3">
            {benef.items.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 3) * 80}>
                <IconCard icon={BENEFIT_ICONS[i]} title={b.title} text={b.text} flat />
              </Reveal>
            ))}
          </ul>
          <Note icon>{benef.disclaimer}</Note>
        </div>
      </EtudeSection>

      {/* 13 — Limites et évolution */}
      <EtudeSection
        id="limites"
        theme="subtle"
        eyebrow={limites.eyebrow}
        title={limites.title}
        description={limites.description}
      >
        <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-3">
          {limites.items.map((it, i) => {
            const Icon = TRACK_ICONS[i];
            return (
              <Reveal
                as="li"
                key={it}
                delay={(i % 3) * 60}
                className="flex flex-col gap-12 rounded-lg border border-dashed border-border-strong bg-surface-default p-16 tablet:p-20"
              >
                <div className="flex items-center gap-8 tablet:justify-between">
                  <Icon aria-hidden size={16} strokeWidth={1.75} className="text-primary-brand" />
                  <span className="rounded-full bg-background-muted px-8 py-2 text-text-secondary text-body-xs">
                    {limites.tag}
                  </span>
                </div>
                <h3 className="font-medium text-text-primary text-body-m">{it}</h3>
              </Reveal>
            );
          })}
        </ul>
      </EtudeSection>

      <MentionsBand
        clientLogo={{ ...SCPB_LOGO, alt: "SCPB" }}
        title={t("mentions.title")}
        text={t("mentions.text")}
        action={t("mentions.action")}
      />

      {/* 14 — Réalisation ZIIIILO */}
      <CtaSection
        title={cta.title}
        description={cta.description}
        primary={{ label: cta.primary, href: "/contact" }}
        secondary={{ label: cta.secondary, href: "/realisations" }}
      />
    </>
  );
}

/** Flèche entre deux maillons : vers la droite en desktop, vers le bas en dessous. */
function ChainArrow({ light = false }: { light?: boolean }) {
  return (
    <li
      aria-hidden
      className={cn("flex justify-center", light ? "text-text-muted" : "text-text-inverse-muted")}
    >
      <ChevronRight size={16} strokeWidth={1.75} className="max-desktop:hidden" />
      <ChevronDown size={16} strokeWidth={1.75} className="desktop:hidden" />
    </li>
  );
}
