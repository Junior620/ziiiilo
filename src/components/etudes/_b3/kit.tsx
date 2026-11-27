import { ArrowRight, ArrowUpRight, Check, Info, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TiltCapture } from "@/components/motion/effects";
import { Reveal, RevealLines, RevealScan } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile, type IconTone } from "@/components/ui/IconTile";
import { Breadcrumb } from "@/components/ui/Misc";
import { cn } from "@/lib/cn";

/**
 * Briques communes aux études B3 (SCPB Survey 200:23564, STE-SCPB 233:23711, Golden Beans 262:24524),
 * reprises du kit des études SCPB (phase B2) : hero sombre, section à en-tête animé, étapes de
 * workflow (101:2082), cartes, puces, alertes, bandeau de mentions.
 * Les textes viennent de content/fr.json (`etude-<slug>`), les visuels de public/media/.
 */

/** Texte complet dès 768 px, variante courte de la maquette mobile en dessous. */
export type Txt = { text: string; textShort?: string };
export const T = ({ text, textShort }: Txt) => <Short full={text} short={textShort} />;

export type Img = { src: string; width: number; height: number; alt: string };

/* ——— Hero ——— */

/**
 * Hero d'étude (103:11673 / 111:11200) : `--gradient-hero` + halo, fil d'Ariane, identité,
 * badges, H1 Display L révélé ligne par ligne puis balayé (bande 1,3 → 2,6 s), chapô, actions,
 * mention, visuel (étiquette « Maquette conceptuelle — données fictives » en desktop) ou extrait mobile.
 */
