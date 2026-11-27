import {
  BarChart3,
  ChevronRight,
  CircleCheck,
  Database,
  Eye,
  FileText,
  Globe,
  Languages,
  Layers,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  PenTool,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  SlidersVertical,
  Sparkle,
  Target,
  Users,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/motion/text";
import { IconTile } from "@/components/ui/IconTile";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import {
  CheckChips,
  Compare,
  EtudeHero,
  EtudeSection,
  HeroActions,
  IconCard,
  InfoAlert,
  LayerCard,
  MentionsBand,
  MockupFigure,
  Note,
  StepArrow,
  T,
  Visual,
  WorkflowStep,
  type CompareColumn,
  type Txt,
} from "./kit";

/**
 * SCPB Commercial — Figma desktop 103:11672, mobile 111:11199 (§7 v1.5). Tablette : version
 * mobile élargie, grilles en 2 colonnes, frise en 3 + 3. Solution métier réalisée pour SCPB :
 * mentions « à confirmer » visibles, aucun gain chiffré, maquettes conceptuelles à données fictives.
 */

const MEDIA = "/media/etudes/scpb-commercial";
const SCPB_LOGO = { src: "/media/etudes/clients/scpb.svg", width: 290, height: 160 };

type Titled = Txt & { title: string };

const PILLAR_ICONS: LucideIcon[] = [Search, Target, Sparkle, ShieldCheck, BarChart3];
const STEP_ICONS: LucideIcon[] = [Search, Target, Sparkle, CircleCheck, Send, BarChart3];
const ACTION_ICONS: LucideIcon[] = [Eye, PenTool, RefreshCw, CircleCheck, X];
const FEATURE_ICONS: LucideIcon[] = [
  Search,
  FileText,
  Users,
  Layers,
  Sparkle,
  CircleCheck,
  Send,
  MessageCircle,
  LayoutDashboard,
  SlidersVertical,
];
const CHAIN_ICONS: LucideIcon[] = [Sparkle, Eye, CircleCheck, ShieldCheck, Send];
const PRINCIPLE_ICONS: LucideIcon[] = [Sparkle, CircleCheck, ShieldCheck];
const LAYER_ICONS: LucideIcon[] = [PanelsTopLeft, Database, Sparkle, Search, Send, Workflow];
const SECURITY_ICONS: LucideIcon[] = [CircleCheck, Layers, ShieldCheck, RefreshCw];
const BENEFIT_ICONS: LucideIcon[] = [Zap, PanelsTopLeft, Languages, Target, LayoutDashboard, ShieldCheck];
const PARAM_ICONS: LucideIcon[] = [Layers, Globe, MapPin, Languages, Users, Target, MessageCircle, Mail];

const MOCKUP_MOBILE_HEIGHTS = [250, 250, 250, 250, 300, 270];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function EtudePage() {
  const t = await getTranslations("etude-scpb-commercial");
  const hero = t.raw("hero") as Record<string, string> & { badges: string[] };
  const defi = t.raw("defi") as Record<string, string> & { before: CompareColumn; after: CompareColumn };
  const solution = t.raw("solution") as Record<string, string> & { pillars: Titled[] };
  const flow = t.raw("fonctionnement") as Record<string, string> & {
    steps: Titled[];
    panel: { label: string; title: string; text: string; actions: string[] };
  };
  const apercu = t.raw("apercu") as Record<string, string> & {
    mockups: (Titled & { alt: string })[];
    features: Titled[];
  };
  const ia = t.raw("ia") as Record<string, string> & {
    chain: { title: string; tag: string }[];
    principles: Titled[];
  };
  const tech = t.raw("technologies") as Record<string, string> & {
    layers: (Txt & { title: string; chips: string[] })[];
  };
  const secu = t.raw("securite") as Record<string, string> & { pillars: Titled[]; guards: string[] };
  const benef = t.raw("benefices") as Record<string, string> & { items: Titled[] };
  const adapt = t.raw("adaptabilite") as Record<string, string> & {
    needs: string[];
    params: { title: string; text: string }[];
  };

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero */}
      <EtudeHero
        crumb={hero.crumb}
        identity={
          <span className="flex items-center gap-16">
            <span className="flex h-44 w-76 items-center justify-center rounded-xs bg-surface-default px-6 tablet:h-52 tablet:w-90">
              <Image
                src={SCPB_LOGO.src}
                alt={hero.logoAlt}
                width={SCPB_LOGO.width}
                height={SCPB_LOGO.height}
                unoptimized
                priority
                className="h-auto w-full"
              />
            </span>
            <span className="font-display text-text-inverse text-h3">
              {hero.name}{" "}
              <span className="font-body font-normal text-text-inverse-muted">{hero.product}</span>
            </span>
          </span>
        }
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand">
              {hero.badges[0]}
            </StatusBadge>
            <StatusBadge tone="neutral" className="bg-surface-default text-text-primary">
              {hero.badges[1]}
            </StatusBadge>
          </>
        }
        title={hero.title}
        lead={hero.lead}
        actions={
          <HeroActions
            primary={{ label: hero.primary, labelShort: hero.primaryShort, href: "#apercu" }}
            secondary={{ label: hero.secondary, href: "/realisations" }}
          />
        }
        note={hero.note}
        visual={
          <Visual
            image={{ src: `${MEDIA}/hero.webp`, width: 1363, height: 1147, alt: hero.visualAlt }}
            priority
            sizes="(min-width: 75rem) 572px, (min-width: 48rem) 80vw, 100vw"
            className="mx-auto max-w-[35.75rem] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] desktop:max-w-none"
          />
        }
        visualMobile={
          <Visual
            image={{ src: `${MEDIA}/hero-mobile.webp`, width: 342, height: 250, alt: hero.visualMobileAlt }}
            priority
            sizes="100vw"
          />
        }
      />

      {/* 02 — Le défi */}
      <EtudeSection
        id="defi"
        theme="subtle"
        eyebrow={defi.eyebrow}
        title={defi.title}
        description={defi.description}
        descriptionShort={defi.descriptionShort}
      >
        <div className="flex flex-col gap-32 desktop:gap-56">
          <Compare before={defi.before} after={defi.after} />
          <Note>{defi.note}</Note>
        </div>
      </EtudeSection>

      {/* 03 — La solution */}
      <EtudeSection
        id="solution"
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.description}
        descriptionShort={solution.descriptionShort}
      >
        <div className="flex flex-col">
          <ol className="grid gap-16 tablet:grid-cols-2 tablet:gap-20 desktop:grid-cols-5 desktop:gap-32">
            {solution.pillars.map((p, i) => {
              const on = i === 3;
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 80}
                  className="relative flex flex-col max-tablet:after:mx-auto max-tablet:after:h-16 max-tablet:after:w-2 max-tablet:after:bg-border-strong max-tablet:after:content-[''] max-tablet:last:after:hidden"
                >
                  <div
                    className={cn(
                      "flex h-full items-center gap-16 rounded-lg border p-20 tablet:flex-col tablet:items-start tablet:gap-20 tablet:p-24",
                      on
                        ? "border-accent-cyan bg-background-inverse"
                        : "border-border-default bg-surface-default",
                    )}
                  >
                    <div className="flex items-center justify-between tablet:w-full">
                      <IconTile
                        icon={Icon}
                        tone="blue"
                        size="L"
                        className={cn(on && "bg-surface-default text-primary-default")}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "font-mono! text-body-xs max-tablet:hidden",
                          on ? "text-accent-cyan" : "text-text-muted",
                        )}
                      >
                        {pad(i)}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-8 tablet:gap-12">
                      <h3 className={cn("text-h5", on ? "text-text-inverse" : "text-text-primary")}>
                        <span className="sr-only">{pad(i)}. </span>
                        {p.title}
                      </h3>
                      <p
                        className={cn("text-body-s", on ? "text-text-inverse-muted" : "text-text-secondary")}
                      >
                        <T {...p} />
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={cn(
                        "font-mono! text-body-xs tablet:hidden",
                        on ? "text-accent-cyan" : "text-text-muted",
                      )}
                    >
                      {pad(i)}
                    </span>
                  </div>
                  {i < solution.pillars.length - 1 && (
                    <StepArrow className="absolute top-[calc(50%-1.5rem)] -right-30 z-10 -translate-y-1/2 max-desktop:hidden" />
                  )}
                  <span aria-hidden className="mx-auto h-48 w-1 bg-border-strong max-desktop:hidden" />
                </Reveal>
              );
            })}
          </ol>
          <Reveal className="mt-16 flex flex-col gap-16 rounded-lg bg-background-inverse px-20 py-20 tablet:mt-24 desktop:mt-0 desktop:flex-row desktop:items-center desktop:justify-between desktop:px-24">
            <p className="flex items-start gap-12 text-text-inverse text-body-m desktop:items-center">
              <Database
                aria-hidden
                size={20}
                strokeWidth={1.75}
                className="mt-2 shrink-0 text-accent-cyan desktop:mt-0"
              />
              {solution.base}
            </p>
            <p className="flex w-fit items-start gap-8 rounded-full text-text-inverse-muted text-body-s desktop:items-center desktop:border desktop:border-inverse-line desktop:bg-glass-card desktop:px-12 desktop:py-6">
              <RefreshCw
                aria-hidden
                size={14}
                strokeWidth={1.75}
                className="mt-4 shrink-0 text-accent-cyan desktop:mt-0"
              />
              {solution.loop}
            </p>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 04 — Comment ça fonctionne */}
      <EtudeSection
        id="fonctionnement"
        theme="subtle"
        eyebrow={flow.eyebrow}
        title={flow.title}
        description={flow.description}
        descriptionShort={flow.descriptionShort}
      >
        <div className="flex flex-col gap-32 desktop:gap-48">
          <div className="flex flex-col gap-16">
            {/* Frise : six repères reliés, le 4e mis en avant (desktop) */}
            <div aria-hidden className="relative mx-[8.33%] h-14 max-desktop:hidden">
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-border-strong" />
              <span className="absolute top-1/2 left-[40%] h-2 w-[20%] -translate-y-1/2 bg-primary-brand" />
              {flow.steps.map((s, i) => (
                <span
                  key={s.title}
                  style={{ left: `${i * 20}%` }}
                  className={cn(
                    "absolute top-1/2 -translate-1/2 rounded-full bg-primary-brand",
                    i === 3 ? "size-14 bg-accent-cyan" : "size-10",
                  )}
                />
              ))}
            </div>
            <ol className="grid gap-16 tablet:grid-cols-3 desktop:grid-cols-6 desktop:gap-16">
              {flow.steps.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 80}
                  className="flex flex-col max-tablet:after:mx-auto max-tablet:after:h-16 max-tablet:after:w-2 max-tablet:after:bg-border-strong max-tablet:after:content-[''] max-tablet:last:after:hidden"
                >
                  <WorkflowStep
                    number={pad(i)}
                    icon={STEP_ICONS[i]}
                    title={s.title}
                    text={<T {...s} />}
                    highlight={i === 3 ? flow.highlight : undefined}
                    className="max-tablet:gap-16 max-tablet:p-20"
                  />
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="grid gap-24 rounded-xl border border-accent-cyan bg-background-inverse p-24 tablet:p-40 desktop:grid-cols-[minmax(0,1fr)_minmax(0,26.25rem)] desktop:items-center desktop:gap-80 desktop:px-48 desktop:py-48">
            <div className="flex flex-col items-start gap-16">
              <span className="rounded-full bg-accent-cyan px-12 py-4 text-secondary-dark text-label-s">
                {flow.panel.label}
              </span>
              <h3 className="text-text-inverse text-h3">{flow.panel.title}</h3>
              <p className="text-text-inverse-muted text-body-m">{flow.panel.text}</p>
            </div>
            <ul className="flex flex-col gap-12">
              {flow.panel.actions.map((a, i) => {
                const Icon = ACTION_ICONS[i];
                return (
                  <li
                    key={a}
                    className="flex items-center gap-12 rounded-md border border-glass-card-border bg-surface-inverse px-20 py-12 font-medium text-text-inverse text-body-m"
                  >
                    <Icon
                      aria-hidden
                      size={18}
                      strokeWidth={1.75}
                      className={cn("shrink-0", i === 3 ? "text-accent-cyan" : "text-text-inverse-muted")}
                    />
                    {a}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 05 — Aperçu de la plateforme */}
      <EtudeSection
        id="apercu"
        theme="dark"
        eyebrow={apercu.eyebrow}
        title={apercu.title}
        description={apercu.description}
        descriptionShort={apercu.descriptionShort}
      >
        <div className="flex flex-col gap-48 desktop:gap-56">
          <div className="grid gap-32 tablet:grid-cols-2 tablet:gap-x-24 tablet:gap-y-48">
            {apercu.mockups.map((m, i) => (
              <MockupFigure
                key={m.title}
                number={pad(i)}
                title={m.title}
                caption={m}
                image={{ src: `${MEDIA}/maquette-${pad(i)}.webp`, width: 588, height: 378, alt: m.alt }}
                mobile={{
                  src: `${MEDIA}/maquette-${pad(i)}-mobile.webp`,
                  width: 342,
                  height: MOCKUP_MOBILE_HEIGHTS[i],
                  alt: m.alt,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-20 tablet:gap-24">
            <h3 className="text-h4 text-text-inverse">{apercu.featuresTitle}</h3>
            <ul className="grid tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-5">
              {apercu.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <Reveal
                    as="li"
                    key={f.title}
                    delay={(i % 5) * 60}
                    className="flex gap-12 border-t border-inverse-line py-16 tablet:flex-col tablet:gap-16 tablet:rounded-lg tablet:border tablet:border-glass-card-border tablet:bg-glass-card tablet:p-20"
                  >
                    <Icon
                      aria-hidden
                      size={20}
                      strokeWidth={1.75}
                      className="mt-2 shrink-0 text-accent-cyan"
                    />
                    <span className="flex flex-col gap-4 tablet:gap-12">
                      <span className="font-medium text-text-inverse text-body-m">{f.title}</span>
                      <span className="text-text-inverse-muted text-body-xs tablet:text-body-s">
                        <T {...f} />
                      </span>
                    </span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </EtudeSection>

      {/* 06 — Une IA sous contrôle humain */}
      <EtudeSection
        id="ia"
        eyebrow={ia.eyebrow}
        title={ia.title}
        description={ia.description}
        descriptionShort={ia.descriptionShort}
        align="center"
      >
        <div className="flex flex-col gap-32 desktop:gap-48">
          <Reveal className="flex flex-col gap-24 rounded-xl border border-border-default bg-background-subtle p-20 desktop:gap-32 desktop:p-48">
            <ol aria-label={ia.chainLabel} className="flex flex-col desktop:flex-row desktop:justify-between">
              {ia.chain.map((n, i) => {
                const Icon = CHAIN_ICONS[i];
                const circle = [
                  "border-primary-brand bg-surface-default text-primary-default",
                  "border-accent-violet bg-accent-violet-soft text-accent-violet",
                  "border-accent-cyan border-(length:--border-strong) bg-background-inverse text-accent-cyan",
                  "border-primary-brand bg-surface-default text-primary-default",
                  "border-primary-brand bg-primary-brand text-text-inverse",
                ][i];
                const tag =
                  n.tag === ia.chain[1].tag
                    ? "bg-accent-violet-soft text-accent-violet"
                    : i === ia.chain.length - 1
                      ? "bg-primary-subtle text-primary-default"
                      : "bg-background-muted text-text-secondary";
                return (
                  <li
                    key={n.title}
                    className="flex flex-col desktop:flex-1 desktop:flex-row desktop:items-start"
                  >
                    <div className="flex items-center gap-14 desktop:w-full desktop:flex-col desktop:gap-12 desktop:text-center">
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-48 shrink-0 items-center justify-center rounded-full border desktop:size-76",
                          circle,
                        )}
                      >
                        <Icon size={22} strokeWidth={1.75} className="desktop:size-28" />
                      </span>
                      <span className="flex flex-col items-start gap-4 desktop:items-center desktop:gap-12">
                        <span className="font-medium text-text-primary text-body-m">{n.title}</span>
                        <span className={cn("rounded-full px-10 py-2 text-body-xs", tag)}>{n.tag}</span>
                      </span>
                    </div>
                    {i < ia.chain.length - 1 && (
                      <span
                        aria-hidden
                        className={cn(
                          "flex w-48 justify-center desktop:mt-28 desktop:w-auto desktop:shrink-0 desktop:items-center",
                          i === 1 || i === 2 ? "text-primary-brand" : "text-text-muted",
                        )}
                      >
                        <span className="h-18 w-2 bg-current opacity-60 desktop:h-2 desktop:w-40" />
                        <ChevronRight size={18} strokeWidth={1.75} className="-ml-4 max-desktop:hidden" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mx-auto flex items-start gap-8 rounded-lg border border-border-default bg-surface-default px-16 py-12 text-text-secondary text-body-s desktop:items-center desktop:rounded-full">
              <RefreshCw
                aria-hidden
                size={14}
                strokeWidth={1.75}
                className="mt-4 shrink-0 text-accent-violet desktop:mt-0"
              />
              {ia.loop}
            </p>
          </Reveal>
          <ul className="grid gap-16 tablet:grid-cols-3 desktop:gap-24">
            {ia.principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100}>
                <IconCard
                  icon={PRINCIPLE_ICONS[i]}
                  title={p.title}
                  text={<T {...p} />}
                  highlight={i === 1}
                  row
                />
              </Reveal>
            ))}
          </ul>
          <p className="text-center text-body-l text-text-secondary max-tablet:hidden">{ia.quote}</p>
        </div>
      </EtudeSection>

      {/* 07 — Technologies */}
      <EtudeSection
        id="technologies"
        theme="subtle"
        eyebrow={tech.eyebrow}
        title={tech.title}
        description={tech.description}
      >
        <div className="flex flex-col gap-32">
          <ul className="grid gap-16 tablet:grid-cols-2 tablet:gap-20 desktop:grid-cols-3 desktop:gap-24">
            {tech.layers.map((l, i) => (
              <Reveal as="li" key={l.title} delay={(i % 3) * 80}>
                <LayerCard
                  icon={LAYER_ICONS[i]}
                  label={`${tech.layerLabel} ${pad(i)}`}
                  title={l.title}
                  chips={l.chips}
                  text={<T {...l} />}
                />
              </Reveal>
            ))}
          </ul>
          <Note icon>{tech.note}</Note>
        </div>
      </EtudeSection>

      {/* 08 — Sécurité et fiabilité */}
      <EtudeSection id="securite" eyebrow={secu.eyebrow} title={secu.title} description={secu.description}>
        <div className="flex flex-col gap-32 desktop:gap-48">
          <ul className="grid gap-24 tablet:grid-cols-2 tablet:gap-20 desktop:grid-cols-4 desktop:gap-24">
            {secu.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80}>
                <IconCard icon={SECURITY_ICONS[i]} tone="orange" title={p.title} text={p.text} flatOnMobile />
              </Reveal>
            ))}
          </ul>
          <Reveal className="flex flex-col gap-20 rounded-xl border border-border-default bg-background-subtle p-20 tablet:p-32">
            <h3 className="text-text-primary text-h5">{secu.guardsTitle}</h3>
            <CheckChips items={secu.guards} />
          </Reveal>
          <InfoAlert title={secu.alertTitle}>
            <T text={secu.alertText} textShort={secu.alertTextShort} />
          </InfoAlert>
        </div>
      </EtudeSection>

      {/* 09 — Bénéfices métiers */}
      <EtudeSection
        id="benefices"
        theme="subtle"
        eyebrow={benef.eyebrow}
        title={benef.title}
        description={benef.description}
      >
        <ul className="grid gap-40 px-24 tablet:grid-cols-2 tablet:gap-x-24 tablet:px-0 desktop:grid-cols-3 desktop:gap-y-56">
          {benef.items.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 80}>
              <IconCard icon={BENEFIT_ICONS[i]} title={b.title} text={<T {...b} />} flat />
            </Reveal>
          ))}
        </ul>
      </EtudeSection>

      {/* 10 — Adaptabilité */}
      <section
        id="adaptabilite"
        aria-labelledby="adaptabilite-title"
        className="scroll-mt-(--header-height) bg-background-inverse py-64 text-text-inverse desktop:py-120"
      >
        <div className="container grid gap-32 desktop:grid-cols-[minmax(0,36rem)_minmax(0,35rem)] desktop:items-center desktop:justify-between desktop:gap-64">
          <div className="flex flex-col gap-32 desktop:gap-40">
            <SectionHeader
              id="adaptabilite-title"
              eyebrow={adapt.eyebrow}
              title={adapt.title}
              description={adapt.description}
              descriptionShort={adapt.descriptionShort}
              theme="dark"
              className="desktop:px-32"
            />
            <Reveal className="flex flex-col gap-16 rounded-lg border border-glass-card-border bg-glass-card p-20 tablet:p-24">
              <p className="text-overline text-text-accent-on-dark">{adapt.needLabel}</p>
              <ul className="flex flex-wrap gap-8">
                {adapt.needs.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-inverse-line bg-secondary-dark px-12 py-6 text-text-inverse text-body-s"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Note dark className="max-desktop:hidden">
              {adapt.note}
            </Note>
          </div>
          <Reveal className="rounded-xl bg-surface-default p-20 text-text-primary shadow-lg tablet:p-32">
            <div className="flex items-center justify-between border-b border-border-default pb-16">
              <h3 className="text-h5">{adapt.paramsTitle}</h3>
              <SlidersVertical aria-hidden size={20} strokeWidth={1.75} className="text-primary-brand" />
            </div>
            <ul>
              {adapt.params.map((p, i) => {
                const Icon = PARAM_ICONS[i];
                return (
                  <li
                    key={p.title}
                    className="flex items-center gap-12 border-b border-border-default py-12 last:border-0 last:pb-0 tablet:gap-16 tablet:py-16"
                  >
                    <Icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-primary-brand" />
                    <span className="flex min-w-0 flex-1 flex-col gap-2">
                      <span className="font-medium text-body-m">{p.title}</span>
                      <span className="text-text-secondary text-body-xs tablet:text-body-s">{p.text}</span>
                    </span>
                    <span className="rounded-full bg-primary-subtle px-10 py-2 font-medium text-primary-default text-body-xs max-tablet:hidden">
                      {adapt.paramTag}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Note dark className="desktop:hidden">
            {adapt.note}
          </Note>
        </div>
      </section>

      <MentionsBand
        clientLogo={{ ...SCPB_LOGO, alt: "SCPB" }}
        title={t("mentions.title")}
        text={t("mentions.text")}
        action={t("mentions.action")}
      />

      {/* 11 — ZIIIILO et la transformation digitale */}
      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/realisations" }}
      />
    </>
  );
}
