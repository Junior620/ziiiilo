import { ArrowRight, CircleCheck, ExternalLink, Info, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { TiltCapture } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/cn";
import type { Img } from "../scpb-commercial/kit";

/**
 * Briques communes aux études clients B4 (Ninety One Foot Academy 278:25463, Agora Film Invest
 * 297:27498, CocoaTrack 319:1014). Reprend les conventions du kit B2 (`scpb-commercial/kit.tsx`)
 * et des briques B3 : atouts sans carte, captures de navigateur légendées, listes à coche ou à
 * pastille, chaînes d'étapes (Étape/Workflow 101:2082), lignes de technologies, bloc d'état du
 * projet, appareils (ordinateur, tablette, téléphone) autour des captures et des maquettes.
 * Textes : content/fr.json (`etude-<slug>`) ; médias : public/media/<slug>/.
 */

/** Élément de texte : version complète et variante courte de la maquette mobile (< 768 px). */
export type Item = { title: string; titleShort?: string; text: string; textShort?: string };
export type Capture = { alt: string; caption: string; captionShort?: string; url?: string };

export const pad = (i: number) => String(i + 1).padStart(2, "0");

/* ——— Note « i » en pied de section (Figma « Note » : Icon/info 16 + Body S) ——— */

export function InfoNote({
  text,
  textShort,
  dark = false,
  className,
}: {
  text: string;
  textShort?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      as="div"
      className={cn(
        "flex items-start gap-10 text-body-s",
        dark ? "text-text-inverse-muted" : "text-text-secondary",
        className,
      )}
    >
      <Info aria-hidden size={16} strokeWidth={1.75} className="mt-4 shrink-0" />
      <span>
        <Short full={text} short={textShort} />
      </span>
    </Reveal>
  );
}

/** Étiquette en pastille (« Schéma fonctionnel — … », « Capture réelle »). */
export function Tag({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-10 py-4 text-label-s",
        dark
          ? "border-inverse-line bg-glass-inverse text-text-inverse-muted"
          : "border-border-default bg-background-muted text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ——— Schéma fonctionnel en trois blocs reliés par des flèches (N91 « piliers », Agora « SEO ») ——— */

/** Blocs à pastille L en desktop (colonne), en ligne compacte en mobile ; flèches en desktop. */
export function BlockFlow({
  label,
  blocks,
  icons,
}: {
  label: ReactNode;
  blocks: Item[];
  icons: LucideIcon[];
}) {
  return (
    <figure className="flex flex-col gap-10 desktop:gap-20">
      <figcaption>
        <Tag>{label}</Tag>
      </figcaption>
      <ol className="flex flex-col gap-10 desktop:flex-row desktop:items-stretch desktop:gap-20">
        {blocks.map((block, i) => (
          <li key={block.title} className="contents">
            {i > 0 && (
              <span aria-hidden className="hidden shrink-0 items-center text-text-primary desktop:flex">
                <ArrowRight size={24} strokeWidth={1.75} />
              </span>
            )}
            <Reveal
              as="div"
              delay={i * 90}
              className="flex flex-1 items-center gap-14 rounded-lg border border-border-default bg-surface-default p-18 tablet:items-start desktop:flex-col desktop:gap-14 desktop:p-24"
            >
              <IconTile icon={icons[i]} tone="blue" size="M" className="desktop:size-56" />
              <span className="flex min-w-0 flex-col gap-4 desktop:gap-14">
                <span className="text-text-primary text-h5">{block.title}</span>
                <span className="text-text-secondary text-body-s">
                  <Short full={block.text} short={block.textShort} />
                </span>
              </span>
            </Reveal>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ——— Atouts sans carte (Carte/Principe, thème clair 6:311) ——— */

export function PlainFeatures({
  items,
  icons,
  columns = 3,
}: {
  items: Item[];
  icons: LucideIcon[];
  columns?: 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "grid gap-32 tablet:grid-cols-2 tablet:gap-x-32 tablet:gap-y-40 desktop:gap-24",
        columns === 4 ? "desktop:grid-cols-4" : "desktop:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 60} className="flex flex-col gap-16">
          <IconTile icon={icons[i]} tone="blue" size="M" />
          <h3 className="text-text-primary text-h5">
            <Short full={item.title} short={item.titleShort} />
          </h3>
          <p className="-mt-4 text-text-secondary text-body-s">
            <Short full={item.text} short={item.textShort} />
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

/** Cartes sur fond sombre (Carte/Principe, thème sombre) : pastille en verre, titre, texte. */
export function DarkCards({ items, icons }: { items: Item[]; icons: LucideIcon[] }) {
  return (
    <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-24">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          delay={i * 70}
          className="flex flex-col gap-16 rounded-lg border border-glass-card-border bg-glass-card p-24 tablet:p-32"
        >
          <IconTile icon={icons[i]} tone="glass" size="M" />
          <h3 className="text-text-inverse text-h5">
            <Short full={item.title} short={item.titleShort} />
          </h3>
          <p className="-mt-4 text-text-inverse-muted text-body-s">
            <Short full={item.text} short={item.textShort} />
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ——— Captures ——— */

/** Capture réelle dans une fenêtre de navigateur (barre, adresse), légendée. */
export function BrowserFrame({
  image,
  capture,
  dark = false,
  sizes = "(min-width: 75rem) 680px, (min-width: 48rem) 60vw, 100vw",
  hideCaptionOnMobile = false,
  className,
}: {
  image: Omit<Img, "alt">;
  capture: Capture;
  dark?: boolean;
  sizes?: string;
  hideCaptionOnMobile?: boolean;
  className?: string;
}) {
  return (
    <Reveal as="div" distance={24} className={className}>
      <figure className="flex flex-col gap-12">
        <TiltCapture>
          <div
            className={cn(
              "overflow-hidden rounded-md border shadow-md",
              dark ? "border-inverse-line bg-secondary-dark" : "border-border-default bg-surface-default",
            )}
          >
            <div
              aria-hidden
              className={cn(
                "flex items-center gap-6 px-10 py-6 tablet:px-12 tablet:py-8",
                dark ? "bg-secondary-dark" : "bg-background-muted",
              )}
            >
              <span className="flex shrink-0 gap-6">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className={cn(
                      "size-6 rounded-full tablet:size-8",
                      dark ? "bg-inverse-line" : "bg-border-input",
                    )}
                  />
                ))}
              </span>
              {capture.url && (
                <span
                  className={cn(
                    "ml-6 min-w-0 flex-1 truncate rounded-xs px-8 py-2 text-body-xs",
                    dark ? "bg-glass-inverse text-text-inverse-muted" : "bg-surface-default text-text-muted",
                  )}
                >
                  {capture.url}
                </span>
              )}
            </div>
            <Image
              src={image.src}
              alt={capture.alt}
              width={image.width}
              height={image.height}
              sizes={sizes}
              className="h-auto w-full"
            />
          </div>
        </TiltCapture>
        <figcaption
          className={cn(
            "font-medium text-body-s",
            dark ? "text-text-inverse" : "text-text-primary",
            hideCaptionOnMobile && "max-tablet:hidden",
          )}
        >
          <Short full={capture.caption} short={capture.captionShort} />
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** Maquette ou capture légendée, sans cadre de navigateur. */
export function Figure({
  image,
  caption,
  captionShort,
  dark = false,
  sizes,
  frameClassName,
  tilt = true,
  className,
}: {
  image: Img;
  caption: string;
  captionShort?: string;
  dark?: boolean;
  sizes?: string;
  frameClassName?: string;
  tilt?: boolean;
  className?: string;
}) {
  const img = (
    <div className={cn("overflow-hidden rounded-lg shadow-hero-card", frameClassName)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes ?? "(min-width: 75rem) 1200px, 100vw"}
        className="h-auto w-full"
      />
    </div>
  );
  return (
    <Reveal as="div" distance={24} className={className}>
      <figure className="flex flex-col gap-12">
        {tilt ? <TiltCapture>{img}</TiltCapture> : img}
        <figcaption
          className={cn("font-medium text-body-s", dark ? "text-text-inverse" : "text-text-primary")}
        >
          <Short full={caption} short={captionShort} />
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** Appareil sombre (écran, tablette, téléphone) autour d'une capture ou d'une maquette. */
export function Device({
  image,
  kind,
  sizes,
  priority,
  className,
}: {
  image: Img;
  kind: "screen" | "tablet" | "phone";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-inverse-line bg-background-inverse shadow-hero-card",
        kind === "screen" && "rounded-md p-10",
        kind === "tablet" && "rounded-xl p-14",
        kind === "phone" && "rounded-xl p-6 tablet:p-8",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes ?? "(min-width: 48rem) 33vw, 50vw"}
        className={cn("h-auto w-full", kind === "phone" ? "rounded-lg" : "rounded-xs")}
      />
    </div>
  );
}

/* ——— Listes ——— */

/** Points à coche (« Bilingue », « Fiche PDF générée »…) ; pastille d'icône en mobile si fournie. */
export function CheckRows({
  title,
  items,
  icons,
  dark = false,
  className,
}: {
  title?: string;
  items: Item[];
  icons?: LucideIcon[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-16 tablet:gap-20", className)}>
      {title && <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{title}</h3>}
      <ul className="flex flex-col gap-16 tablet:gap-12">
        {items.map((item, i) => {
          const Icon = icons?.[i];
          return (
            <Reveal as="li" key={item.title} delay={i * 60} className="flex items-start gap-12">
              {Icon && <IconTile icon={Icon} tone="blue" size="M" className="tablet:hidden" />}
              <CircleCheck
                aria-hidden
                size={20}
                strokeWidth={1.75}
                className={cn(
                  "mt-2 shrink-0",
                  dark ? "text-accent-cyan" : "text-text-primary",
                  Icon && "max-tablet:hidden",
                )}
              />
              <span className="flex min-w-0 flex-col gap-4">
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

/** Points à pastille d'icône (évaluations, bord du terrain, terrain tactique…). */
export function IconRows({
  title,
  items,
  icons,
  dark = false,
  columns = 1,
  className,
}: {
  title?: string;
  items: Item[];
  icons: LucideIcon[];
  dark?: boolean;
  /** 3 colonnes en desktop (terrain tactique). */
  columns?: 1 | 3;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-20", className)}>
      {title && <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{title}</h3>}
      <ul
        className={cn(
          "grid gap-18 tablet:gap-22",
          columns === 3 && "tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-x-24",
        )}
      >
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 60} className="flex items-start gap-10 tablet:gap-14">
            <IconTile icon={icons[i]} tone={dark ? "dark" : "blue"} size="M" />
            <span className="flex min-w-0 flex-col gap-4">
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

/** Puces d'information (« Étapes du formulaire », « Formats d'export »). */
export function ChipGroup({
  label,
  items,
  className,
}: {
  label?: string;
  items: ChipItem[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-16", className)}>
      {label && <h3 className="text-text-primary text-h5">{label}</h3>}
      <ul className="flex flex-wrap gap-8">
        {items.map((chip) => {
          const c = chipOf(chip);
          return (
            <li
              key={c.text}
              className={cn(
                "rounded-full border border-border-default bg-background-muted px-12 py-6 text-text-primary text-label-m",
                c.desktopOnly && "max-tablet:hidden",
              )}
            >
              <Short full={c.text} short={c.textShort} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ——— Étape/Workflow (101:2082) : Repos / Survol (:hover) / Mise en avant ——— */

export function WorkflowStep({
  number,
  icon: Icon,
  title,
  text,
  highlight,
  className,
}: {
  number: string;
  icon: LucideIcon;
  title: ReactNode;
  text: ReactNode;
  /** Repère de l'état « Mise en avant » (« Étape clé · traitement »). */
  highlight?: ReactNode;
  className?: string;
}) {
  const on = !!highlight;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-12 rounded-lg border p-20 transition-[border-color,box-shadow,transform] duration-200 ease-(--ease-ui)",
        on
          ? "border-accent-cyan bg-background-inverse shadow-md"
          : "border-border-default bg-surface-default hover:-translate-y-2 hover:border-primary-brand hover:shadow-md",
        className,
      )}
    >
      {highlight && (
        <span className="w-fit rounded-sm bg-accent-cyan px-8 py-2 font-semibold text-secondary-dark text-body-xs tablet:rounded-full">
          {highlight}
        </span>
      )}
      <span className="flex items-center justify-between gap-12">
        <span
          aria-hidden
          className={cn(
            "flex h-30 min-w-30 items-center justify-center rounded-xs px-6 font-mono! text-label-s",
            on ? "bg-accent-cyan text-secondary-dark" : "bg-primary-subtle text-primary-default",
          )}
        >
          {number}
        </span>
        <Icon
          aria-hidden
          size={20}
          strokeWidth={1.75}
          className={on ? "text-accent-cyan" : "text-primary-brand"}
        />
      </span>
      <h3 className={cn("text-h5", on ? "text-text-inverse" : "text-text-primary")}>
        <span className="sr-only">{number}. </span>
        {title}
      </h3>
      <p className={cn("text-body-s", on ? "text-text-inverse-muted" : "text-text-secondary")}>{text}</p>
    </div>
  );
}

function ChainArrow({ mobile, desktopHidden }: { mobile?: boolean; desktopHidden?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "hidden shrink-0 items-center justify-center self-center text-text-primary desktop:flex",
        mobile && "max-tablet:flex",
        desktopHidden && "desktop:hidden",
      )}
    >
      <ArrowRight size={18} strokeWidth={1.75} className="max-desktop:rotate-90" />
    </span>
  );
}

/**
 * Étapes reliées par des flèches en desktop (rangées de `perRow`, alignées sur `slots` colonnes),
 * grille de 2 en tablette (et en mobile si `mobileGrid`), liste verticale fléchée sinon.
 */
export function StepChain({
  steps,
  icons,
  highlightIndex,
  highlight,
  highlightShort,
  perRow,
  slots = perRow,
  mobileGrid = false,
  startIndex = 0,
}: {
  steps: Item[];
  icons: LucideIcon[];
  highlightIndex?: number;
  highlight?: string;
  highlightShort?: string;
  perRow: number;
  slots?: number;
  mobileGrid?: boolean;
  startIndex?: number;
}) {
  return (
    <ol
      className={cn(
        "grid gap-8 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-(--chain) desktop:gap-x-12 desktop:gap-y-24",
        mobileGrid && "grid-cols-2 gap-10",
      )}
      style={{ "--chain": `repeat(${slots - 1}, minmax(0, 1fr) auto) minmax(0, 1fr)` } as CSSProperties}
    >
      {steps.map((step, i) => {
        const first = i % perRow === 0;
        return (
          <li key={step.title} className="contents">
            {i > 0 && <ChainArrow mobile={!mobileGrid} desktopHidden={first} />}
            <div className={cn("min-w-0", first && "desktop:col-start-1")}>
              <Reveal as="div" delay={(i % perRow) * 70} className="h-full">
                <WorkflowStep
                  number={pad(i + startIndex)}
                  icon={icons[i]}
                  title={<Short full={step.title} short={step.titleShort} />}
                  text={<Short full={step.text} short={step.textShort} />}
                  highlight={
                    i === highlightIndex && highlight ? (
                      <Short full={highlight} short={highlightShort} />
                    ) : undefined
                  }
                />
              </Reveal>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ——— Technologies : une ligne par couche ——— */

/** Puce : texte, variante courte mobile, ou masquée en mobile (`desktopOnly`). */
export type ChipItem = string | { text: string; textShort?: string; desktopOnly?: boolean };
const chipOf = (c: ChipItem) => (typeof c === "string" ? { text: c } : c);

export type TechRow = { title: string; titleShort?: string; chips: ChipItem[] };

export function TechRows({ rows, icons }: { rows: TechRow[]; icons: LucideIcon[] }) {
  return (
    <ul className="flex flex-col gap-10 tablet:gap-12">
      {rows.map((row, i) => (
        <Reveal
          as="li"
          key={row.title}
          delay={i * 50}
          className="flex flex-col gap-12 rounded-lg border border-border-default bg-background-subtle p-16 tablet:flex-row tablet:items-center tablet:gap-24 tablet:px-24 tablet:py-18"
        >
          <span className="flex shrink-0 items-center gap-10 tablet:w-280 tablet:gap-12">
            <IconTile icon={icons[i]} tone="blue" size="M" />
            <span className="font-medium text-text-primary text-body-m">
              <Short full={row.title} short={row.titleShort} />
            </span>
          </span>
          <ul className="flex flex-wrap gap-6 tablet:gap-8">
            {row.chips.map((chip) => {
              const c = chipOf(chip);
              return (
                <li
                  key={c.text}
                  className={cn(
                    "rounded-full border border-border-default bg-surface-default px-12 py-6 text-text-primary text-label-s tablet:px-14 tablet:py-8 tablet:text-label-m",
                    c.desktopOnly && "max-tablet:hidden",
                  )}
                >
                  <Short full={c.text} short={c.textShort} />
                </li>
              );
            })}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}

/* ——— État du projet / résultat (fond sombre) ——— */

export function StatusGrid({ items }: { items: { text: string; textShort?: string }[] }) {
  return (
    <ul className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-24">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.text}
          delay={i * 50}
          className="flex items-center gap-12 rounded-md border border-border-inverse bg-background-inverse-raised px-16 py-14 font-medium text-text-inverse text-body-m tablet:px-18 tablet:py-16"
        >
          <CircleCheck aria-hidden size={20} strokeWidth={1.75} className="shrink-0 text-accent-cyan" />
          <span>
            <Short full={item.text} short={item.textShort} />
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

/** Mentions de la réalisation sur fond sombre (client, réalisation, visuels) + lien éventuel. */
export function DarkMentions({
  line,
  lineShort,
  visuals,
  visualsShort,
  action,
}: {
  line: string;
  lineShort?: string;
  visuals: string;
  visualsShort?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col items-start gap-24 desktop:flex-row desktop:items-center">
      <div className="flex flex-col gap-6">
        <p className="font-medium text-text-inverse text-body-m">
          <Short full={line} short={lineShort} />
        </p>
        <p className="text-text-inverse-muted text-body-s max-tablet:text-body-xs">
          <Short full={visuals} short={visualsShort} />
        </p>
      </div>
      {action}
    </Reveal>
  );
}

/** Lien externe : nouvel onglet, `rel="noopener noreferrer"` (§9). */
export function ExternalButton({
  href,
  label,
  labelShort,
  newTab,
  variant = "inverse",
  className,
}: {
  href: string;
  label: string;
  labelShort?: string;
  newTab: string;
  variant?: "inverse" | "secondary" | "primary";
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
      <Short full={label} short={labelShort} />
      <span className="sr-only"> {newTab}</span>
    </Button>
  );
}

/* ——— Hero « ordinateur + téléphone » ——— */

export function DevicesVisual({
  laptop,
  phone,
  chipLaptop,
  chipPhone,
  chipShort,
}: {
  laptop: Img;
  phone: Img;
  chipLaptop: string;
  chipPhone: string;
  /** Mobile : une seule étiquette sous les appareils. */
  chipShort?: string;
}) {
  const chip =
    "w-fit rounded-full border border-inverse-line bg-glass-inverse px-10 py-4 text-text-inverse-muted text-body-xs";
  return (
    <div className="relative pr-[16%] pb-88 max-tablet:pb-0">
      <div className="rounded-lg border border-inverse-line bg-background-inverse p-8 shadow-lg tablet:p-12">
        <Image
          src={laptop.src}
          alt={laptop.alt}
          width={laptop.width}
          height={laptop.height}
          priority
          sizes="(min-width: 75rem) 504px, (min-width: 48rem) 70vw, 80vw"
          className="h-auto w-full rounded-xs"
        />
      </div>
      <div aria-hidden className="mx-auto h-10 w-[106%] -translate-x-[3%] rounded-b-lg bg-border-input" />
      <div className="absolute top-[24%] right-0 flex w-[27%] flex-col items-end gap-16">
        <Device
          image={phone}
          kind="phone"
          priority
          sizes="(min-width: 75rem) 160px, 25vw"
          className="w-full"
        />
        <p className={cn(chip, "whitespace-nowrap max-tablet:hidden")}>{chipPhone}</p>
      </div>
      <p className={cn(chip, "mt-16", chipShort && "max-tablet:hidden")}>{chipLaptop}</p>
      {chipShort && <p className={cn(chip, "mt-16 tablet:hidden")}>{chipShort}</p>}
    </div>
  );
}
