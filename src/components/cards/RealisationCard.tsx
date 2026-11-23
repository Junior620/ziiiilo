import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { STATUTS_ACTIFS, type Realisation, type Statut } from "@/data/realisations";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];

/** Ton du badge d'après le statut (données de realisations.ts, jamais codé dans les pages). */
export function statutTone(statut: Statut): BadgeTone {
  switch (statut) {
    case "en-developpement":
    case "pilote-en-preparation":
      return "development";
    case "en-production":
    case "disponible":
    case "en-ligne":
    case "livree-modules-en-evolution":
      return "available";
    default:
      return "neutral";
  }
}

/**
 * Carte/Réalisation vedette — Figma 101:2087 (FleetRent 101:2088, CocoaTrack 317:1237,
 * STE-SCPB 243:87, Ninety One Foot Academy 283:87). Verre sur fond sombre (4 %, bordure 10 %),
 * visuel 588 × 300 exporté de Figma, badges, domaines, titre, description, actions.
 * Survol : léger zoom du visuel (pointeur fin).
 */
export function RealisationCard({
  realisation,
  image,
  imageAlt,
  typeBadge,
  extraBadge,
  statutLabel,
  domains,
  description,
  ctaLabel,
  visitLabel,
  newTabLabel,
  headingLevel: Heading = "h3",
  priority,
  className,
}: {
  realisation: Realisation;
  image: string;
  imageAlt: string;
  typeBadge: string;
  extraBadge?: string;
  statutLabel: string;
  domains: string;
  description: string;
  ctaLabel: string;
  visitLabel: string;
  newTabLabel: string;
  headingLevel?: "h2" | "h3" | "h4";
  priority?: boolean;
  className?: string;
}) {
  const href = realisation.route as Href;
  const pulse = STATUTS_ACTIFS.includes(realisation.statut);
  return (
    <article
      className={cn(
        "group/real flex flex-col overflow-hidden rounded-xl border border-glass-card-border bg-glass-card desktop:rounded-2xl",
        "transition-[border-color] duration-(--duration-card) ease-ui hover:border-inverse-line",
        className,
      )}
    >
      <div className="relative aspect-[588/300] overflow-hidden bg-(image:--gradient-product)">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1200px) 588px, (min-width: 768px) 50vw, 100vw"
          className="ease-out object-cover transition-transform duration-300 motion-reduce:transition-none pointer-fine:group-hover/real:scale-102"
        />
      </div>
      <div className="flex flex-1 flex-col gap-14 p-20 tablet:p-24">
        <div className="flex flex-wrap gap-8">
          <StatusBadge tone="dark">{typeBadge}</StatusBadge>
          <StatusBadge tone={statutTone(realisation.statut)} pulse={pulse}>
            {statutLabel}
          </StatusBadge>
          {extraBadge && <StatusBadge tone="neutral">{extraBadge}</StatusBadge>}
        </div>
        <p className="text-overline text-accent-cyan">{domains}</p>
        <Heading className="text-h4 text-text-inverse">{realisation.nom}</Heading>
        <p className="text-text-inverse-muted text-body-s">{description}</p>
        <div className="mt-auto flex flex-col gap-12 pt-4 tablet:flex-row">
          <Button
            href={href}
            variant="inverse"
            className={cn("w-full", realisation.siteUrl ? "tablet:flex-1" : "tablet:w-auto")}
            aria-label={`${ctaLabel} — ${realisation.nom}`}
          >
            {ctaLabel}
          </Button>
          {realisation.siteUrl && (
            <Button
              externalHref={realisation.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="inverse-outline"
              icon={ExternalLink}
              className="w-full tablet:flex-1"
            >
              {visitLabel}
              <span className="sr-only">
                {" "}
                — {realisation.nom} ({newTabLabel})
              </span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Carte/Réalisation compacte — Figma 329:415 (Desktop 329:403, Mobile 329:409).
 * Fond bleu nuit, bordure navy, rayon 16, padding 20. Toute la carte est le lien.
 */
export function CompactRealisationCard({
  realisation,
  domains,
  description,
  linkLabel,
  headingLevel: Heading = "h4",
  className,
}: {
  realisation: Realisation;
  domains: string;
  description: string;
  linkLabel: string;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/compact relative flex flex-col gap-8 rounded-lg border border-background-inverse-raised bg-secondary-dark p-20",
        "transition-[border-color,transform] duration-(--duration-card) ease-ui focus-within:border-accent-cyan hover:-translate-y-4 hover:border-accent-cyan motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <p className="text-overline text-accent-cyan">{domains}</p>
      <Heading className="text-text-inverse text-h5">{realisation.nom}</Heading>
      <p className="text-text-inverse-muted text-body-s">{description}</p>
      <Link
        href={realisation.route as Href}
        className="mt-auto inline-flex items-center gap-6 pt-4 text-accent-cyan text-label-m after:absolute after:inset-0 after:rounded-lg after:content-['']"
      >
        {linkLabel}
        <span className="sr-only"> — {realisation.nom}</span>
        <ArrowRight
          aria-hidden
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-200 ease-ui group-hover/compact:translate-x-4"
        />
      </Link>
    </article>
  );
}
