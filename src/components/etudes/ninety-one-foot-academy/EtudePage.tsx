import {
  ArrowRight,
  ChartColumn,
  CircleCheck,
  Clock,
  Cloud,
  Compass,
  Cpu,
  Database,
  Eye,
  FileText,
  Globe,
  Layers,
  LayoutGrid,
  Mail,
  Map as MapIcon,
  PenTool,
  RefreshCw,
  Search,
  Send,
  Shield,
  SlidersHorizontal,
  Smartphone,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { TiltCapture } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { getRealisation } from "@/data/realisations";
import { cn } from "@/lib/cn";
import { EtudeHero, EtudeSection, type Txt } from "../scpb-commercial/kit";
import {
  BlockFlow,
  BrowserFrame,
  CheckRows,
  ChipGroup,
  DarkCards,
  DarkMentions,
  Device,
  DevicesVisual,
  ExternalButton,
  Figure,
  IconRows,
  InfoNote,
  PlainFeatures,
  StatusGrid,
  StepChain,
  TechRows,
  type Capture,
  type ChipItem,
  type Item,
  type TechRow,
} from "../_b4/parts";

/**
 * Ninety One Foot Academy — Figma desktop 278:25463, mobile 281:20482 (16 sections, §7 v2.3).
 * Captures réelles des pages publiques (photos de joueurs floutées dans Figma), maquettes
 * conceptuelles MatchLab à données fictives (mention intégrée à chaque écran). Aucun lien vers
 * l'espace privé ni vers MatchLab ; aucun moteur d'IA externe activé. Tablette : version mobile
 * élargie, grilles en deux colonnes (§5).
 */

const SLUG = "ninety-one-foot-academy";
const MEDIA = `/media/${SLUG}`;

const CAPTURE = { width: 1520, height: 782 };
const img = (name: string, width: number, height: number) => ({
  src: `${MEDIA}/${name}.webp`,
  width,
  height,
});
const SHOTS = {
  accueil: img("capture-01-accueil", CAPTURE.width, CAPTURE.height),
  equipes: img("capture-02-equipes", CAPTURE.width, CAPTURE.height),
  candidature: img("capture-03-candidature", CAPTURE.width, CAPTURE.height),
  actualites: img("capture-04-actualites", CAPTURE.width, CAPTURE.height),
  programme: img("capture-05-programme", CAPTURE.width, CAPTURE.height),
  espacePrive: img("maquette-espace-prive", 1920, 960),
  dashboard: img("maquette-tableau-de-bord", 1920, 1200),
  fiche: img("maquette-fiche-joueur", 1920, 1200),
  terrain: img("maquette-terrain", 1920, 1140),
  live: img("maquette-match-direct", 540, 1140),
  squad: img("maquette-effectif", 540, 1140),
  pdf: img("maquette-rapport-pdf", 893, 1263),
};

const CONTEXT_ICONS: LucideIcon[] = [Globe, Shield, Target, FileText];
const PILLAR_ICONS: LucideIcon[] = [Users, Database, Globe];
const LINK_ICONS: LucideIcon[] = [PenTool, Layers, Mail];
const APPLY_ICONS: LucideIcon[] = [Globe, FileText, Layers, FileText, CircleCheck];
const ADMIN_ICONS: LucideIcon[] = [Zap, Search, Shield, CircleCheck];
const MATCHLAB_ICONS: LucideIcon[] = [Eye, PenTool, LayoutGrid];
const ANALYSIS_ICONS: LucideIcon[] = [Users, SlidersHorizontal, ChartColumn, Eye, Shield, Clock];
const LIVE_ICONS: LucideIcon[] = [Zap, Clock, FileText, RefreshCw];
const TACTIC_ICONS: LucideIcon[] = [MapIcon, LayoutGrid, ArrowRight, Compass, Users];
const REPORT_ICONS: LucideIcon[] = [FileText, ChartColumn, Users, FileText, Layers, Shield, Send, Eye];
const SECURITY_ICONS: LucideIcon[] = [Globe, Shield, Target, FileText];
const LAYER_ICONS: LucideIcon[] = [LayoutGrid, Smartphone, Database, Cloud, Mail, Layers, Cpu];

const BADGE_TONES: { tone: BadgeTone; pulse?: boolean }[] = [
  { tone: "dark" },
  { tone: "available", pulse: true },
  { tone: "neutral" },
];

type Head = { eyebrow: string; title: string; description: string; descriptionShort?: string };
type Noted = { note: string; noteShort?: string };

/** Deux colonnes desktop (680 / 472) : visuel à gauche, informations à droite. */
function Split({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-32 desktop:items-start desktop:gap-48",
        reverse
          ? "desktop:grid-cols-[minmax(0,29.625rem)_minmax(0,42.5rem)]"
          : "desktop:grid-cols-[minmax(0,42.5rem)_minmax(0,29.5rem)]",
      )}
    >
      {children}
    </div>
  );
}

