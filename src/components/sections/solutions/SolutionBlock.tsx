import { Check } from "lucide-react";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion/text";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import type { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];

export type SolutionTarget = { label: string; short?: string };
export type SolutionFeature = { label: string; short?: string; badge?: { label: string; tone: BadgeTone } };
export type SolutionBadge = { label: string; short?: string; tone: BadgeTone; pulse?: boolean };

/** Texte complet en tablette et desktop, version courte de la maquette mobile en dessous. */
function Short({ full, short }: { full: string; short?: string }) {
  if (!short || short === full) return <>{full}</>;
  return (
    <>
      <span className="max-tablet:hidden">{full}</span>
      <span className="tablet:hidden">{short}</span>
    </>
  );
}

/**
 * Produit à la une / Solution métier — Figma 87:18054 (FleetRent 14:2274, DocCloud 89:10392,
 * SCPB Commercial 117:14029, StafTrack 135:19909, Prévisions 167:20378, Survey 207:50200),
 * mobile 24:1972. Carte blanche rayon 32, visuel 620 px exporté de Figma (gauche ou droite),
 * contenu 56 px : badges, titre, proposition de valeur, « Pour qui ? », fonctionnalités, actions.
 * Mobile : visuel 300 × 220 en tête, bouton principal seul, textes raccourcis.
 */
export function SolutionBlock({
  id,
  title,
  badges,
  description,
  descriptionShort,
  targetsLabel,
  targets,
  featuresLabel,
  features,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  primary,
  secondary,
  priority,
  className,
}: {
  id?: string;
  title: ReactNode;
  badges: readonly SolutionBadge[];
  description: string;
  descriptionShort?: string;
  targetsLabel: string;
  targets: readonly SolutionTarget[];
  featuresLabel: string;
  features: readonly SolutionFeature[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Visuel à droite en desktop (DocCloud, solutions métiers). */
  reverse?: boolean;
  primary: { label: string; href: Href; ariaLabel?: string };
  secondary?: { label: string; href: Href } | null;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      as="article"
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn(
        "flex scroll-mt-(--header-height) flex-col gap-16 overflow-hidden rounded-xl border border-border-default bg-surface-default p-20",
        "desktop:flex-row desktop:gap-0 desktop:rounded-2xl desktop:p-0",
        reverse && "desktop:flex-row-reverse",
        className,
      )}
    >
      <div className="relative aspect-[15/11] shrink-0 overflow-hidden rounded-xl bg-(image:--gradient-product) desktop:aspect-auto desktop:w-620 desktop:rounded-none">
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          priority={priority}
          sizes="(min-width: 75rem) 620px, (min-width: 48rem) 90vw, 100vw"
          className="size-full object-cover desktop:absolute desktop:inset-0"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-16 desktop:gap-24 desktop:p-56">
        <ul className="flex flex-wrap gap-8">
          {badges.map((badge) => (
            <li key={badge.label}>
              <StatusBadge tone={badge.tone} pulse={badge.pulse}>
                <Short full={badge.label} short={badge.short} />
              </StatusBadge>
            </li>
          ))}
        </ul>

        <h3 id={id ? `${id}-title` : undefined} className="text-h1 text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary text-body-l">
          <Short full={description} short={descriptionShort} />
        </p>

        <div className="flex flex-col gap-10">
          <p className="hidden text-label-m text-text-primary tablet:block">{targetsLabel}</p>
          <ul aria-label={targetsLabel} className="flex flex-wrap gap-6 tablet:gap-8">
            {targets.map((target) => (
              <li
                key={target.label}
                className="inline-flex items-center rounded-full bg-background-muted px-12 py-6 text-text-secondary text-label-s tablet:px-14 tablet:text-body-s"
              >
                <Short full={target.label} short={target.short} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <p className="hidden text-label-m text-text-primary tablet:block">{featuresLabel}</p>
          <ul aria-label={featuresLabel} className="flex flex-col gap-12 tablet:gap-10">
            {features.map((feature) => (
              <li key={feature.label} className="flex items-center justify-between gap-12">
                <span className="flex items-start gap-10 text-text-secondary text-body-s tablet:text-body-m">
                  <Check
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="mt-2 shrink-0 text-primary-default tablet:mt-4"
                  />
                  <span>
                    <Short full={feature.label} short={feature.short} />
                  </span>
                </span>
                {feature.badge && (
                  <StatusBadge tone={feature.badge.tone}>{feature.badge.label}</StatusBadge>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-12 pt-8 tablet:flex-row tablet:items-center">
          <Button href={primary.href} block className="tablet:w-auto" aria-label={primary.ariaLabel}>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="ghost" className="hidden tablet:inline-flex">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
