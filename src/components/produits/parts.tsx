import { Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Reveal, RevealLines, TypeLine } from "@/components/motion/text";
import { Button } from "@/components/ui/Button";
import { IconTile, type IconTone } from "@/components/ui/IconTile";
import { BrandMark } from "@/components/ui/Misc";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

/**
 * Briques des pages produit (FleetRent 15:2676 / 24:2440, DocCloud 90:11552 / 92:9403) :
 * hero sombre, listes cochées, cartes de fonctionnalité à statut, bandeau « Développé par ZIIIILO ».
 */

/** Texte complet dès 768 px, version courte de la maquette mobile en dessous. */
export function Short({ full, short }: { full: string; short?: string }) {
  if (!short || short === full) return <>{full}</>;
  return (
    <>
      <span className="max-tablet:hidden">{full}</span>
      <span className="tablet:hidden">{short}</span>
    </>
  );
}

/**
 * Hero produit — fond `--gradient-hero`, fil d'Ariane clair, badges, H1 Display L révélé
 * au montage, chapô, actions, visuel à droite (desktop) ou sous le texte (mobile, tablette).
 */
export function ProductHero({
  breadcrumb,
  badges,
  title,
  lead,
  leadShort,
  actions,
  visual,
}: {
  breadcrumb: ReactNode;
  badges: ReactNode;
  title: string;
  lead: string;
  leadShort?: string;
  actions?: ReactNode;
  visual: ReactNode;
}) {
  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-(image:--gradient-hero) pt-[calc(var(--header-height)+var(--space-40))] pb-64 text-text-inverse desktop:pt-[calc(var(--header-height)+var(--space-64))] desktop:pb-112"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-20%] size-720 rounded-full bg-[radial-gradient(circle,var(--color-primary-brand)_0%,transparent_60%)] opacity-20" />
      </div>
      <div className="container grid items-center gap-40 desktop:grid-cols-[minmax(0,1fr)_minmax(0,37rem)] desktop:gap-56">
        <div className="flex flex-col items-start gap-20 desktop:gap-24">
          {breadcrumb}
          <Reveal trigger="mount" delay={100} className="flex flex-wrap gap-8">
            {badges}
          </Reveal>
          <RevealLines
            as="h1"
            text={title}
            preset="h2"
            trigger="mount"
            delay={250}
            className="max-w-[36rem] text-display-l text-text-inverse"
          />
          <RevealLines
            text={lead}
            preset="description"
            trigger="mount"
            delay={650}
            className={cn("max-w-[36rem] text-body-xl text-text-inverse-muted", leadShort && "max-tablet:hidden")}
          />
          {leadShort && (
            <RevealLines
              text={leadShort}
              preset="description"
              trigger="mount"
              delay={650}
              className="text-body-l text-text-inverse-muted tablet:hidden"
            />
          )}
          {actions && (
            <Reveal trigger="mount" delay={850} className="w-full">
              {actions}
            </Reveal>
          )}
        </div>
        <Reveal trigger="mount" delay={500} distance={24}>
          {visual}
        </Reveal>
      </div>
    </section>
  );
}

/** Surtitre + titre H2 + description, sans animation de titre (sections à deux colonnes). */
export function Eyebrowed({ eyebrow, dark = false }: { eyebrow: string; dark?: boolean }) {
  return (
    <p className="inline-flex items-center gap-10">
      <BrandMark />
      <TypeLine
        text={eyebrow}
        inViewRef
        className={cn("text-overline", dark ? "text-text-accent-on-dark" : "text-primary-default")}
      />
    </p>
  );
}

/** Liste cochée (trois briques, positionnement). */
export function CheckList({
  items,
  dark = false,
  className,
}: {
  items: readonly ReactNode[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-12", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn("flex items-start gap-12 text-body-s", dark ? "text-text-inverse" : "text-text-secondary")}
        >
          <Check
            aria-hidden
            size={16}
            strokeWidth={2}
            className={cn("mt-4 shrink-0", dark ? "text-accent-cyan" : "text-primary-default")}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Carte blanche à pastille (Carte/Principe en carte, 15:3053). */
export function IconCard({
  icon,
  tone = "blue",
  title,
  headingClassName = "text-h4",
  flatOnMobile = false,
  children,
  className,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  title: ReactNode;
  headingClassName?: string;
  /** Mobile : pastille, titre et texte sans carte (24:2741, 24:2791). */
  flatOnMobile?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-16 rounded-lg border border-border-default bg-surface-default p-24 tablet:gap-20",
        flatOnMobile && "max-tablet:rounded-none max-tablet:border-0 max-tablet:bg-transparent max-tablet:p-0",
        className,
      )}
    >
      <IconTile icon={icon} tone={tone} size="M" />
      <div className="flex flex-col gap-12">
        <h3 className={cn("text-text-primary", headingClassName)}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export type FeatureStatus = { label: string; tone: BadgeTone };

/**
 * Carte de fonctionnalité à statut, sur fond sombre (15:3133) : pastille en verre et badge en
 * tête, titre, texte. Mobile (24:2839) : une ligne pastille · titre · badge, sans texte.
 */
export function StatusFeatureCard({
  icon,
  title,
  text,
  status,
}: {
  icon: LucideIcon;
  title: ReactNode;
  text: string;
  status: FeatureStatus;
}) {
  return (
    <div className="flex h-full min-w-0 items-center gap-12 rounded-lg border border-glass-card-border bg-glass-card p-12 tablet:flex-col tablet:items-stretch tablet:gap-16 tablet:p-24">
      <div className="flex items-center gap-12 tablet:justify-between">
        <IconTile icon={icon} tone="glass" size="M" />
        <StatusBadge tone={status.tone} className="max-tablet:hidden">
          {status.label}
        </StatusBadge>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <h3 className="text-h5 text-text-inverse">{title}</h3>
        <p className="text-body-s text-text-inverse-muted max-tablet:sr-only">{text}</p>
      </div>
      <StatusBadge tone={status.tone} className="tablet:hidden">
        {status.label}
      </StatusBadge>
    </div>
  );
}

/** Bandeau « Développé par ZIIIILO » (15:3584 / 24:2991) : logo sur plaque claire, texte, lien. */
export function BuilderBand({
  title,
  text,
  textShort,
  action,
}: {
  title: string;
  text: string;
  textShort?: string;
  action: { label: string; href: "/a-propos" | "/realisations" };
}) {
  return (
    <section aria-labelledby="developpe-par-title" className="pb-64 desktop:pb-96">
      <div className="container">
        <Reveal className="flex flex-col items-center gap-24 rounded-xl border border-border-default bg-background-subtle p-24 text-center tablet:flex-row tablet:gap-32 tablet:p-28 tablet:text-left">
          <span className="flex shrink-0 items-center justify-center rounded-lg border border-border-default bg-surface-default px-20 py-12">
            <Logo width={112} />
          </span>
          <div className="flex flex-1 flex-col gap-8">
            <h2 id="developpe-par-title" className="text-h4 text-text-primary">
              {title}
            </h2>
            <p className="text-body-s text-text-secondary">
              <Short full={text} short={textShort} />
            </p>
          </div>
          <Button href={action.href} variant="secondary" size="M" className="max-tablet:w-full">
            {action.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