export default async function EtudePage() {
  const t = await getTranslations(`etude-${SLUG}`);
  const a11y = await getTranslations("a11y");
  const siteUrl = getRealisation(SLUG)?.siteUrl ?? null;

  const hero = t.raw("hero") as Record<string, string> & { badges: Txt[] };
  const ctx = t.raw("contexte") as Head & Noted & { items: Item[] };
  const pil = t.raw("piliers") as Head & { label: string; labelShort: string; blocks: Item[]; items: Item[] };
  type Shot = Capture & { url: string };
  const pub = t.raw("sitePublic") as Head & {
    accueil: Shot;
    equipes: Shot;
    programme: Shot;
    actualites: Shot;
    points: Item[];
  };
  const app = t.raw("candidature") as Head &
    Noted & {
      steps: Item[];
      highlight: string;
      capture: Shot;
      fieldsTitle: string;
      fields: ChipItem[];
      afterTitle: string;
      after: Item[];
    };
  const adm = t.raw("administration") as Head & Noted & { mockupAlt: string; items: Item[] };
  const ml = t.raw("matchlab") as Head & Noted & { mockupAlt: string; caption: string; items: Item[] };
  const ana = t.raw("analyse") as Head & {
    items: Item[];
    mockupAlt: string;
    caption: string;
    captionShort: string;
  };
  const live = t.raw("direct") as Head &
    Noted & {
      liveAlt: string;
      squadAlt: string;
      caption: string;
      captionShort: string;
      listTitle: string;
      items: Item[];
    };
  const tac = t.raw("tactique") as Head & Noted & { mockupAlt: string; caption: string; items: Item[] };
  const wm = t.raw("webMobile") as Head & Noted & { web: string; tablet: string; phone: string };
  const rep = t.raw("rapports") as Head &
    Noted & {
      steps: Item[];
      highlight: string;
      mockupAlt: string;
      caption: string;
      captionShort: string;
      formatsTitle: string;
      formats: string[];
      contentTitle: string;
      content: Item[];
    };
  const sec = t.raw("securite") as Head & Noted & { items: Item[] };
  const arch = t.raw("architecture") as Head & Noted & { rows: TechRow[] };
  const etat = t.raw("etat") as Head &
    Noted & {
      statuses: Txt[];
      line: string;
      lineShort: string;
      visuals: string;
      visualsShort: string;
      action: string;
    };
  const cta = t.raw("cta") as Record<string, string>;

  const head = (h: Head) => ({
    eyebrow: h.eyebrow,
    title: h.title,
    description: h.description,
    descriptionShort: h.descriptionShort,
  });
  const visit = (className?: string) =>
    siteUrl && (
      <ExternalButton
        href={siteUrl}
        label={hero.primary}
        newTab={a11y("newTab")}
        variant="inverse"
        className={className}
      />
    );

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero (278:25464 / 281:20483) */}
      <EtudeHero
        crumb={hero.crumb}
        identity={null}
        badges={hero.badges.map((b, i) => (
          <StatusBadge key={b.text} tone={BADGE_TONES[i].tone} pulse={BADGE_TONES[i].pulse}>
            <Short full={b.text} short={b.textShort} />
          </StatusBadge>
        ))}
        title={hero.title}
        lead={hero.lead}
        leadShort={hero.leadShort}
        actions={
          <div className="flex flex-col gap-12 tablet:flex-row tablet:flex-wrap">
            {visit("w-full tablet:w-auto")}
            <Button
              href="/realisations"
              variant="inverse-outline"
              icon={null}
              className="w-full tablet:w-auto"
            >
              <Short full={hero.secondary} short={hero.secondaryShort} />
            </Button>
          </div>
        }
        note={<Short full={hero.note} short={hero.noteShort} />}
        visual={
          <DevicesVisual
            laptop={{ ...SHOTS.accueil, alt: hero.laptopAlt }}
            phone={{ ...SHOTS.live, alt: hero.phoneAlt }}
            chipLaptop={hero.chipLaptop}
            chipPhone={hero.chipPhone}
            chipShort={hero.chipShort}
          />
        }
      />

      {/* 02 — Le contexte (278:25498) */}
      <EtudeSection id="contexte" theme="subtle" {...head(ctx)}>
        <PlainFeatures items={ctx.items} icons={CONTEXT_ICONS} columns={4} />
        <InfoNote text={ctx.note} textShort={ctx.noteShort} />
      </EtudeSection>

      {/* 03 — Trois piliers, un écosystème (278:25727) */}
      <EtudeSection id="piliers" theme="subtle" {...head(pil)} className="desktop:pt-0">
        <BlockFlow
          label={<Short full={pil.label} short={pil.labelShort} />}
          blocks={pil.blocks}
          icons={PILLAR_ICONS}
        />
        <PlainFeatures items={pil.items} icons={LINK_ICONS} />
      </EtudeSection>

      {/* 04 — Site public (278:25578) : captures réelles */}
      <EtudeSection id="site-public" theme="subtle" {...head(pub)} className="desktop:pt-0">
        <Split>
          <BrowserFrame image={SHOTS.accueil} capture={pub.accueil} />
          <div className="flex flex-col gap-24">
            <BrowserFrame
              image={SHOTS.equipes}
              capture={pub.equipes}
              sizes="(min-width: 75rem) 472px, (min-width: 48rem) 60vw, 100vw"
              hideCaptionOnMobile
            />
            <CheckRows items={pub.points} />
          </div>
        </Split>
        <div className="grid gap-24 max-tablet:hidden tablet:grid-cols-2">
          <BrowserFrame
            image={SHOTS.programme}
            capture={pub.programme}
            sizes="(min-width: 48rem) 50vw, 100vw"
          />
          <BrowserFrame
            image={SHOTS.actualites}
            capture={pub.actualites}
            sizes="(min-width: 48rem) 50vw, 100vw"
          />
        </div>
      </EtudeSection>

      {/* 05 — Candidature numérique (278:25671) */}
      <EtudeSection id="candidature" {...head(app)}>
        <StepChain
          steps={app.steps}
          icons={APPLY_ICONS}
          highlightIndex={4}
          highlight={app.highlight}
          perRow={5}
        />
        <Split>
          <BrowserFrame image={SHOTS.candidature} capture={app.capture} />
          <div className="flex flex-col gap-16 tablet:gap-20">
            <ChipGroup label={app.fieldsTitle} items={app.fields} className="[&>h3]:max-tablet:hidden" />
            <CheckRows title={app.afterTitle} items={app.after} />
          </div>
        </Split>
        <InfoNote text={app.note} textShort={app.noteShort} />
      </EtudeSection>

      {/* 06 — Administration du club (278:25977) : maquette conceptuelle, dossiers fictifs */}
      <EtudeSection id="espace-prive" theme="subtle" {...head(adm)}>
        <Reveal as="div" distance={24}>
          <TiltCapture>
            <Image
              src={SHOTS.espacePrive.src}
              alt={adm.mockupAlt}
              width={SHOTS.espacePrive.width}
              height={SHOTS.espacePrive.height}
              sizes="(min-width: 75rem) 1200px, 100vw"
              className="h-auto w-full rounded-lg border border-border-default shadow-md"
            />
          </TiltCapture>
        </Reveal>
        <PlainFeatures items={adm.items} icons={ADMIN_ICONS} columns={4} />
        <InfoNote text={adm.note} textShort={adm.noteShort} />
      </EtudeSection>

      {/* 07 — N91 MatchLab (278:25508) */}
      <EtudeSection id="matchlab" theme="dark" {...head(ml)}>
        <Reveal as="div" distance={24}>
          <figure className="flex flex-col gap-10">
            <TiltCapture>
              <Image
                src={SHOTS.dashboard.src}
                alt={ml.mockupAlt}
                width={SHOTS.dashboard.width}
                height={SHOTS.dashboard.height}
                sizes="(min-width: 75rem) 1200px, 100vw"
                className="h-auto w-full rounded-lg border border-inverse-line shadow-hero-card"
              />
            </TiltCapture>
            <figcaption className="font-medium text-text-inverse text-body-s tablet:hidden">
              {ml.caption}
            </figcaption>
          </figure>
        </Reveal>
        <DarkCards items={ml.items} icons={MATCHLAB_ICONS} />
        <InfoNote text={ml.note} textShort={ml.noteShort} dark />
      </EtudeSection>

      {/* 08 — Analyse des performances (278:25816) */}
      <EtudeSection id="analyse" theme="dark" {...head(ana)} className="desktop:pt-0">
        <Split reverse>
          <IconRows items={ana.items} icons={ANALYSIS_ICONS} dark className="max-desktop:order-last" />
          <Figure
            image={{ ...SHOTS.fiche, alt: ana.mockupAlt }}
            caption={ana.caption}
            captionShort={ana.captionShort}
            dark
            sizes="(min-width: 75rem) 680px, 100vw"
            frameClassName="border border-inverse-line"
          />
        </Split>
      </EtudeSection>

      {/* 09 — Match en direct (278:25860) */}
      <EtudeSection id="match-en-direct" {...head(live)}>
        <Split>
          <Reveal as="div" distance={24}>
            <figure className="flex flex-col gap-10 tablet:gap-12">
              <div className="flex justify-center gap-8 tablet:gap-32">
                <Device
                  image={{ ...SHOTS.live, alt: live.liveAlt }}
                  kind="phone"
                  className="w-1/2 max-w-[12.25rem]"
                  sizes="(min-width: 48rem) 196px, 50vw"
                />
                <Device
                  image={{ ...SHOTS.squad, alt: live.squadAlt }}
                  kind="phone"
                  className="w-1/2 max-w-[12.25rem]"
                  sizes="(min-width: 48rem) 196px, 50vw"
                />
              </div>
              <figcaption className="font-medium text-text-primary text-body-s">
                <Short full={live.caption} short={live.captionShort} />
              </figcaption>
            </figure>
          </Reveal>
          <IconRows title={live.listTitle} items={live.items} icons={LIVE_ICONS} />
        </Split>
        <InfoNote text={live.note} textShort={live.noteShort} />
      </EtudeSection>

      {/* 10 — Terrain tactique (278:25617) */}
      <EtudeSection id="terrain-tactique" theme="dark" {...head(tac)}>
        <Reveal as="div" distance={24}>
          <figure className="flex flex-col gap-10">
            <TiltCapture>
              <Image
                src={SHOTS.terrain.src}
                alt={tac.mockupAlt}
                width={SHOTS.terrain.width}
                height={SHOTS.terrain.height}
                sizes="(min-width: 75rem) 1200px, 100vw"
                className="h-auto w-full rounded-lg border border-inverse-line shadow-hero-card"
              />
            </TiltCapture>
            <figcaption className="font-medium text-text-inverse text-body-s tablet:hidden">
              {tac.caption}
            </figcaption>
          </figure>
        </Reveal>
        <IconRows items={tac.items} icons={TACTIC_ICONS} dark columns={3} />
        <InfoNote text={tac.note} textShort={tac.noteShort} dark />
      </EtudeSection>

      {/* 11 — Web et mobile (278:25552) */}
      <EtudeSection id="web-et-mobile" {...head(wm)}>
        <Reveal
          as="div"
          distance={24}
          className="grid gap-10 tablet:grid-cols-2 tablet:gap-24 desktop:grid-cols-[minmax(0,31.625rem)_minmax(0,22.5rem)_minmax(0,16.625rem)] desktop:items-end desktop:gap-28"
        >
          <figure className="flex flex-col gap-12 tablet:col-span-2 desktop:col-span-1">
            <Device
              image={{ ...SHOTS.dashboard, alt: ml.mockupAlt }}
              kind="screen"
              sizes="(min-width: 75rem) 506px, 100vw"
            />
            <figcaption className="text-center text-text-muted text-body-s max-tablet:sr-only">
              {wm.web}
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-12">
            <Device
              image={{ ...SHOTS.terrain, alt: tac.mockupAlt }}
              kind="tablet"
              sizes="(min-width: 75rem) 361px, 50vw"
            />
            <figcaption className="text-center text-text-muted text-body-s max-tablet:sr-only">
              {wm.tablet}
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-12">
            <div className="mx-auto flex w-full max-w-[20.875rem] gap-8 tablet:gap-12">
              <Device
                image={{ ...SHOTS.live, alt: live.liveAlt }}
                kind="phone"
                className="w-1/2"
                sizes="(min-width: 48rem) 127px, 50vw"
              />
              <Device
                image={{ ...SHOTS.squad, alt: live.squadAlt }}
                kind="phone"
                className="w-1/2"
                sizes="(min-width: 48rem) 127px, 50vw"
              />
            </div>
            <figcaption className="text-center text-text-muted text-body-s max-tablet:sr-only">
              {wm.phone}
            </figcaption>
          </figure>
        </Reveal>
        <InfoNote text={wm.note} textShort={wm.noteShort} />
      </EtudeSection>

      {/* 12 — Rapports sportifs (278:25751) */}
      <EtudeSection id="rapports" {...head(rep)} className="desktop:pt-0">
        <div className="flex flex-col gap-10 tablet:gap-16 desktop:max-w-[57.75rem] desktop:gap-24">
          <StepChain steps={rep.steps.slice(0, 4)} icons={REPORT_ICONS.slice(0, 4)} perRow={4} mobileGrid />
          <StepChain
            steps={rep.steps.slice(4)}
            icons={REPORT_ICONS.slice(4)}
            perRow={4}
            mobileGrid
            startIndex={4}
            highlightIndex={1}
            highlight={rep.highlight}
          />
        </div>
        <Split>
          <Reveal as="div" distance={24}>
            <figure className="flex flex-col gap-10 tablet:gap-12">
              <div className="flex justify-center rounded-md bg-surface-sunken py-20 max-tablet:bg-transparent max-tablet:py-0">
                <Image
                  src={SHOTS.pdf.src}
                  alt={rep.mockupAlt}
                  width={SHOTS.pdf.width}
                  height={SHOTS.pdf.height}
                  sizes="(min-width: 48rem) 262px, 90vw"
                  className="h-auto w-full max-w-[18.625rem] shadow-md tablet:max-w-[16.375rem]"
                />
              </div>
              <figcaption className="font-medium text-text-primary text-body-s">
                <Short full={rep.caption} short={rep.captionShort} />
              </figcaption>
            </figure>
          </Reveal>
          <div className="flex flex-col gap-16 tablet:gap-20">
            <ChipGroup label={rep.formatsTitle} items={rep.formats} />
            <CheckRows title={rep.contentTitle} items={rep.content} />
          </div>
        </Split>
        <InfoNote text={rep.note} textShort={rep.noteShort} />
      </EtudeSection>

      {/* 13 — Sécurité et confidentialité (278:26905) */}
      <EtudeSection id="securite" theme="subtle" {...head(sec)}>
        <PlainFeatures items={sec.items} icons={SECURITY_ICONS} columns={4} />
        <InfoNote text={sec.note} textShort={sec.noteShort} />
      </EtudeSection>

      {/* 14 — Architecture technologique (278:25898) */}
      <EtudeSection id="architecture" {...head(arch)}>
        <TechRows rows={arch.rows} icons={LAYER_ICONS} />
        <InfoNote text={arch.note} textShort={arch.noteShort} />
      </EtudeSection>

      {/* 15 — État du projet (278:25987) */}
      <EtudeSection id="etat-du-projet" theme="dark" {...head(etat)}>
        <StatusGrid items={etat.statuses} />
        <DarkMentions
          line={etat.line}
          lineShort={etat.lineShort}
          visuals={etat.visuals}
          visualsShort={etat.visualsShort}
          action={siteUrl && visit("shrink-0 max-tablet:w-full")}
        />
        <InfoNote text={etat.note} textShort={etat.noteShort} dark />
      </EtudeSection>

      {/* 16 — Conclusion ZIIIILO (278:26028) */}
      <CtaSection
        title={cta.title}
        description={cta.description}
        descriptionShort={cta.descriptionShort}
        primary={{ label: cta.primary, href: "/realisations" }}
        secondary={{ label: cta.secondary, href: "/contact" }}
      />
    </>
  );
}
