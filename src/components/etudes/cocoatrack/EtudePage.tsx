import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bell,
  Boxes,
  ChartColumn,
  Check,
  CircleCheck,
  Cylinder,
  Database,
  Factory,
  FileSearch,
  FileText,
  Fingerprint,
  FlaskConical,
  History,
  KeyRound,
  LayoutDashboard,
  Leaf,
  Lock,
  Map as MapIcon,
  Package,
  Receipt,
  Route,
  Satellite,
  ShieldCheck,
  Sprout,
  TestTube,
  TriangleAlert,
  Truck,
  UserCheck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { TiltCapture } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { getRealisation } from "@/data/realisations";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { EtudeHero, EtudeSection, type Img } from "../scpb-commercial/kit";
import { ChipGroup, InfoNote, pad, type Item } from "../_b4/parts";
import { AlertWave } from "./AlertWave";

/**
 * CocoaTrack — Figma desktop 319:1014, mobile 325:1796 (§7, v2.6).
 * Présentation privée : page et cartes masquées si `site.publication.cocoatrack` vaut false
 * (registre des réalisations). Solution métier interne de STE-SCPB : aucun lien vers l'application.
 * Visuels : maquettes conceptuelles, données fictives (public/media/cocoatrack/). La palette
 * secondaire de CocoaTrack (verts, brun, orange) reste dans les maquettes ; l'interface de la page
 * la traduit en tokens (succès = végétation, teal fort = forêt, avertissement = brun, orange = alerte).
 * Onde d'alerte (§8 n°19) sur les parcelles fictives des sections Cartographie et Satellite.
 */

const SLUG = "cocoatrack";
const MEDIA = `/media/${SLUG}`;

const mk = (name: string, width = 1920, height = 1200) => ({
  src: `${MEDIA}/${name}.webp`,
  width,
  height,
});
const MOCKUPS = {
  dashboard: mk("maquette-01-tableau-de-bord"),
  planteur: mk("maquette-02-planteur-360"),
  carte: mk("maquette-03-carte-interactive"),
  satellite: mk("maquette-04-surveillance-satellite"),
  achats: mk("maquette-05-achats-recus"),
  usine: mk("maquette-06-module-usine"),
  passeport: mk("maquette-07-passeport-lot"),
  offline: mk("maquette-08a-terrain-hors-connexion", 540, 1140),
  online: mk("maquette-08b-terrain-synchronisation", 540, 1140),
};

/**
 * Recadrages de la maquette mobile (325:1796) : cadre (l × h), position et taille de la maquette
 * dans ce cadre, en px Figma — convertis en pourcentages.
 */
type Crop = { frame: [number, number]; at: [number, number]; size: number };
const CROPS = {
  planteur: { frame: [342, 300], at: [-125, -44], size: 666 },
  carte: { frame: [342, 340], at: [-260, -48], size: 640 },
  achats: { frame: [342, 320], at: [-336, -74], size: 717 },
  satellite: { frame: [342, 300], at: [-129, -52], size: 666 },
  usine: { frame: [342, 300], at: [-129, -114], size: 666 },
  passeport: { frame: [342, 300], at: [-124, -40], size: 640 },
  statuts: { frame: [342, 240], at: [-377, -108], size: 640 },
  dashboard: { frame: [342, 280], at: [-120, -48], size: 640 },
} satisfies Record<string, Crop>;

/** Parcelles fictives en alerte (orange) des maquettes 03 et 04, en % de la maquette. */
const WAVES = {
  carte: [
    [93.4, 24],
    [75.4, 66.4],
  ],
  satellite: [
    [65.2, 26.1],
    [36.8, 51.3],
  ],
} satisfies Record<string, [number, number][]>;

const BADGE_TONES: BadgeTone[] = ["dark", "neutral", "neutral"];

/** Domaines fonctionnels : pastille colorée (tokens) et icône. */
const PILLARS: { icon: LucideIcon; tile: string }[] = [
  { icon: Users, tile: "bg-success-default text-text-inverse" },
  { icon: MapIcon, tile: "bg-accent-teal-strong text-text-inverse" },
  { icon: Receipt, tile: "bg-warning-default text-text-inverse" },
  { icon: Satellite, tile: "bg-primary-brand text-text-inverse" },
  { icon: ShieldCheck, tile: "bg-accent-orange text-secondary-dark" },
  { icon: Factory, tile: "bg-accent-violet text-text-inverse" },
  { icon: LayoutDashboard, tile: "bg-accent-cyan text-secondary-dark" },
];
const LEVEL_BARS = [
  "border-l-accent-teal-strong",
  "border-l-success-default",
  "border-l-warning-default",
  "border-l-primary-brand",
];
const EUDR_ICONS: LucideIcon[] = [Sprout, MapIcon, Leaf, History, Route, FileText, FileSearch, CircleCheck];
const MODULE_ICONS: LucideIcon[] = [Truck, FlaskConical, Warehouse, Factory, Cylinder, Package];
const INDICATOR_ICONS: LucideIcon[] = [ChartColumn, Truck, MapIcon, Bell, FileText, Factory];
const SECURITY_ICONS: LucideIcon[] = [
  Fingerprint,
  UserCheck,
  Boxes,
  Database,
  Lock,
  KeyRound,
  History,
  Activity,
  ShieldCheck,
  TestTube,
];
const BRANCH_LABELS = [
  "bg-accent-cyan text-secondary-dark",
  "bg-success-subtle text-success-default",
  "bg-primary-soft text-primary-hover",
  "bg-accent-violet-soft text-accent-violet",
];

