import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CircleAlert,
  CircleCheck,
  Clock,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  RefreshCw,
  ShieldCheck,
  SlidersVertical,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  X,
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
  T,
  Visual,
  WorkflowStep,
  type Chip,
  type CompareColumn,
  type Txt,
} from "../scpb-commercial/kit";

/**
 * StafTrack — Figma desktop 126:14817, mobile 131:14099 (identités 122:3043, résultat de
 * pointage 124:3386). Tablette : version mobile élargie, grilles en 2 colonnes. Solution réalisée
 * pour SCPB, statut Disponible ; seuls chiffres repris de la documentation (lien 15 minutes,
 * rappel 7 jours, vidéo 75 secondes) ; maquettes conceptuelles à données fictives.
 */

const MEDIA = "/media/etudes/staftrack";
const SCPB_LOGO = { src: "/media/etudes/clients/scpb.svg", width: 290, height: 160 };

type Titled = Txt & { title: string };
type Labelled = { label: string; labelShort: string; title: string; items: Titled[] };

const STEP_ICONS: LucideIcon[] = [MessageCircle, ExternalLink, MapPin, ShieldCheck, CircleCheck];
const EMPLOYEE_ICONS: LucideIcon[] = [Clock, RefreshCw, MessageCircle, Calendar, FileText, CircleAlert];
const RH_ICONS: LucideIcon[] = [
  LayoutDashboard,
  Clock,
  RefreshCw,
  TrendingUp,
  Calendar,
  MapIcon,
  Lightbulb,
  Users,
  BarChart3,
  SlidersVertical,
];
const SECURITY_ICONS: LucideIcon[] = [ShieldCheck, MapPin, Target, CircleCheck];
const PARAM_ICONS: LucideIcon[] = [
  Building2,
  PanelsTopLeft,
  MapPin,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  MessageCircle,
];
const LAYER_ICONS: LucideIcon[] = [PanelsTopLeft, Database, ShieldCheck, MessageCircle, FileText, Smartphone];
const SETUP_ICONS: LucideIcon[] = [Building2, SlidersVertical, Users, Lightbulb, CircleCheck];
const DOC_ICONS: LucideIcon[] = [FileText, Eye, Layers];
const BENEFIT_ICONS: LucideIcon[] = [CircleCheck, Clock, MessageCircle, Smartphone];