export async function EtudeHero({
  crumb,
  identity,
  badges,
  title,
  lead,
  leadShort,
  actions,
  note,
  visual,
  visualMobile,
  visualLabel,
}: {
  crumb: string;
  identity: ReactNode;
  badges: ReactNode;
  title: string;
  lead: string;
  leadShort?: string;
  actions: ReactNode;
  note?: ReactNode;
  visual: ReactNode;
  visualMobile?: ReactNode;
  visualLabel?: string;
}) {
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-(image:--gradient-hero) pt-[calc(var(--header-height)+var(--space-16))] pb-48 text-text-inverse desktop:pt-[calc(var(--header-height)+var(--space-64))] desktop:pb-112"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-160 left-[57%] size-620 rounded-full bg-[radial-gradient(circle,var(--color-primary-brand)_0%,transparent_62%)] opacity-25 max-desktop:top-[55%] max-desktop:left-[10%]" />
      </div>
      <div className="container grid items-center gap-32 desktop:grid-cols-[minmax(0,36.25rem)_minmax(0,35.75rem)] desktop:justify-between desktop:gap-48">
        <div className="flex min-w-0 flex-col items-start gap-24 max-tablet:gap-20">
          <Breadcrumb
            theme="dark"
            label={a11y("breadcrumb")}
            items={[
              { label: nav("home"), href: "/" },
              { label: nav("realisations"), href: "/realisations" },
              { label: crumb },
            ]}
          />
          <Reveal
            trigger="mount"
            delay={50}
            distance={8}
            className="flex flex-col items-start gap-24 max-tablet:gap-16"
          >
            {identity}
            <div className="flex flex-wrap gap-8">{badges}</div>
          </Reveal>
          <h1 className="max-w-[36.25rem] text-display-l text-text-inverse">
            <RevealScan text={title} preset="h2" trigger="mount" scanAt={1300} />
          </h1>
          <RevealLines
            text={lead}
            preset="hero-sub"
            trigger="mount"
            delay={900}
            className={cn(
              "text-body-xl text-text-inverse-muted max-tablet:text-body-m",
              leadShort && "max-tablet:hidden",
            )}
          />
          {leadShort && (
            <RevealLines
              text={leadShort}
              preset="hero-sub"
              trigger="mount"
              delay={900}
              className="text-text-inverse-muted text-body-m tablet:hidden"
            />
          )}
          <Reveal trigger="mount" delay={1300} className="flex w-full flex-col gap-16">
            {actions}
            {note && <p className="text-text-inverse-muted text-body-xs">{note}</p>}
          </Reveal>
        </div>
        <Reveal trigger="mount" delay={250} distance={24} className="relative min-w-0">
          {visualLabel && (
            <p className="mb-16 ml-auto w-fit rounded-full border border-inverse-line bg-glass-navy px-12 py-4 text-text-inverse-muted text-body-s max-tablet:hidden">
              {visualLabel}
            </p>
          )}
          <div className={cn(!!visualMobile && "max-tablet:hidden")}>{visual}</div>
          {visualMobile && <div className="tablet:hidden">{visualMobile}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/** Actions du hero : pleine largeur en mobile, côte à côte dès 768 px. */
export function HeroActions({
  primary,
  secondary,
}: {
  primary: { label: string; labelShort?: string; href?: string; externalHref?: string; newTab?: string };
  secondary: { label: string; href: ComponentProps<typeof Button>["href"] & string };
}) {
  const label = <Short full={primary.label} short={primary.labelShort} />;
  return (
    <div className="flex flex-col gap-12 tablet:flex-row tablet:flex-wrap">
      {primary.externalHref ? (
        <Button
          externalHref={primary.externalHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="inverse"
          icon={ArrowUpRight}
          className="w-full tablet:w-auto"
        >
          {label}
          {primary.newTab && <span className="sr-only"> {primary.newTab}</span>}
        </Button>
      ) : (
        <Button externalHref={primary.href ?? "#"} variant="inverse" className="w-full tablet:w-auto">
          {label}
        </Button>
      )}
      <Button href={secondary.href} variant="inverse-outline" icon={null} className="w-full tablet:w-auto">
        {secondary.label}
      </Button>
    </div>
  );
}

/** Image de visuel (hero, aperçus) : dimensions naturelles, coins arrondis optionnels. */
export function Visual({
  image,
  priority,
  sizes,
  className,
}: {
  image: Img;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes ?? `(min-width: 75rem) ${image.width}px, 100vw`}
      className={cn("h-auto w-full", className)}
    />
  );
}

/* ——— Sections ——— */

const THEMES = {
  light: "bg-background-default",
  subtle: "bg-background-subtle",
  dark: "bg-background-inverse text-text-inverse",
} as const;

export type SectionTheme = keyof typeof THEMES;

/**
 * Section d'étude : padding 120 / 64, en-tête animé (`En-tête de section` 6:220) puis contenu
 * à 56 / 32 px. `header={false}` pour une mise en page à deux colonnes gérée par la page.
 */
export function EtudeSection({
  id,
  theme = "light",
  eyebrow,
  title,
  titleShort,
  description,
  descriptionShort,
  align = "left",
  children,
  className,
  contentClassName,
}: {
  id: string;
  theme?: SectionTheme;
  eyebrow?: string;
  title: string;
  titleShort?: string;
  description?: string;
  descriptionShort?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-(--header-height) py-64 desktop:py-120", THEMES[theme], className)}
    >
      <div className={cn("container flex flex-col gap-32 desktop:gap-48", contentClassName)}>
        <SectionHeader
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          titleShort={titleShort}
          description={description}
          descriptionShort={descriptionShort}
          theme={theme === "dark" ? "dark" : "light"}
          align={align}
          className={cn(align === "center" && "max-tablet:mx-0 max-tablet:items-start max-tablet:text-left")}
        />
        {children}
      </div>
    </section>
  );
}

/* ——— Avant / après (105:14087, 126:14845) ——— */

export type CompareColumn = { label: string; title: string; items: (Txt & { title: string })[] };

export function Compare({ before, after }: { before: CompareColumn; after: CompareColumn }) {
  const col = (c: CompareColumn, positive: boolean) => (
    <Reveal
      delay={positive ? 150 : 0}
      className={cn(
        "flex h-full flex-col gap-24 rounded-xl border p-24 tablet:p-40",
        positive
          ? "border-accent-cyan bg-background-inverse text-text-inverse"
          : "border-border-default bg-surface-default",
      )}
    >
      <span
        className={cn(
          "w-fit rounded-full px-12 py-4 text-label-s",
          positive ? "bg-accent-cyan text-secondary-dark" : "bg-background-muted text-text-secondary",
        )}
      >
        {c.label}
      </span>
      <h3 className={cn("-mt-4 text-h4", positive ? "text-text-inverse" : "text-text-primary")}>{c.title}</h3>
      <ul className="flex flex-col gap-16 tablet:gap-20">
        {c.items.map((item) => (
          <li key={item.title} className="flex items-start gap-16">
            <span
              aria-hidden
              className={cn(
                "mt-2 flex size-28 shrink-0 items-center justify-center rounded-xs",
                positive ? "bg-glass-navy text-accent-cyan" : "bg-background-muted text-text-muted",
              )}
            >
              {positive ? <Check size={14} strokeWidth={2} /> : <X size={14} strokeWidth={2} />}
            </span>
            <span className="flex flex-col gap-4">
              <span
                className={cn(
                  "font-medium text-body-m",
                  positive ? "text-text-inverse" : "text-text-primary",
                )}
              >
                {item.title}
              </span>
              <span
                className={cn("text-body-s", positive ? "text-text-inverse-muted" : "text-text-secondary")}
              >
                <T {...item} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
  return (
    <div className="grid items-center gap-16 desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] desktop:gap-24">
      {col(before, false)}
      <span
        aria-hidden
        className="mx-auto flex size-44 items-center justify-center rounded-full bg-primary-brand text-text-inverse desktop:size-56"
      >
        <ArrowRight size={20} strokeWidth={1.75} className="max-desktop:rotate-90" />
      </span>
      {col(after, true)}
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
  /** Libellé du repère de l'état « Mise en avant » (« Étape clé · contrôle humain »). */
  highlight?: string;
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
        <span className="w-fit rounded-full bg-accent-cyan px-8 py-2 font-semibold text-secondary-dark text-body-xs">
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

/* ——— Maquette légendée (107:14318 / 112:11784) ——— */

export function MockupFigure({
  number,
  title,
  caption,
  image,
  mobile,
  dark = true,
  mobileFirst = true,
}: {
  number: string;
  title: string;
  caption: Txt;
  image: Img;
  /** Extrait recadré de la maquette mobile (sous 768 px). */
  mobile?: Img;
  dark?: boolean;
  /** Mobile : légende au-dessus de l'extrait (103:11199). */
  mobileFirst?: boolean;
}) {
  const legend = (
    <figcaption className="flex items-start gap-12 tablet:gap-16">
      <span
        aria-hidden
        className={cn(
          "flex h-28 min-w-36 shrink-0 items-center justify-center rounded-xs border font-mono! text-label-s",
          dark
            ? "border-inverse-line bg-glass-card text-accent-cyan"
            : "border-border-default bg-primary-subtle text-primary-default",
        )}
      >
        {number}
      </span>
      <span className="flex flex-col gap-4">
        <span className={cn("text-h4 max-tablet:text-h5", dark ? "text-text-inverse" : "text-text-primary")}>
          <span className="sr-only">{number}. </span>
          {title}
        </span>
        <span
          className={cn(
            "text-body-m max-tablet:text-body-s",
            dark ? "text-text-inverse-muted" : "text-text-secondary",
          )}
        >
          <T {...caption} />
        </span>
      </span>
    </figcaption>
  );
  return (
    <Reveal as="div" distance={24}>
      <figure
        className={cn("flex flex-col gap-20", mobileFirst && "max-tablet:flex-col-reverse max-tablet:gap-12")}
      >
        <TiltCapture className={cn(mobile && "max-tablet:hidden")}>
          <Visual
            image={image}
            sizes="(min-width: 75rem) 588px, (min-width: 48rem) 50vw, 100vw"
            className="rounded-lg shadow-hero-card"
          />
        </TiltCapture>
        {mobile && (
          <Visual image={mobile} sizes="100vw" className="rounded-lg shadow-hero-card tablet:hidden" />
        )}
        {legend}
      </figure>
    </Reveal>
  );
}

/* ——— Cartes ——— */

/** Carte à pastille : icône, titre, texte (principes, piliers de sécurité, bénéfices). */
export function IconCard({
  icon,
  tone = "blue",
  title,
  text,
  dark = false,
  highlight = false,
  flat = false,
  flatOnMobile = false,
  row = false,
  className,
  children,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  title: ReactNode;
  text?: ReactNode;
  dark?: boolean;
  /** Carte sombre à bordure cyan, pastille blanche (« L'humain décide », pilier 04). */
  highlight?: boolean;
  flat?: boolean;
  flatOnMobile?: boolean;
  /** Mobile : pastille à gauche du texte. */
  row?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const inverse = dark || highlight;
  return (
    <div
      className={cn(
        "flex h-full gap-16 tablet:flex-col tablet:gap-20",
        row ? "max-tablet:flex-row max-tablet:items-center" : "flex-col",
        !flat && "rounded-lg border p-20 tablet:p-32",
        !flat &&
          (highlight
            ? "border-accent-cyan bg-background-inverse"
            : dark
              ? "border-glass-card-border bg-glass-card"
              : "border-border-default bg-surface-default"),
        flatOnMobile &&
          "max-tablet:rounded-none max-tablet:border-0 max-tablet:bg-transparent max-tablet:p-0",
        className,
      )}
    >
      <IconTile
        icon={icon}
        tone={highlight ? "blue" : dark ? "glass" : tone}
        size="M"
        className={cn(highlight && "bg-surface-default", "tablet:size-56")}
      />
      <div className={cn("flex min-w-0 flex-col gap-8 tablet:gap-12", row && "max-tablet:gap-4")}>
        <h3
          className={cn(
            "text-h5",
            row && "max-tablet:font-medium max-tablet:text-body-m",
            inverse ? "text-text-inverse" : "text-text-primary",
          )}
        >
          {title}
        </h3>
        {text && (
          <p className={cn("text-body-s", inverse ? "text-text-inverse-muted" : "text-text-secondary")}>
            {text}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

/** Carte de couche technique (« COUCHE 01 », chips en JetBrains Mono, texte). */
export function LayerCard({
  icon,
  label,
  title,
  chips,
  text,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  chips: string[];
  text: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-20 rounded-lg border border-border-default bg-surface-default p-20 tablet:p-24">
      <div className="flex items-center gap-12">
        <IconTile icon={icon} tone="blue" size="M" />
        <div className="flex flex-col gap-2">
          <p className="font-mono! tracking-wide text-text-muted uppercase text-body-xs">{label}</p>
          <h3 className="text-text-primary text-h5">{title}</h3>
        </div>
      </div>
      <ul className="flex flex-wrap gap-8">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-xs border border-border-default bg-background-subtle px-10 py-4 font-mono! text-text-primary text-body-xs"
          >
            {chip}
          </li>
        ))}
      </ul>
      <p className="text-text-secondary text-body-s">{text}</p>
    </div>
  );
}

/** Pastilles cochées (garde-fous, bonnes pratiques). */
export type Chip = string | (Txt & { desktopOnly?: boolean });

export function CheckChips({ items, className }: { items: Chip[]; className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-12 max-tablet:flex-col max-tablet:items-start max-tablet:gap-8",
        className,
      )}
    >
      {items.map((item) => {
        const chip = typeof item === "string" ? { text: item } : item;
        return (
          <li
            key={chip.text}
            className={cn(
              "flex items-center gap-8 rounded-full border border-border-default bg-surface-default px-12 py-8 text-text-primary text-body-s max-tablet:py-6 max-tablet:text-body-xs",
              "desktopOnly" in chip && chip.desktopOnly && "max-tablet:hidden",
            )}
          >
            <Check aria-hidden size={14} strokeWidth={2} className="shrink-0 text-primary-brand" />
            <T {...chip} />
          </li>
        );
      })}
    </ul>
  );
}

/** Note discrète sous un bloc (« Aucun gain chiffré… »). */
export function Note({
  children,
  dark = false,
  icon = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  icon?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-8 text-body-xs",
        dark ? "text-text-inverse-muted" : "text-text-muted",
        className,
      )}
    >
      {icon && <Info aria-hidden size={14} strokeWidth={1.75} className="mt-2 shrink-0" />}
      <span>{children}</span>
    </p>
  );
}

/** Alerte Info obligatoire (conformité, données personnelles, hébergement). */
export function InfoAlert({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Reveal>
      <div
        role="note"
        className="flex items-start gap-12 rounded-md border border-primary-brand bg-primary-subtle px-16 py-16 tablet:px-24"
      >
        <Info aria-hidden size={18} strokeWidth={1.75} className="mt-2 shrink-0 text-primary-default" />
        <div className="flex flex-col gap-4">
          <p className="text-primary-default text-label-m">{title}</p>
          <p className="text-text-secondary text-body-s">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ——— Mentions de la réalisation (103:11861 / 111:11378) ——— */

export function MentionsBand({
  clientLogo,
  title,
  text,
  action,
}: {
  clientLogo: Img;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <section aria-labelledby="mentions-title" className="pt-64 desktop:pt-96">
      <div className="container">
        <Reveal className="flex flex-col gap-24 rounded-xl border border-border-default bg-background-subtle p-24 tablet:p-40 desktop:flex-row desktop:items-center desktop:gap-24">
          <div className="flex shrink-0 items-center gap-16 desktop:gap-24">
            <span className="flex h-60 items-center justify-center rounded-lg border border-border-default bg-surface-default px-10 desktop:h-96 desktop:w-176">
              <Logo width={140} className="max-desktop:w-80!" />
            </span>
            <span className="flex h-60 items-center justify-center rounded-lg border border-border-default bg-surface-default px-10 desktop:h-96 desktop:w-176">
              <Image
                src={clientLogo.src}
                alt={clientLogo.alt}
                width={clientLogo.width}
                height={clientLogo.height}
                unoptimized
                className="h-44 w-auto desktop:h-80"
              />
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-12 desktop:px-24">
            <h2 id="mentions-title" className="text-h4 text-text-primary">
              {title}
            </h2>
            <p className="text-text-secondary text-body-m max-tablet:text-body-s">{text}</p>
          </div>
          <Button href="/realisations" variant="secondary" size="M" className="shrink-0 max-tablet:w-full">
            {action}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/** Ligne horizontale de connecteurs (« → » en cercle) entre cartes desktop. */
export function StepArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-26 items-center justify-center rounded-full border border-primary-brand bg-surface-default text-primary-brand",
        className,
      )}
    >
      <ArrowRight size={12} strokeWidth={2} />
    </span>
  );
}