type Head = { eyebrow: string; title: string; description: string; descriptionShort?: string };
type Noted = { note: string; noteShort?: string };
type Short2 = { text: string; textShort?: string };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/* ——— Maquette légendée : image entière dès 768 px, extrait recadré de la maquette mobile ——— */

function Mockup({
  image,
  caption,
  crop,
  waves,
  dark = false,
  sizes = "(min-width: 75rem) 1200px, 100vw",
  desktop = true,
  className,
}: {
  image: Img;
  caption: string;
  crop?: Crop;
  waves?: [number, number][];
  dark?: boolean;
  sizes?: string;
  /** `false` : extrait mobile seulement (statuts du passeport lot). */
  desktop?: boolean;
  className?: string;
}) {
  const frame = cn(
    "relative overflow-hidden rounded-lg border shadow-hero-card",
    dark ? "border-inverse-line" : "border-border-default",
  );
  const marks = waves?.map((at) => <AlertWave key={at.join()} at={at} />);
  return (
    <Reveal as="div" distance={24} className={cn(!desktop && "tablet:hidden", className)}>
      <figure className="flex flex-col gap-12">
        {desktop && (
          <TiltCapture className={cn(crop && "max-tablet:hidden")}>
            <div className={frame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={sizes}
                className="h-auto w-full"
              />
              {marks}
            </div>
          </TiltCapture>
        )}
        {crop && (
          <div
            className={cn(frame, desktop && "tablet:hidden")}
            style={{ aspectRatio: `${crop.frame[0]} / ${crop.frame[1]}` }}
          >
            <div
              className="absolute"
              style={{
                left: pct(crop.at[0], crop.frame[0]),
                top: pct(crop.at[1], crop.frame[1]),
                width: pct(crop.size, crop.frame[0]),
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="200vw"
                className="h-auto w-full"
              />
              {marks}
            </div>
          </div>
        )}
        <figcaption
          className={cn("font-medium text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}
        >
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** Pastille d'icône colorée (palette CocoaTrack traduite en tokens). */
function Tile({ icon: Icon, tone, className }: { icon: LucideIcon; tone: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("flex size-44 shrink-0 items-center justify-center rounded-md", tone, className)}
    >
      <Icon size={20} strokeWidth={1.75} />
    </span>
  );
}

/** Tuile « icône + libellé » (fonctions EUDR, indicateurs, mécanismes de sécurité). */
function IconTiles({
  items,
  icons,
  columns,
  mobileChips = true,
}: {
  items: string[];
  icons: LucideIcon[];
  columns: string;
  /** Mobile : puces à la place des tuiles. */
  mobileChips?: boolean;
}) {
  return (
    <>
      <ul
        className={cn(
          "grid gap-12 tablet:grid-cols-2 desktop:gap-16",
          columns,
          mobileChips && "max-tablet:hidden",
        )}
      >
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={(i % 5) * 50}
            className="flex items-center gap-12 rounded-md border border-border-default bg-surface-default p-16"
          >
            <Tile icon={icons[i]} tone="bg-primary-subtle text-primary-default" className="size-36" />
            <span className="font-medium text-text-primary text-body-s">{item}</span>
          </Reveal>
        ))}
      </ul>
      {mobileChips && <ChipGroup items={items} className="tablet:hidden" />}
    </>
  );
}

/** Deux colonnes desktop, largeurs Figma en rem. */
function Columns({ children, cols, className }: { children: ReactNode; cols: string; className?: string }) {
  return (
    <div className={cn("grid gap-32 desktop:items-start desktop:gap-40", cols, className)}>{children}</div>
  );
}

export default async function EtudePage() {
  const t = await getTranslations(`etude-${SLUG}`);

  const hero = t.raw("hero") as {
    crumb: string;
    badges: Short2[];
    title: string;
    lead: string;
    leadShort: string;
    primary: string;
    secondary: string;
    note: string;
    noteShort: string;
    chip: string;
    mockupCaption: string;
    dashboardAlt: string;
    passportAlt: string;
    fieldAlt: string;
  };
  const defi = t.raw("defi") as Head &
    Noted & {
      fragmented: { title: string; text: string; textShort: string; sources: Short2[] };
      approach: { title: string; text: string; textShort: string; hub: string; domains: string[] };
      difficultiesTitle: string;
      difficulties: string[];
    };
  const sol = t.raw("solution") as Head &
    Noted & {
      pillars: { title: string; features: string[]; summary: string }[];
      thread: { title: string; text: string; chips: string[] };
    };
  const pl = t.raw("planteurs") as Head &
    Noted & { hierarchyTitle: string; levels: string[]; example: string; mockupAlt: string };
  const carto = t.raw("cartographie") as Head &
    Noted & { mockupAlt: string; formatsTitle: string; formats: string[]; features: string[] };
  const ach = t.raw("achats") as Head &
    Noted & { steps: Item[]; dataTitle: string; data: string[]; mockupAlt: string };
  const sat = t.raw("satellite") as Head &
    Noted & {
      mockupAlt: string;
      indices: { name: string; text: string }[];
      analyzeTitle: string;
      analyze: string[];
      analyzeShort: string;
      reference: { title: string; text: string; textShort: string };
    };
  const eudr = t.raw("eudr") as Head & {
    functions: string[];
    caution: { title: string; text: string; textShort: string };
  };
  const usine = t.raw("usine") as Head &
    Noted & {
      agriLabel: string;
      indusLabel: string;
      chain: string[];
      chainShort: string[];
      chainNote: string;
      modules: Item[];
      mockupAlt: string;
    };
  const pass = t.raw("passeport") as Head & {
    mockupAlt: string;
    statusAlt: string;
    chips: string[];
    note: string;
  };
  const ter = t.raw("terrain") as Head & {
    functions: string[];
    functionsShort: string[];
    offline: string;
    offlineShort: string;
    online: string;
    onlineShort: string;
    offlineAlt: string;
    onlineAlt: string;
    note: string;
  };
  const pil = t.raw("pilotage") as Head & Noted & { indicators: string[]; mockupAlt: string };
  const arch = t.raw("architecture") as Head & {
    branches: { label: string; blocks: Item[]; summary: string }[];
    branchNote: string;
    techs: string[];
  };
  const sec = t.raw("securite") as Head &
    Noted & {
      mechanisms: string[];
      rolesTitle: string;
      roles: Item[];
      rolesNote: string;
    };
  const assoc = t.raw("associees") as Head & {
    links: { slug: string; category: string; title: string; text: string; textShort: string }[];
    linkLabel: string;
    mentions: string;
    mentionsShort: string;
  };
  const cta = t.raw("cta") as Record<string, string>;

  const head = (h: Head) => ({
    eyebrow: h.eyebrow,
    title: h.title,
    description: h.description,
    descriptionShort: h.descriptionShort,
  });
  const fictive = hero.mockupCaption;
  const links = assoc.links.flatMap((link) => {
    const r = getRealisation(link.slug);
    return r?.published ? [{ ...link, route: r.route }] : [];
  });
  const agriCount = 3;

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero (319:1015 / 325:1797) */}
      <EtudeHero
        crumb={hero.crumb}
        identity={null}
        badges={hero.badges.map((b, i) => (
          <StatusBadge key={b.text} tone={BADGE_TONES[i]}>
            <Short full={b.text} short={b.textShort} />
          </StatusBadge>
        ))}
        title={hero.title}
        lead={hero.lead}
        leadShort={hero.leadShort}
        actions={
          <div className="flex flex-col gap-12 tablet:flex-row tablet:flex-wrap">
            <Button
              externalHref="#solution"
              variant="inverse"
              icon={ArrowDown}
              className="w-full tablet:w-auto"
            >
              {hero.primary}
            </Button>
            <Button href="/contact" variant="inverse-outline" icon={null} className="w-full tablet:w-auto">
              {hero.secondary}
            </Button>
          </div>
        }
        note={<Short full={hero.note} short={hero.noteShort} />}
        visual={
          <div className="relative aspect-[572/560]">
            {(
              [
                [MOCKUPS.dashboard, hero.dashboardAlt, [0, 40, 560], "rounded-lg"],
                [MOCKUPS.passeport, hero.passportAlt, [196, 300, 340], "rounded-md"],
                [MOCKUPS.offline, hero.fieldAlt, [430, 150, 142], "rounded-lg"],
              ] as const
            ).map(([image, alt, [x, y, w], radius]) => (
              <div
                key={image.src}
                className={cn("absolute overflow-hidden border border-inverse-line shadow-hero-card", radius)}
                style={{ left: pct(x, 572), top: pct(y, 560), width: pct(w, 572) }}
              >
                <Image
                  src={image.src}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  priority
                  sizes={`(min-width: 75rem) ${w}px, ${Math.round((w / 572) * 100)}vw`}
                  className="h-auto w-full"
                />
              </div>
            ))}
            <p
              className="absolute left-0 w-fit rounded-full border border-inverse-line bg-glass-inverse px-10 py-4 text-text-inverse-muted text-body-xs"
              style={{ top: pct(520, 560) }}
            >
              {hero.chip}
            </p>
          </div>
        }
      />

      {/* 02 — Le défi (319:1049) */}
      <EtudeSection id="defi" {...head(defi)}>
        <div className="grid gap-16 desktop:grid-cols-2 desktop:gap-24">
          <Reveal
            as="div"
            className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-24 tablet:p-32"
          >
            <h3 className="text-h4 text-text-primary max-tablet:text-h5">{defi.fragmented.title}</h3>
            <p className="-mt-4 text-text-secondary text-body-m max-tablet:text-body-s">
              <Short full={defi.fragmented.text} short={defi.fragmented.textShort} />
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-10 rounded-lg border border-dashed border-border-strong bg-background-subtle p-16 tablet:gap-14 tablet:p-24">
              {defi.fragmented.sources.map((s, i) => (
                <li
                  key={s.text}
                  className={cn(
                    "rounded-full border border-dashed border-border-input bg-surface-default px-12 py-6 text-text-secondary text-label-s tablet:text-label-m",
                    i % 3 === 1 && "tablet:translate-y-10",
                    i % 3 === 2 && "tablet:-translate-y-6",
                  )}
                >
                  <Short full={s.text} short={s.textShort} />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            as="div"
            delay={150}
            className="flex flex-col gap-16 rounded-xl border border-inverse-line bg-background-inverse p-24 text-text-inverse tablet:p-32"
          >
            <h3 className="text-h4 text-text-inverse max-tablet:text-h5">{defi.approach.title}</h3>
            <p className="-mt-4 text-text-inverse-muted text-body-m max-tablet:text-body-s">
              <Short full={defi.approach.text} short={defi.approach.textShort} />
            </p>
            <div className="relative mt-8 grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-16 tablet:gap-x-16">
              <svg aria-hidden className="absolute inset-0 size-full text-accent-cyan opacity-40">
                {[16.7, 50, 83.3].flatMap((x) =>
                  [16.7, 83.3].map((y) => (
                    <line
                      key={`${x}-${y}`}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  )),
                )}
              </svg>
              {defi.approach.domains.map((d, i) => (
                <span
                  key={d}
                  className={cn(
                    "relative flex items-center justify-center rounded-full border border-inverse-line bg-background-inverse-raised px-8 py-8 text-center text-text-inverse text-label-s tablet:text-label-m",
                    i >= 3 && "row-start-3",
                  )}
                >
                  {d}
                </span>
              ))}
              <span className="relative col-start-2 row-start-2 flex items-center justify-center rounded-full bg-accent-cyan px-8 py-10 font-semibold text-secondary-dark text-label-m">
                {defi.approach.hub}
              </span>
            </div>
          </Reveal>
        </div>
        <div className="flex flex-col gap-16 tablet:gap-20">
          <h3 className="text-text-primary text-h5">{defi.difficultiesTitle}</h3>
          <ul className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-16">
            {defi.difficulties.map((d, i) => (
              <Reveal
                as="li"
                key={d}
                delay={i * 50}
                className="flex items-center gap-12 rounded-md border border-border-default bg-background-subtle px-16 py-14 font-medium text-text-primary text-body-s tablet:px-20 tablet:py-16"
              >
                <span aria-hidden className="size-8 shrink-0 rounded-full bg-accent-orange" />
                {d}
              </Reveal>
            ))}
          </ul>
        </div>
        <InfoNote text={defi.note} textShort={defi.noteShort} />
      </EtudeSection>

      {/* 03 — La solution (319:1119) */}
      <EtudeSection id="solution" theme="dark" {...head(sol)}>
        <ul className="grid gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-4 desktop:gap-24">
          {sol.pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 4) * 70}
              className="flex flex-col gap-12 rounded-lg border border-glass-card-border bg-glass-card p-20 tablet:gap-16 tablet:p-24"
            >
              <span className="flex items-center justify-between gap-12 max-tablet:hidden">
                <Tile icon={PILLARS[i].icon} tone={PILLARS[i].tile} />
                <span aria-hidden className="font-mono! text-text-inverse-muted text-label-s">
                  {pad(i)}
                </span>
              </span>
              <h3 className="text-text-inverse text-h5">
                <span className="tablet:hidden">{pad(i)} · </span>
                {p.title}
              </h3>
              <ul className="flex flex-col gap-8 max-tablet:hidden">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-8 text-text-inverse-muted text-body-s">
                    <Check aria-hidden size={14} strokeWidth={2} className="mt-4 shrink-0 text-accent-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="-mt-4 text-text-inverse-muted text-body-s tablet:hidden">{p.summary}</p>
            </Reveal>
          ))}
          <Reveal
            as="li"
            delay={210}
            className="flex flex-col gap-16 rounded-lg bg-accent-teal-strong p-24 text-text-inverse max-tablet:hidden"
          >
            <Tile icon={Route} tone="bg-glass-inverse text-text-inverse" />
            <h3 className="text-text-inverse text-h5">{sol.thread.title}</h3>
            <p className="-mt-4 text-text-inverse text-body-s">{sol.thread.text}</p>
            <ul className="mt-auto flex flex-wrap gap-8">
              {sol.thread.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-surface-default px-10 py-4 font-medium text-text-primary text-label-s"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </ul>
        <InfoNote text={sol.note} textShort={sol.noteShort} dark />
      </EtudeSection>

      {/* 04 — Planteurs et coopératives (319:1219) */}
      <EtudeSection id="planteurs" theme="subtle" {...head(pl)}>
        <Columns cols="desktop:grid-cols-[minmax(0,21.25rem)_minmax(0,51.25rem)]">
          <div className="flex flex-col gap-16 tablet:gap-20">
            <h3 className="text-text-primary text-h5">{pl.hierarchyTitle}</h3>
            <ol className="flex flex-col gap-10 max-tablet:hidden">
              {pl.levels.map((level, i) => (
                <li key={level} style={{ marginLeft: `calc(var(--size-22) * ${i})` } as CSSProperties}>
                  <Reveal
                    as="div"
                    delay={i * 80}
                    className={cn(
                      "flex items-center gap-12 rounded-md border border-l-4 border-border-default bg-surface-default px-16 py-14 font-medium text-text-primary text-body-m",
                      LEVEL_BARS[i],
                    )}
                  >
                    <span aria-hidden className="font-mono! text-text-muted text-label-s">
                      {pad(i)}
                    </span>
                    {level}
                  </Reveal>
                </li>
              ))}
            </ol>
            <ChipGroup items={pl.levels} className="tablet:hidden" />
            <p className="text-text-muted text-body-xs">{pl.example}</p>
          </div>
          <Mockup
            image={{ ...MOCKUPS.planteur, alt: pl.mockupAlt }}
            caption={fictive}
            crop={CROPS.planteur}
            sizes="(min-width: 75rem) 820px, 100vw"
          />
        </Columns>
        <InfoNote text={pl.note} textShort={pl.noteShort} />
      </EtudeSection>

      {/* 05 — Cartographie (319:1271) — onde d'alerte */}
      <EtudeSection id="cartographie" {...head(carto)}>
        <Mockup
          image={{ ...MOCKUPS.carte, alt: carto.mockupAlt }}
          caption={fictive}
          crop={CROPS.carte}
          waves={WAVES.carte}
        />
        <div className="flex flex-col gap-24 desktop:flex-row desktop:items-end desktop:justify-between">
          <ChipGroup label={carto.formatsTitle} items={carto.formats} />
          <ul className="flex flex-wrap gap-8">
            {carto.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-8 rounded-full bg-success-subtle px-12 py-6 font-medium text-success-default text-label-m"
              >
                <Check aria-hidden size={14} strokeWidth={2} className="shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <InfoNote text={carto.note} textShort={carto.noteShort} />
      </EtudeSection>

      {/* 06 — Achats et documents (319:1310) */}
      <EtudeSection id="achats" theme="subtle" {...head(ach)}>
        <Columns cols="desktop:grid-cols-[minmax(0,21.5rem)_minmax(0,51rem)]">
          <div className="flex flex-col gap-24">
            <ol className="flex flex-col gap-16 tablet:gap-20">
              {ach.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 80} className="flex items-start gap-14">
                  <span
                    aria-hidden
                    className="flex size-36 shrink-0 items-center justify-center rounded-full bg-primary-subtle font-mono! text-primary-default text-label-s"
                  >
                    {pad(i)}
                  </span>
                  <span className="flex min-w-0 flex-col gap-4">
                    <h3 className="text-text-primary text-h5">
                      <span className="sr-only">{pad(i)}. </span>
                      {s.title}
                    </h3>
                    <span className="text-text-secondary text-body-s">
                      <Short full={s.text} short={s.textShort} />
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
            <ChipGroup label={ach.dataTitle} items={ach.data} className="max-tablet:hidden" />
          </div>
          <Mockup
            image={{ ...MOCKUPS.achats, alt: ach.mockupAlt }}
            caption={fictive}
            crop={CROPS.achats}
            sizes="(min-width: 75rem) 816px, 100vw"
          />
        </Columns>
        <InfoNote text={ach.note} textShort={ach.noteShort} />
      </EtudeSection>

      {/* 07 — Intelligence satellite (319:1356) — onde d'alerte */}
      <EtudeSection id="satellite" theme="dark" {...head(sat)}>
        <Columns cols="desktop:grid-cols-[minmax(0,42.5rem)_minmax(0,29.5rem)]">
          <Mockup
            image={{ ...MOCKUPS.satellite, alt: sat.mockupAlt }}
            caption={fictive}
            crop={CROPS.satellite}
            waves={WAVES.satellite}
            dark
            sizes="(min-width: 75rem) 680px, 100vw"
          />
          <div className="flex flex-col gap-16">
            <ul className="grid grid-cols-2 gap-10 max-tablet:hidden tablet:gap-12">
              {sat.indices.map((x, i) => (
                <Reveal
                  as="li"
                  key={x.name}
                  delay={i * 50}
                  className="flex flex-col gap-4 rounded-md border border-border-inverse bg-background-inverse-raised p-16"
                >
                  <span className="font-mono! font-semibold text-accent-cyan text-label-m">{x.name}</span>
                  <span className="text-text-inverse-muted text-body-s">{x.text}</span>
                </Reveal>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-8 tablet:hidden">
              {sat.indices.map((x) => (
                <li
                  key={x.name}
                  className="rounded-full border border-inverse-line bg-glass-inverse px-12 py-6 font-mono! text-accent-cyan text-label-s"
                >
                  {x.name}
                </li>
              ))}
            </ul>
          </div>
        </Columns>
        <div className="grid gap-16 desktop:grid-cols-2 desktop:gap-24">
          <Reveal
            as="div"
            className="flex flex-col gap-16 rounded-lg border border-glass-card-border bg-glass-card p-24"
          >
            <h3 className="text-text-inverse text-h5">{sat.analyzeTitle}</h3>
            <ul className="flex flex-col gap-10 max-tablet:hidden">
              {sat.analyze.map((a) => (
                <li key={a} className="flex items-start gap-10 text-text-inverse-muted text-body-s">
                  <CircleCheck
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 text-accent-cyan"
                  />
                  {a}
                </li>
              ))}
            </ul>
            <p className="-mt-4 text-text-inverse-muted text-body-s tablet:hidden">{sat.analyzeShort}</p>
          </Reveal>
          <Reveal
            as="div"
            delay={120}
            className="flex flex-col gap-12 rounded-lg bg-accent-teal-strong p-24 text-text-inverse"
          >
            <Tile icon={Satellite} tone="bg-glass-inverse text-text-inverse" />
            <h3 className="text-text-inverse text-h5">{sat.reference.title}</h3>
            <p className="text-text-inverse text-body-s">
              <Short full={sat.reference.text} short={sat.reference.textShort} />
            </p>
          </Reveal>
        </div>
        <InfoNote text={sat.note} textShort={sat.noteShort} dark />
      </EtudeSection>

      {/* 08 — Traçabilité EUDR (319:1424) */}
      <EtudeSection id="eudr" {...head(eudr)}>
        <IconTiles items={eudr.functions} icons={EUDR_ICONS} columns="desktop:grid-cols-4" />
        <div role="note">
          <Reveal
            as="div"
            className="flex items-start gap-14 rounded-md border border-l-4 border-warning-subtle border-l-accent-orange bg-warning-subtle p-20 tablet:p-24"
          >
            <TriangleAlert
              aria-hidden
              size={20}
              strokeWidth={1.75}
              className="mt-2 shrink-0 text-warning-default"
            />
            <span className="flex flex-col gap-6">
              <span className="font-semibold text-warning-default text-label-l">{eudr.caution.title}</span>
              <span className="text-text-primary text-body-s">
                <Short full={eudr.caution.text} short={eudr.caution.textShort} />
              </span>
            </span>
          </Reveal>
        </div>
      </EtudeSection>

      {/* 09 — Module usine (319:1466) */}
      <EtudeSection id="usine" theme="subtle" {...head(usine)}>
        <figure className="flex flex-col gap-16">
          <div className="grid gap-16 max-tablet:hidden desktop:grid-cols-[minmax(0,3fr)_auto_minmax(0,5fr)] desktop:items-end">
            {[
              {
                label: usine.agriLabel,
                items: usine.chain.slice(0, agriCount),
                tone: "bg-success-subtle text-success-default",
              },
              null,
              {
                label: usine.indusLabel,
                items: usine.chain.slice(agriCount),
                tone: "bg-accent-violet-soft text-accent-violet",
              },
            ].map((group, g) =>
              group ? (
                <div key={group.label} className="flex flex-col gap-12">
                  <p className={cn("w-fit rounded-full px-12 py-4 font-semibold text-label-s", group.tone)}>
                    {group.label}
                  </p>
                  <ol className="flex flex-wrap items-center gap-8">
                    {group.items.map((step, i) => (
                      <li key={step} className="flex items-center gap-8">
                        {i > 0 && (
                          <ArrowRight aria-hidden size={16} strokeWidth={1.75} className="text-text-muted" />
                        )}
                        <span className="rounded-md border border-border-default bg-surface-default px-12 py-8 font-medium text-text-primary text-label-m">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <span key={g} aria-hidden className="hidden pb-10 text-text-primary desktop:block">
                  <ArrowRight size={18} strokeWidth={1.75} />
                </span>
              ),
            )}
          </div>
          <ol className="flex flex-col gap-8 tablet:hidden">
            {usine.chainShort.map((step, i) => (
              <li
                key={step}
                className={cn(
                  "flex items-center gap-12 rounded-md border bg-surface-default px-14 py-10 font-medium text-text-primary text-body-s",
                  i === agriCount - 1 || i === agriCount ? "border-primary-brand" : "border-border-default",
                )}
              >
                <span aria-hidden className="font-mono! text-text-muted text-label-s">
                  {pad(i)}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <figcaption className="text-text-secondary text-body-s max-tablet:hidden">
            {usine.chainNote}
          </figcaption>
        </figure>
        <ul className="grid gap-12 max-tablet:hidden tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-16">
          {usine.modules.map((m, i) => (
            <Reveal
              as="li"
              key={m.title}
              delay={(i % 3) * 60}
              className="flex items-start gap-14 rounded-md border border-l-4 border-border-default border-l-accent-violet bg-surface-default p-20"
            >
              <Tile
                icon={MODULE_ICONS[i]}
                tone="bg-accent-violet-soft text-accent-violet"
                className="size-36"
              />
              <span className="flex min-w-0 flex-col gap-4">
                <h3 className="text-text-primary text-h5">{m.title}</h3>
                <span className="text-text-secondary text-body-s">{m.text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
        <ChipGroup items={usine.modules.map((m) => m.title)} className="tablet:hidden" />
        <Mockup image={{ ...MOCKUPS.usine, alt: usine.mockupAlt }} caption={fictive} crop={CROPS.usine} />
        <InfoNote text={usine.note} textShort={usine.noteShort} />
      </EtudeSection>

      {/* 10 — Passeport lot (319:1528) */}
      <EtudeSection id="passeport-lot" {...head(pass)}>
        <Mockup
          image={{ ...MOCKUPS.passeport, alt: pass.mockupAlt }}
          caption={fictive}
          crop={CROPS.passeport}
        />
        <Mockup
          image={{ ...MOCKUPS.passeport, alt: pass.statusAlt }}
          caption={fictive}
          crop={CROPS.statuts}
          desktop={false}
        />
        <ul className="flex flex-wrap gap-8 tablet:gap-12">
          {pass.chips.map((c) => (
            <li
              key={c}
              className="flex items-center gap-8 rounded-full border border-border-default bg-surface-default px-12 py-8 text-text-primary text-body-s max-tablet:py-6 max-tablet:text-body-xs"
            >
              <Check aria-hidden size={14} strokeWidth={2} className="shrink-0 text-primary-brand" />
              {c}
            </li>
          ))}
        </ul>
        <InfoNote text={pass.note} />
      </EtudeSection>

      {/* 11 — Application terrain (319:1561) */}
      <EtudeSection id="terrain" theme="dark" {...head(ter)}>
        <Columns cols="desktop:grid-cols-[minmax(0,29.5rem)_minmax(0,42.5rem)] desktop:items-center">
          <ul className="flex flex-col gap-12 tablet:gap-16">
            {ter.functions.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={i * 60}
                className={cn(
                  "flex items-center gap-12 rounded-md border border-border-inverse bg-background-inverse-raised px-16 py-14 font-medium text-text-inverse text-body-m",
                  "max-tablet:hidden",
                )}
              >
                <CircleCheck aria-hidden size={20} strokeWidth={1.75} className="shrink-0 text-accent-cyan" />
                {f}
              </Reveal>
            ))}
            {ter.functionsShort.map((f) => (
              <li
                key={`m-${f}`}
                className="flex items-center gap-12 rounded-md border border-border-inverse bg-background-inverse-raised px-14 py-12 font-medium text-text-inverse text-body-s tablet:hidden"
              >
                <CircleCheck aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-accent-cyan" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mx-auto flex w-full max-w-[30rem] items-start justify-center gap-16 tablet:gap-32">
            {(
              [
                [
                  MOCKUPS.offline,
                  ter.offlineAlt,
                  ter.offline,
                  ter.offlineShort,
                  "bg-accent-orange-soft text-secondary-dark",
                ],
                [
                  MOCKUPS.online,
                  ter.onlineAlt,
                  ter.online,
                  ter.onlineShort,
                  "bg-success-subtle text-success-default",
                ],
              ] as const
            ).map(([image, alt, label, labelShort, tone], i) => (
              <Reveal as="div" key={image.src} delay={i * 150} className="w-1/2">
                <figure className="flex flex-col items-center gap-14">
                  <figcaption
                    className={cn(
                      "w-fit rounded-full px-12 py-4 text-center font-semibold text-label-s",
                      tone,
                    )}
                  >
                    <Short full={label} short={labelShort} />
                  </figcaption>
                  <div className="w-full rounded-xl border border-inverse-line bg-secondary-dark p-6 shadow-hero-card tablet:p-8">
                    <Image
                      src={image.src}
                      alt={alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 48rem) 220px, 45vw"
                      className="h-auto w-full rounded-lg"
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </Columns>
        <InfoNote text={ter.note} dark />
      </EtudeSection>

      {/* 12 — Pilotage et analytique (319:1603) */}
      <EtudeSection id="pilotage" {...head(pil)}>
        <IconTiles
          items={pil.indicators}
          icons={INDICATOR_ICONS}
          columns="desktop:grid-cols-6 desktop:[&>li]:flex-col desktop:[&>li]:items-start"
        />
        <Mockup
          image={{ ...MOCKUPS.dashboard, alt: pil.mockupAlt }}
          caption={fictive}
          crop={CROPS.dashboard}
        />
        <InfoNote text={pil.note} textShort={pil.noteShort} />
      </EtudeSection>

      {/* 13 — Architecture (319:1641) */}
      <EtudeSection id="architecture" theme="dark" {...head(arch)}>
        <ul className="flex flex-col gap-24 max-tablet:hidden">
          {arch.branches.map((b, i) => (
            <Reveal as="li" key={b.label} delay={i * 80} className="flex flex-col gap-12">
              <p className={cn("w-fit rounded-full px-12 py-4 font-semibold text-label-s", BRANCH_LABELS[i])}>
                {b.label}
              </p>
              <ol className="grid gap-12 desktop:auto-cols-fr desktop:grid-flow-col desktop:gap-0">
                {b.blocks.map((block, j) => (
                  <li key={block.title} className="flex items-stretch">
                    {j > 0 && (
                      <span
                        aria-hidden
                        className="hidden w-32 shrink-0 items-center justify-center text-text-inverse-muted desktop:flex"
                      >
                        <ArrowRight size={16} strokeWidth={1.75} />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col gap-6 rounded-md border border-border-inverse bg-background-inverse-raised p-16">
                      <span className="font-medium text-text-inverse text-body-m">{block.title}</span>
                      <span className="text-text-inverse-muted text-body-s">{block.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </ul>
        <ul className="flex flex-col gap-12 tablet:hidden">
          {arch.branches.map((b, i) => (
            <li
              key={b.label}
              className="flex flex-col gap-10 rounded-lg border border-glass-card-border bg-glass-card p-20"
            >
              <p className={cn("w-fit rounded-full px-10 py-4 font-semibold text-label-s", BRANCH_LABELS[i])}>
                {b.label}
              </p>
              <p className="text-text-inverse-muted text-body-s">{b.summary}</p>
            </li>
          ))}
        </ul>
        <InfoNote text={arch.branchNote} dark />
        <ul className="flex flex-wrap gap-8 max-tablet:hidden">
          {arch.techs.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-glass-inverse-border bg-glass-inverse px-14 py-6 font-mono! text-text-inverse-muted text-body-s"
            >
              {tech}
            </li>
          ))}
        </ul>
      </EtudeSection>

      {/* 14 — Sécurité (319:1721) */}
      <EtudeSection id="securite" theme="subtle" {...head(sec)}>
        <IconTiles items={sec.mechanisms} icons={SECURITY_ICONS} columns="desktop:grid-cols-5" />
        <div className="flex flex-col gap-16 tablet:gap-20">
          <h3 className="text-text-primary text-h5">{sec.rolesTitle}</h3>
          <ul className="grid gap-12 max-tablet:hidden tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-16">
            {sec.roles.map((r, i) => (
              <Reveal
                as="li"
                key={r.title}
                delay={i * 60}
                className="flex flex-col gap-6 rounded-md bg-background-inverse p-20"
              >
                <span className="font-medium text-text-inverse text-body-m">{r.title}</span>
                <span className="text-text-inverse-muted text-body-s">{r.text}</span>
              </Reveal>
            ))}
          </ul>
          <ChipGroup items={sec.roles.map((r) => r.title)} className="tablet:hidden" />
          <p className="text-text-muted text-body-xs max-tablet:hidden">{sec.rolesNote}</p>
        </div>
        <InfoNote text={sec.note} textShort={sec.noteShort} />
      </EtudeSection>

      {/* Réalisations associées (319:1790) — cartes des seules réalisations publiées */}
      {links.length > 0 && (
        <EtudeSection id="associees" {...head(assoc)}>
          <ul className="grid gap-12 tablet:grid-cols-3 desktop:gap-24">
            {links.map((link, i) => (
              <Reveal as="li" key={link.slug} delay={i * 80}>
                <Link
                  href={link.route}
                  className="group flex h-full flex-col gap-8 rounded-lg border border-border-default bg-surface-default p-20 transition-[border-color,box-shadow] duration-200 hover:border-primary-brand hover:shadow-md tablet:gap-12 tablet:p-24"
                >
                  <span className="text-text-muted text-label-s max-tablet:hidden">{link.category}</span>
                  <span className="text-text-primary text-h5">{link.title}</span>
                  <span className="text-text-secondary text-body-s">
                    <Short full={link.text} short={link.textShort} />
                  </span>
                  <span className="mt-auto flex items-center gap-6 pt-8 font-medium text-text-link text-label-m max-tablet:hidden">
                    {assoc.linkLabel}
                    <ArrowRight
                      aria-hidden
                      size={16}
                      strokeWidth={1.75}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="text-text-secondary text-body-s">
            <Short full={assoc.mentions} short={assoc.mentionsShort} />
          </p>
        </EtudeSection>
      )}

      {/* 15 — Conclusion (319:1833) */}
      <CtaSection
        title={cta.title}
        description={cta.description}
        primary={{ label: cta.primary, href: "/realisations" }}
        secondary={{ label: cta.secondary, href: "/contact" }}
      />
    </>
  );
}
