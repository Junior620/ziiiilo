import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];
export type ProjectBadge = { label: string; tone: BadgeTone };
type Visit = { href: string; label: string; newTabLabel: string } | null;

function Badges({ badges, className }: { badges: readonly ProjectBadge[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-6 tablet:gap-8", className)}>
      {badges.map((badge) => (
        <li key={badge.label}>
          <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
        </li>
      ))}
    </ul>
  );
}

function VisitButton({
  visit,
  name,
  size,
  className,
}: {
  visit: NonNullable<Visit>;
  name: string;
  size?: "M";
  className?: string;
}) {
  return (
    <Button
      externalHref={visit.href}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary"
      size={size}
      icon={ExternalLink}
      className={className}
    >
      {visit.label}
      <span className="sr-only">
        {" "}
        — {name} ({visit.newTabLabel})
      </span>
    </Button>
  );
}

/**
 * Projet à la une — Figma 17:3911 (FleetRent), 374:243 (CocoaTrack), 246:87 (STE-SCPB),
 * 374:656 (Ninety One Foot Academy). Couverture 680 px exportée de Figma (mentions « données
 * fictives » / « captures réelles » incluses), contenu 48 px : badges, titre H2, description,
 * fiche projet, actions. Desktop uniquement (mobile : ProjectMobileCard).
 */
export function ProjectFeature({
  name,
  title,
  badges,
  text,
  sheet,
  cover,
  coverAlt,
  reverse,
  cta,
  href,
  visit,
  priority,
}: {
  name: string;
  title: string;
  badges: readonly ProjectBadge[];
  text: string;
  sheet: readonly { label: string; value: string }[];
  cover: string;
  coverAlt: string;
  reverse?: boolean;
  cta: string;
  href: Href;
  visit: Visit;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group/feature flex overflow-hidden rounded-2xl border border-border-default bg-surface-default",
        reverse && "flex-row-reverse",
      )}
    >
      <div className="relative w-[42.5rem] shrink-0 overflow-hidden bg-(image:--gradient-product)">
        <Image
          src={cover}
          alt={coverAlt}
          fill
          priority={priority}
          sizes="680px"
          className="object-cover transition-transform duration-300 ease-ui motion-reduce:transition-none pointer-fine:group-hover/feature:scale-102"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-20 p-48">
        <Badges badges={badges} />
        {/* h2 : les projets à la une suivent directement le H1 de la page Réalisations. */}
        <h2 className="text-h2 text-text-primary">{title}</h2>
        <p className="text-text-secondary text-body-l">{text}</p>
        <dl className="flex flex-col gap-12 rounded-lg bg-background-subtle p-20">
          {sheet.map((row) => (
            <div key={row.label} className="flex gap-16">
              <dt className="w-120 shrink-0 text-label-m text-text-primary">{row.label}</dt>
              <dd className="text-text-secondary text-body-s">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-12">
          <Button href={href} aria-label={`${cta} — ${name}`}>
            {cta}
          </Button>
          {visit && <VisitButton visit={visit} name={name} />}
        </div>
      </div>
    </article>
  );
}

/**
 * Carte/Projet — Figma 6:383 (grille « Autres réalisations » 17:4188). Couverture 232 px,
 * badge, titre H4, description, lien ; toute la carte est cliquable. Desktop uniquement.
 */
export function ProjectCard({
  name,
  badge,
  text,
  cta,
  href,
  image,
  imageAlt,
}: {
  name: string;
  badge: ProjectBadge;
  text: string;
  cta: string;
  href: Href;
  image: string;
  imageAlt: string;
}) {
  return (
    <article
      className={cn(
        "group/project relative flex h-full flex-col overflow-hidden rounded-xl border border-border-default bg-surface-default",
        "transition-[transform,box-shadow] duration-(--duration-card) ease-ui hover:-translate-y-4 hover:shadow-md focus-within:shadow-md motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="relative aspect-[382/232] overflow-hidden bg-background-inverse">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 75rem) 384px, 50vw"
          className="object-cover transition-transform duration-300 ease-ui motion-reduce:transition-none pointer-fine:group-hover/project:scale-102"
        />
      </div>
      <div className="flex flex-1 flex-col gap-14 p-28">
        <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
        <h3 className="text-h4 text-text-primary">{name}</h3>
        <p className="text-text-secondary text-body-s">{text}</p>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-8 text-text-link text-label-m after:absolute after:inset-0 after:content-['']"
        >
          {cta}
          <span className="sr-only"> — {name}</span>
          <ArrowRight
            aria-hidden
            size={16}
            strokeWidth={1.75}
            className="transition-transform duration-200 ease-ui group-hover/project:translate-x-4"
          />
        </Link>
      </div>
    </article>
  );
}

/**
 * Projet (mobile et tablette) — Figma 24:3121 … 302:10404. Visuel 300 × 200, badges, titre,
 * description, bouton principal pleine largeur et « Visiter le site » si l'URL est fournie.
 */
export function ProjectMobileCard({
  name,
  title,
  badges,
  text,
  cta,
  href,
  visit,
  image,
  imageAlt,
}: {
  name: string;
  title: string;
  badges: readonly ProjectBadge[];
  text: string;
  cta: string;
  href: Href;
  visit: Visit;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="flex h-full flex-col gap-14 rounded-xl border border-border-default bg-surface-default p-20">
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-background-inverse">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 48rem) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <Badges badges={badges} />
      <h3 className="text-h3 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-body-s">{text}</p>
      <div className="mt-auto flex flex-col gap-12 pt-4">
        <Button href={href} size="M" block aria-label={`${cta} — ${name}`}>
          {cta}
        </Button>
        {visit && <VisitButton visit={visit} name={name} size="M" className="w-full" />}
      </div>
    </article>
  );
}
