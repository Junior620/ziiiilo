import { ArrowRight, CircleCheck, ExternalLink, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/cn";
import { WorkflowStep, type Img } from "./kit";

/**
 * Briques propres aux études B3 : grilles d'atouts sans carte, captures de navigateur légendées,
 * palettes client, listes à icône, chaînes d'étapes (101:2082), schéma conceptuel, lignes de
 * technologies, bloc Résultat et hero « ordinateur + téléphone » des sites livrés.
 */

export type Item = { title: string; titleShort?: string; text: string; textShort?: string };
export type Capture = { alt: string; caption: string; captionShort?: string; url: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

/* ——— Atouts sans carte (Contexte, Défi, Qualité, Sécurité…) ——— */

export function PlainFeatures({
  items,
  icons,
  dark = false,
  columns = 3,
}: {
  items: Item[];
  icons: LucideIcon[];
  dark?: boolean;
  columns?: 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "grid gap-32 tablet:grid-cols-2 tablet:gap-x-32 tablet:gap-y-40",
        columns === 4 ? "desktop:grid-cols-4" : "desktop:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 60} className="flex flex-col gap-16">
          <IconTile icon={icons[i]} tone={dark ? "glass" : "blue"} size="M" />
          <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{item.title}</h3>
          <p className={cn("-mt-4 text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>
            <Short full={item.text} short={item.textShort} />
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ——— Capture de navigateur légendée ——— */

export function BrowserFrame({
  image,
  capture,
  dark = false,
  crop = false,
  sizes = "(min-width: 75rem) 680px, (min-width: 48rem) 60vw, 100vw",
  className,
}: {
  image: Omit<Img, "alt">;
  capture: Capture;
  dark?: boolean;
  /** Recadre en haut au format commun 1600 × 815 (captures de hauteurs inégales). */
  crop?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Reveal as="div" distance={24} className={className}>
      <figure className="flex flex-col gap-12">
        <div
          className={cn(
            "overflow-hidden rounded-lg border shadow-md",
            dark ? "border-primary-brand/40 bg-secondary-dark" : "border-border-default bg-surface-default",
          )}
        >
          <div
            aria-hidden
            className={cn(
              "flex items-center gap-12 px-12 py-8",
              dark ? "bg-secondary-dark" : "bg-background-subtle",
            )}
          >
            <span className="flex shrink-0 gap-6">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={cn("size-6 rounded-full", dark ? "bg-inverse-line" : "bg-border-strong")}
                />
              ))}
            </span>
            <span
              className={cn(
                "min-w-0 flex-1 truncate rounded-xs px-8 py-2 text-body-xs",
                dark ? "bg-glass-inverse text-text-inverse-muted" : "bg-surface-default text-text-muted",
              )}
            >
              {capture.url}
            </span>
          </div>
          <Image
            src={image.src}
            alt={capture.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            className={cn("h-auto w-full", crop && "aspect-[1600/815] object-cover object-top")}
          />
        </div>
        <figcaption
          className={cn("font-medium text-body-s", dark ? "text-text-inverse" : "text-text-primary")}
        >
          <Short full={capture.caption} short={capture.captionShort} />
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* ——— Palette du client (pastilles exportées : couleurs hors charte ZIIIILO) ——— */

export function Palette({
  title,
  items,
  text,
  textShort,
  swatches,
}: {
  title: string;
  items: { name: string; value: string }[];
  text: string;
  textShort?: string;
  swatches: string[];
}) {
  return (
    <div className="flex flex-col gap-20">
      <h3 className="text-text-inverse text-h5">{title}</h3>
      <ul className="grid grid-cols-5 gap-8 tablet:gap-12">
        {items.map((c, i) => (
          <li key={c.name} className="flex min-w-0 flex-col gap-8">
            {/* Pastille décorative : la couleur est décrite par le nom et la valeur. */}
            <Image
              src={swatches[i]}
              alt=""
              width={48}
              height={48}
              unoptimized
              className="h-44 w-full rounded-md border border-inverse-line tablet:h-52"
            />
            <span className="flex flex-col gap-2">
              <span className="font-medium text-text-inverse text-body-s max-tablet:text-body-xs">
                {c.name}
              </span>
              <span className="text-text-inverse-muted text-body-xs">{c.value}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-text-inverse-muted text-body-s">
        <Short full={text} short={textShort} />
      </p>
    </div>
  );
}

/* ——— Listes ——— */

/** Liste cochée (« Engagements affichés par le site », fréquences…). */
export function CheckRows({
  title,
  items,
  icons,
  dark = false,
}: {
  title?: string;
  items: Item[];
  /** Icônes propres en mobile (catalogue STE-SCPB) ; coche sinon. */
  icons?: LucideIcon[];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-16">
      {title && <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{title}</h3>}
      <ul className="flex flex-col gap-16">
        {items.map((item, i) => {
          const Icon = icons?.[i];
          return (
            <Reveal as="li" key={item.title} delay={i * 60} className="flex items-start gap-12">
              {Icon && <IconTile icon={Icon} tone="blue" size="M" className="tablet:hidden" />}
              <CircleCheck
                aria-hidden
                size={18}
                strokeWidth={1.75}
                className={cn(
                  "mt-2 shrink-0",
                  dark ? "text-accent-cyan" : "text-text-primary",
                  Icon && "max-tablet:hidden",
                )}
              />
              <span className="flex flex-col gap-4">
                <span
                  className={cn("font-medium text-body-m", dark ? "text-text-inverse" : "text-text-primary")}
                >
                  <Short full={item.title} short={item.titleShort} />
                </span>
                <span className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>
                  <Short full={item.text} short={item.textShort} />
                </span>
              </span>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

/** Liste à pastille (traçabilité, repères, expérience, marché, carte). */
export function IconRows({
  title,
  items,
  icons,
  dark = false,
}: {
  title?: string;
  items: Item[];
  icons: LucideIcon[];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-20">
      {title && <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{title}</h3>}
      <ul className="flex flex-col gap-20">
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 60} className="flex items-start gap-16">
            <IconTile icon={icons[i]} tone={dark ? "glass" : "blue"} size="M" />
            <span className="flex flex-col gap-4">
              <span
                className={cn("font-medium text-body-m", dark ? "text-text-inverse" : "text-text-primary")}
              >
                <Short full={item.title} short={item.titleShort} />
              </span>
              <span className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>
                <Short full={item.text} short={item.textShort} />
              </span>
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** Puces d'information (« Informations recueillies », « Technologies du workflow »). */
export function ChipGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-16">
      <h3 className="text-text-primary text-h5">{label}</h3>
      <ul className="flex flex-wrap gap-8">
        {items.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-border-default bg-background-muted px-12 py-6 font-medium text-text-primary text-body-s"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ——— Chaîne d'étapes (Étape/Workflow 101:2082) ——— */

/** Flèche → entre deux étapes en desktop, ↓ en mobile (liste verticale), absente en tablette. */
function Arrow({
  dark,
  mobile,
  desktopHidden,
}: {
  dark?: boolean;
  mobile?: boolean;
  desktopHidden?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "hidden shrink-0 items-center justify-center self-center desktop:flex",
        mobile && "max-tablet:flex",
        desktopHidden && "desktop:hidden",
        dark ? "text-text-inverse-muted" : "text-text-primary",
      )}
    >
      <ArrowRight size={16} strokeWidth={1.75} className="max-desktop:rotate-90" />
    </span>
  );
}

/**
 * Étapes reliées par des flèches en desktop (rangées de `perRow` dans une grille de `slots`
 * colonnes, pour aligner les rangées de 4 sur celles de 5), grille de 2 en tablette (et en mobile
 * si `mobileGrid`), liste verticale sinon. Une étape peut être « Mise en avant ».
 */
export function StepChain({
  steps,
  icons,
  highlightIndex,
  highlight,
  perRow,
  slots = perRow,
  mobileGrid = false,
  noArrows = false,
  dark = false,
}: {
  steps: Item[];
  icons: LucideIcon[];
  highlightIndex?: number;
  highlight?: string;
  perRow: number;
  slots?: number;
  mobileGrid?: boolean;
  /** Grille sans flèches (parcours SCPB Survey, 4 × 2). */
  noArrows?: boolean;
  dark?: boolean;
}) {
  return (
    <ol
      className={cn(
        "grid gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-(--chain) desktop:gap-x-12 desktop:gap-y-32",
        noArrows && "desktop:gap-x-20 desktop:gap-y-20",
        mobileGrid && "grid-cols-2",
      )}
      style={
        {
          "--chain": noArrows
            ? `repeat(${slots}, minmax(0, 1fr))`
            : `repeat(${slots - 1}, minmax(0, 1fr) auto) minmax(0, 1fr)`,
        } as CSSProperties
      }
    >
      {steps.map((step, i) => {
        const first = i % perRow === 0;
        return (
          <li key={step.title} className="contents">
            {i > 0 &&
              !noArrows &&
              (first ? (
                <Arrow dark={dark} mobile={!mobileGrid} desktopHidden />
              ) : (
                <Arrow dark={dark} mobile={!mobileGrid} />
              ))}
            <div className={cn("min-w-0", first && "desktop:col-start-1")}>
              <Reveal as="div" delay={i * 70} className="h-full">
                <WorkflowStep
                  number={pad(i)}
                  icon={icons[i]}
                  title={<Short full={step.title} short={step.titleShort} />}
                  text={<Short full={step.text} short={step.textShort} />}
                  highlight={i === highlightIndex ? highlight : undefined}
                />
              </Reveal>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ——— Schéma conceptuel (Sanity) ——— */

export function SchemaFlow({
  label,
  labelShort,
  items,
  icons,
}: {
  label: string;
  labelShort?: string;
  items: Item[];
  icons: LucideIcon[];
}) {
  return (
    <figure className="flex flex-col gap-16">
      <figcaption className="w-fit rounded-full border border-border-default bg-surface-default px-12 py-4 text-text-secondary text-body-xs">
        <Short full={label} short={labelShort} />
      </figcaption>
      <ol className="flex flex-col items-stretch gap-12 desktop:flex-row desktop:items-center desktop:gap-16">
        {items.map((item, i) => (
          <li key={item.title} className="contents">
            {i > 0 && (
              <span aria-hidden className="flex justify-center text-text-primary">
                <ArrowRight size={16} strokeWidth={1.75} className="max-desktop:rotate-90" />
              </span>
            )}
            <Reveal
              as="div"
              delay={i * 80}
              className="flex flex-1 flex-col gap-16 rounded-lg border border-border-default bg-surface-default p-20 tablet:p-24"
            >
              <IconTile icon={icons[i]} tone="blue" size="M" />
              <h3 className="text-text-primary text-h5">{item.title}</h3>
              <p className="-mt-4 text-text-secondary text-body-s">
                <Short full={item.text} short={item.textShort} />
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ——— Technologies : une ligne par brique ——— */

export function TechRows({
  rows,
  icons,
}: {
  rows: { title: string; titleShort?: string; chips: string[] }[];
  icons: LucideIcon[];
}) {
  return (
    <ul className="flex flex-col gap-8">
      {rows.map((row, i) => (
        <Reveal
          as="li"
          key={row.title}
          delay={i * 50}
          className="flex flex-col gap-12 rounded-lg border border-border-default bg-background-subtle p-16 tablet:flex-row tablet:items-center tablet:gap-24 tablet:px-24"
        >
          <span className="flex shrink-0 items-center gap-12 tablet:w-280">
            <IconTile icon={icons[i]} tone="blue" size="M" />
            <span className="font-medium text-text-primary text-body-m">
              <Short full={row.title} short={row.titleShort} />
            </span>
          </span>
          <ul className="flex flex-wrap gap-8">
            {row.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border-default bg-surface-default px-12 py-6 font-medium text-text-primary text-body-s"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}

/* ——— Résultat (périmètre livré, lien vers le site) ——— */

export function ResultBlock({
  items,
  itemsShort,
  line,
  lineShort,
  visuals,
  visualsShort,
  action,
  href,
  newTab,
}: {
  items: string[];
  itemsShort?: string[];
  line: string;
  lineShort?: string;
  visuals: string;
  visualsShort?: string;
  action: string;
  href: string;
  newTab: string;
}) {
  return (
    <div className="flex flex-col gap-40">
      <ul className="grid gap-12 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-16">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={i * 50}
            className="flex items-center gap-12 rounded-md border border-primary-brand/30 bg-glass-navy px-16 py-12 font-medium text-text-inverse text-body-s"
          >
            <CircleCheck aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-accent-cyan" />
            <Short full={item} short={itemsShort?.[i]} />
          </Reveal>
        ))}
      </ul>
      <div className="flex flex-col items-start gap-20 desktop:flex-row desktop:items-center desktop:gap-24">
        <div className="flex flex-col gap-4">
          <p className="font-medium text-text-inverse text-body-m">
            <Short full={line} short={lineShort} />
          </p>
          <p className="text-text-inverse-muted text-body-xs">
            <Short full={visuals} short={visualsShort} />
          </p>
        </div>
        <ExternalButton href={href} label={action} newTab={newTab} className="max-tablet:w-full" />
      </div>
    </div>
  );
}

/** Lien externe : nouvel onglet, `rel="noopener noreferrer"` (§9). */
export function ExternalButton({
  href,
  label,
  newTab,
  variant = "inverse",
  className,
}: {
  href: string;
  label: string;
  newTab: string;
  variant?: "inverse" | "secondary";
  className?: string;
}) {
  return (
    <Button
      externalHref={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      icon={ExternalLink}
      className={className}
    >
      {label}
      <span className="sr-only"> {newTab}</span>
    </Button>
  );
}

/* ——— Hero « ordinateur + téléphone » (sites livrés) ——— */

export function DevicesVisual({
  laptop,
  laptopAlt,
  phone,
  chipLaptop,
  chipPhone,
  chipShort,
}: {
  laptop: Omit<Img, "alt">;
  laptopAlt: string;
  phone: ReactNode;
  chipLaptop: string;
  chipPhone: string;
  /** Mobile : une seule étiquette sous les appareils. */
  chipShort?: string;
}) {
  const chip =
    "w-fit rounded-full border border-inverse-line bg-glass-navy px-12 py-4 text-text-inverse-muted text-body-xs";
  return (
    <div className="relative pr-[18%] pb-40 desktop:pb-48">
      <div className="rounded-lg border border-inverse-line bg-secondary-dark p-6 shadow-lg tablet:p-8">
        <Image
          src={laptop.src}
          alt={laptopAlt}
          width={laptop.width}
          height={laptop.height}
          priority
          sizes="(min-width: 75rem) 480px, (min-width: 48rem) 70vw, 85vw"
          className="aspect-[1600/815] h-auto w-full rounded-xs object-cover object-top"
        />
      </div>
      <div aria-hidden className="mx-auto h-10 w-[108%] -translate-x-[4%] rounded-b-lg bg-border-strong" />
      <div className="absolute right-0 bottom-0 w-[24%]">{phone}</div>
      <p className={cn(chip, "mt-16", chipShort && "max-tablet:hidden")}>{chipLaptop}</p>
      {chipShort && <p className={cn(chip, "mt-16 tablet:hidden")}>{chipShort}</p>}
      <p className={cn(chip, "absolute right-0 -bottom-40 max-tablet:hidden")}>{chipPhone}</p>
    </div>
  );
}

/** Cadre de téléphone (bord sombre arrondi) autour d'une capture ou d'un emplacement. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border-4 border-secondary-dark bg-secondary-dark shadow-lg", className)}>
      <div className="overflow-hidden rounded-lg bg-surface-default">{children}</div>
    </div>
  );
}