const MOCKUP_MOBILE_HEIGHTS = [250, 260, 280, 250];
const PHONES = [
  { src: `${MEDIA}/maquette-05.webp`, width: 363, height: 603 },
  { src: `${MEDIA}/maquette-06.webp`, width: 356, height: 603 },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Surtitre + titre d'une colonne de fonctionnalités : surtitre seul (variante courte) en mobile. */
function ColumnHeading({ label, labelShort, title, dark }: Omit<Labelled, "items"> & { dark?: boolean }) {
  return (
    <h3 className="flex flex-col gap-4">
      <span className={cn("text-overline", dark ? "text-text-accent-on-dark" : "text-primary-default")}>
        <T text={label} textShort={labelShort} />
      </span>
      <span className={cn("text-h4 max-tablet:hidden", dark ? "text-text-inverse" : "text-text-primary")}>
        {title}
      </span>
    </h3>
  );
}

export default async function EtudePage() {
  const t = await getTranslations("etude-staftrack");
  const hero = t.raw("hero") as Record<string, string> & { badges: Txt[] };
  const pb = t.raw("probleme") as Record<string, string> & { before: CompareColumn; after: CompareColumn };
  const flow = t.raw("fonctionnement") as Record<string, string> & {
    steps: Titled[];
    panel: Txt & { label: string; title: string; accepted: Titled; refused: Titled };
  };
  const feat = t.raw("fonctionnalites") as Record<string, string> & {
    employee: Labelled;
    rh: Labelled;
    rules: { title: string; text: string; items: { when: string; then: string }[] };
  };
  const apercu = t.raw("apercu") as Record<string, string> & {
    mockups: (Titled & { alt: string })[];
    employee: { label: string; title: string; items: string[] };
    phones: (Titled & { alt: string })[];
  };
  const secu = t.raw("securite") as Record<string, string> & { pillars: Titled[]; guards: Chip[] };
  const espace = t.raw("espace") as Record<string, string> & { params: Titled[] };
  const tech = t.raw("technologies") as Record<string, string> & {
    layers: (Txt & { title: string; chips: string[] })[];
  };
  const setup = t.raw("miseEnPlace") as Record<string, string> & { steps: Titled[]; docs: Titled[] };
  const benef = t.raw("benefices") as Record<string, string> & { items: Titled[] };
  const cta = t.raw("cta") as Record<string, string>;

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero */}
      <EtudeHero
        crumb={hero.crumb}
        identity={
          <span className="flex items-center gap-12 tablet:gap-16">
            <span className="flex size-40 items-center justify-center rounded-md bg-primary-brand text-text-inverse tablet:size-44">
              <MapPin aria-hidden size={22} strokeWidth={1.75} />
            </span>
            <span className="font-display text-text-inverse text-h3">
              {hero.nameStart}
              <span className="text-accent-cyan">{hero.nameEnd}</span>
            </span>
          </span>
        }
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand">
              <T {...hero.badges[0]} />
            </StatusBadge>
            <StatusBadge tone="available">{hero.badges[1].text}</StatusBadge>
            <StatusBadge tone="neutral" className="bg-surface-default text-text-primary">
              {hero.badges[2].text}
            </StatusBadge>
          </>
        }
        title={hero.title}
        lead={hero.lead}
        leadShort={hero.leadShort}
        actions={
          <HeroActions
            primary={{ label: hero.primary, href: "#fonctionnement" }}
            secondary={{ label: hero.secondary, href: "/realisations" }}
          />
        }
        note={<T text={hero.note} textShort={hero.noteShort} />}
        visual={
          <Visual
            image={{ src: `${MEDIA}/hero.webp`, width: 1399, height: 1251, alt: hero.visualAlt }}
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

      {/* 02 — Le problème réglé */}
      <EtudeSection
        id="probleme"
        theme="subtle"
        eyebrow={pb.eyebrow}
        title={pb.title}
        description={pb.description}
      >
        <div className="flex flex-col gap-32 desktop:gap-56">
          <Compare before={pb.before} after={pb.after} />
          <Note>{pb.note}</Note>
        </div>
      </EtudeSection>

      {/* 03 — Comment ça marche */}
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
            {/* Frise : cinq repères reliés, le 4e (vérification) mis en avant */}
            <div aria-hidden className="relative mx-[10%] h-14 max-desktop:hidden">
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-border-strong" />
              <span className="absolute top-1/2 left-[50%] h-2 w-[25%] -translate-y-1/2 bg-primary-brand" />
              {flow.steps.map((s, i) => (
                <span
                  key={s.title}
                  style={{ left: `${i * 25}%` }}
                  className={cn(
                    "absolute top-1/2 -translate-1/2 rounded-full bg-primary-brand",
                    i === 3 ? "size-14 bg-accent-cyan" : "size-10",
                  )}
                />
              ))}
            </div>
            <ol className="grid gap-16 tablet:grid-cols-3 desktop:grid-cols-5">
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
          {/* Résultat du pointage (124:3386) : accepté / refusé hors zone */}
          <Reveal className="grid gap-24 rounded-xl border border-accent-cyan bg-background-inverse p-24 tablet:p-40 desktop:grid-cols-[minmax(0,1fr)_minmax(0,26.25rem)] desktop:items-center desktop:gap-56 desktop:px-48 desktop:py-64">
            <div className="flex flex-col items-start gap-16">
              <span className="rounded-full bg-accent-cyan px-12 py-4 text-secondary-dark text-label-s">
                {flow.panel.label}
              </span>
              <h3 className="text-text-inverse text-h3">{flow.panel.title}</h3>
              <p className="text-text-inverse-muted text-body-m">
                <T {...flow.panel} />
              </p>
            </div>
            <ul className="flex flex-col gap-12">
              {[
                { ...flow.panel.accepted, ok: true },
                { ...flow.panel.refused, ok: false },
              ].map((r) => {
                const Icon = r.ok ? CircleCheck : X;
                return (
                  <li
                    key={r.title}
                    className={cn(
                      "flex items-start gap-12 rounded-md border bg-surface-default p-16",
                      r.ok ? "border-success-default" : "border-error-default",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-36 shrink-0 items-center justify-center rounded-sm",
                        r.ok
                          ? "bg-success-subtle text-success-default"
                          : "bg-error-subtle text-error-default",
                      )}
                    >
                      <Icon aria-hidden size={18} strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col gap-2">
                      <span
                        className={cn("text-label-m", r.ok ? "text-success-default" : "text-error-default")}
                      >
                        {r.title}
                      </span>
                      <span className="text-text-secondary text-body-xs">{r.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 04 — Fonctionnalités */}
      <EtudeSection
        id="fonctionnalites"
        eyebrow={feat.eyebrow}
        title={feat.title}
        description={feat.description}
        descriptionShort={feat.descriptionShort}
      >
        <div className="flex flex-col gap-24 desktop:gap-48">
          <div className="grid gap-24 desktop:grid-cols-[minmax(0,23.75rem)_minmax(0,1fr)]">
            {/* Côté employé : carte sombre */}
            <Reveal className="flex flex-col gap-16 self-start rounded-xl bg-background-inverse p-20 tablet:p-32">
              <div className="flex items-center gap-16">
                <IconTile icon={Smartphone} tone="glass" size="M" className="max-tablet:hidden" />
                <ColumnHeading {...feat.employee} dark />
              </div>
              <ul className="flex flex-col">
                {feat.employee.items.map((it, i) => {
                  const Icon = EMPLOYEE_ICONS[i];
                  return (
                    <li
                      key={it.title}
                      className="flex items-start gap-12 py-10 tablet:border-t tablet:border-inverse-line tablet:py-16"
                    >
                      <Icon
                        aria-hidden
                        size={18}
                        strokeWidth={1.75}
                        className="mt-4 shrink-0 text-accent-cyan"
                      />
                      <span className="flex flex-col gap-2">
                        <span className="font-medium text-text-inverse text-body-m">{it.title}</span>
                        <span className="text-text-inverse-muted text-body-s max-tablet:text-body-xs">
                          <T {...it} />
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            {/* Côté RH : modules du tableau de bord */}
            <div className="flex flex-col gap-24 max-tablet:gap-8 max-tablet:rounded-xl max-tablet:border max-tablet:border-border-default max-tablet:bg-surface-default max-tablet:p-20">
              <Reveal className="flex items-center gap-16">
                <IconTile icon={LayoutDashboard} tone="blue" size="L" className="max-tablet:hidden" />
                <ColumnHeading {...feat.rh} />
              </Reveal>
              <ul className="grid tablet:grid-cols-2 tablet:gap-12">
                {feat.rh.items.map((it, i) => {
                  const Icon = RH_ICONS[i];
                  return (
                    <Reveal
                      as="li"
                      key={it.title}
                      delay={(i % 2) * 60}
                      className="flex items-start gap-12 border-t border-border-default py-16 tablet:rounded-lg tablet:border tablet:bg-surface-default tablet:p-20"
                    >
                      <Icon
                        aria-hidden
                        size={18}
                        strokeWidth={1.75}
                        className="mt-4 shrink-0 text-primary-brand"
                      />
                      <span className="flex flex-col gap-2 tablet:gap-4">
                        <span className="font-medium text-text-primary text-body-m">{it.title}</span>
                        <span className="text-text-secondary text-body-s max-tablet:text-body-xs">
                          <T {...it} />
                        </span>
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Règles automatiques */}
          <Reveal className="flex flex-col gap-16 rounded-xl border border-border-default bg-background-subtle p-20 tablet:p-28 desktop:flex-row desktop:items-center desktop:gap-24">
            <div className="flex flex-col gap-4 desktop:w-260 desktop:shrink-0">
              <h3 className="text-text-primary text-h5">{feat.rules.title}</h3>
              <p className="text-text-secondary text-body-s max-tablet:hidden">{feat.rules.text}</p>
            </div>
            <ul className="grid gap-8 tablet:gap-16 desktop:flex-1 desktop:grid-cols-3">
              {feat.rules.items.map((r) => (
                <li
                  key={r.when}
                  className="flex items-start gap-8 text-text-secondary text-body-m tablet:flex-col tablet:gap-8 tablet:rounded-lg tablet:border tablet:border-border-default tablet:bg-surface-default tablet:px-16 tablet:py-20 tablet:text-body-s"
                >
                  <ArrowRight
                    aria-hidden
                    size={14}
                    strokeWidth={1.75}
                    className="mt-6 shrink-0 text-primary-brand tablet:hidden"
                  />
                  <span className="tablet:font-medium tablet:text-text-primary">
                    {r.when}
                    <span className="tablet:hidden"> → {r.then}</span>
                  </span>
                  <span className="flex items-center gap-6 max-tablet:hidden">
                    <ArrowRight
                      aria-hidden
                      size={14}
                      strokeWidth={1.75}
                      className="shrink-0 text-primary-brand"
                    />
                    {r.then}
                  </span>
                </li>
              ))}
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
                mobileFirst
              />
            ))}
          </div>
          {/* Côté employé : deux téléphones */}
          <div className="grid gap-32 tablet:rounded-2xl tablet:border tablet:border-glass-card-border tablet:bg-glass-card tablet:p-40 desktop:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] desktop:items-center desktop:gap-56">
            <Reveal className="flex flex-col gap-16 max-tablet:hidden">
              <p className="text-overline text-text-accent-on-dark">{apercu.employee.label}</p>
              <h3 className="text-text-inverse text-h3">{apercu.employee.title}</h3>
              {apercu.employee.items.map((it) => (
                <p key={it} className="text-body-l text-text-inverse-muted">
                  {it}
                </p>
              ))}
            </Reveal>
            <div className="grid gap-32 tablet:grid-cols-2 tablet:gap-24">
              {apercu.phones.map((p, i) => (
                <Reveal as="div" key={p.title} delay={i * 120} distance={24}>
                  <figure className="flex flex-col gap-16">
                    <figcaption className="flex items-start gap-12 tablet:sr-only">
                      <span
                        aria-hidden
                        className="flex h-28 min-w-36 shrink-0 items-center justify-center rounded-xs border border-inverse-line bg-glass-card font-mono! text-accent-cyan text-label-s"
                      >
                        {pad(i + 4)}
                      </span>
                      <span className="flex flex-col gap-4">
                        <span className="text-text-inverse text-h5">
                          <span className="sr-only">{pad(i + 4)}. </span>
                          {p.title}
                        </span>
                        <span className="text-text-inverse-muted text-body-s">{p.text}</span>
                      </span>
                    </figcaption>
                    <Image
                      src={PHONES[i].src}
                      width={PHONES[i].width}
                      height={PHONES[i].height}
                      alt={p.alt}
                      sizes="(min-width: 48rem) 290px, 80vw"
                      className="mx-auto h-auto w-full max-w-[18rem] tablet:max-w-[16.5rem]"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </EtudeSection>

      {/* 06 — Sécurité et anti-fraude */}
      <EtudeSection id="securite" eyebrow={secu.eyebrow} title={secu.title} description={secu.description}>
        <div className="flex flex-col gap-32 desktop:gap-48">
          <ul className="grid gap-24 tablet:grid-cols-2 tablet:gap-20 desktop:grid-cols-4 desktop:gap-24">
            {secu.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80}>
                <IconCard
                  icon={SECURITY_ICONS[i]}
                  tone="orange"
                  title={p.title}
                  text={<T {...p} />}
                  flatOnMobile
                />
              </Reveal>
            ))}
          </ul>
          <Reveal className="flex flex-col gap-20 rounded-xl border border-border-default bg-background-subtle p-20 tablet:p-32">
            <h3 className="text-text-primary text-h5">{secu.guardsTitle}</h3>
            <CheckChips items={secu.guards} />
          </Reveal>
          <InfoAlert title={<T text={secu.alertTitle} textShort={secu.alertTitleShort} />}>
            <T text={secu.alertText} textShort={secu.alertTextShort} />
          </InfoAlert>
        </div>
      </EtudeSection>

      {/* 07 — Votre espace */}
      <section
        id="espace"
        aria-labelledby="espace-title"
        className="scroll-mt-(--header-height) bg-background-inverse py-64 text-text-inverse desktop:py-120"
      >
        <div className="container grid gap-32 desktop:grid-cols-[minmax(0,36rem)_minmax(0,35rem)] desktop:items-center desktop:justify-between desktop:gap-64">
          <div className="flex flex-col gap-32 desktop:gap-40">
            <SectionHeader
              id="espace-title"
              eyebrow={espace.eyebrow}
              title={espace.title}
              description={espace.description}
              theme="dark"
              className="desktop:px-32"
            />
            <Reveal className="flex flex-col items-start gap-16 rounded-lg border border-glass-card-border bg-glass-card p-20 tablet:p-24">
              <p className="text-overline text-text-accent-on-dark">{espace.addressLabel}</p>
              <p className="rounded-full border border-inverse-line bg-secondary-dark px-12 py-6 font-medium text-text-inverse text-body-s">
                {espace.address}
              </p>
            </Reveal>
            <Note dark className="max-desktop:hidden">
              {espace.note}
            </Note>
          </div>
          <Reveal className="rounded-xl bg-surface-default p-20 text-text-primary shadow-lg tablet:p-32">
            <div className="flex items-center justify-between border-b border-border-default pb-16">
              <h3 className="text-h5">{espace.paramsTitle}</h3>
              <SlidersVertical aria-hidden size={20} strokeWidth={1.75} className="text-primary-brand" />
            </div>
            <ul>
              {espace.params.map((p, i) => {
                const Icon = PARAM_ICONS[i];
                return (
                  <li
                    key={p.title}
                    className="flex items-center gap-12 border-b border-border-default py-12 last:border-0 last:pb-0 tablet:gap-16 tablet:py-16"
                  >
                    <Icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-primary-brand" />
                    <span className="flex min-w-0 flex-1 flex-col gap-2">
                      <span className="font-medium text-body-m">{p.title}</span>
                      <span className="text-text-secondary text-body-xs tablet:text-body-s">
                        <T {...p} />
                      </span>
                    </span>
                    <span className="rounded-full bg-primary-subtle px-10 py-2 font-medium text-primary-default text-body-xs max-tablet:hidden">
                      {espace.paramTag}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Note dark className="desktop:hidden">
            <T text={espace.note} textShort={espace.noteShort} />
          </Note>
        </div>
      </section>

      {/* 08 — Technologie et hébergement */}
      <EtudeSection
        id="technologies"
        theme="subtle"
        eyebrow={tech.eyebrow}
        title={tech.title}
        description={tech.description}
        descriptionShort={tech.descriptionShort}
      >
        <div className="flex flex-col gap-32 desktop:gap-48">
          <ul className="grid gap-24 tablet:grid-cols-2 desktop:grid-cols-3">
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

      {/* 09 — Mise en place */}
      <EtudeSection id="mise-en-place" theme="subtle" eyebrow={setup.eyebrow} title={setup.title}>
        <div className="flex flex-col gap-24 desktop:gap-48">
          <ol className="grid gap-16 tablet:grid-cols-3 desktop:grid-cols-5">
            {setup.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="flex flex-col">
                <WorkflowStep
                  number={pad(i)}
                  icon={SETUP_ICONS[i]}
                  title={s.title}
                  text={<T {...s} />}
                  className="max-tablet:gap-16 max-tablet:p-20"
                />
              </Reveal>
            ))}
          </ol>
          <div className="grid gap-24 desktop:grid-cols-2 desktop:items-start">
            <Reveal className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-20 tablet:p-28">
              <h3 className="text-text-primary text-h5">
                <T text={setup.docsTitle} textShort={setup.docsTitleShort} />
              </h3>
              <ul className="flex flex-col gap-16">
                {setup.docs.map((d, i) => {
                  const Icon = DOC_ICONS[i];
                  return (
                    <li key={d.title} className="flex items-start gap-12">
                      <Icon
                        aria-hidden
                        size={18}
                        strokeWidth={1.75}
                        className="mt-2 shrink-0 text-primary-brand"
                      />
                      <span className="flex flex-col gap-2">
                        <span className="font-medium text-text-primary text-body-m max-tablet:font-medium max-tablet:text-body-s">
                          {d.title}
                        </span>
                        <span className="text-text-secondary text-body-s max-tablet:text-body-xs">
                          <T {...d} />
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <InfoAlert title={<T text={setup.alertTitle} textShort={setup.alertTitleShort} />}>
              <T text={setup.alertText} textShort={setup.alertTextShort} />
            </InfoAlert>
          </div>
        </div>
      </EtudeSection>

      {/* 10 — Ce que vous y gagnez */}
      <EtudeSection
        id="benefices"
        theme="subtle"
        eyebrow={benef.eyebrow}
        title={benef.title}
        description={benef.description}
      >
        <ul className="grid gap-40 px-24 tablet:grid-cols-2 tablet:gap-x-24 tablet:px-0 desktop:grid-cols-4">
          {benef.items.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 80}>
              <IconCard icon={BENEFIT_ICONS[i]} title={b.title} text={<T {...b} />} flat />
            </Reveal>
          ))}
        </ul>
      </EtudeSection>

      <MentionsBand
        clientLogo={{ ...SCPB_LOGO, alt: "SCPB" }}
        title={t("mentions.title")}
        text={t("mentions.text")}
        action={t("mentions.action")}
      />

      {/* 11 — Prochaine étape */}
      <CtaSection
        title={cta.title}
        description={cta.description}
        descriptionShort={cta.descriptionShort}
        primary={{ label: cta.primary, href: "/contact" }}
        secondary={{ label: cta.secondary, href: "/realisations" }}
      />
    </>
  );
}
