import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { IconTile, type IconTone } from "@/components/ui/IconTile";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];

/**
 * Carte/Service — Figma 6:296. Fond blanc, bordure, rayon 24, padding 32 (24 en mobile).
 * Toute la carte est cliquable (lien étiré) ; survol : bordure cyan, ombre, montée de 4 px (240 ms).
 */
export function ServiceCard({
  icon,
  tone = "blue",
  title,
  description,
  href,
  linkLabel,
  headingLevel: Heading = "h3",
  className,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  title: ReactNode;
  description: ReactNode;
  href: Href;
  linkLabel: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card relative flex flex-col gap-24 rounded-xl border border-border-default bg-surface-default p-24 tablet:p-32",
        "transition-[border-color,box-shadow,transform] duration-(--duration-card) ease-ui",
        "focus-within:border-accent-cyan focus-within:shadow-card-hover hover:-translate-y-4 hover:border-accent-cyan hover:shadow-card-hover",
        "motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <IconTile icon={icon} tone={tone} />
      <div className="flex flex-col gap-10">
        <Heading className="text-h4 text-text-primary">{title}</Heading>
        <p className="text-text-secondary text-body-m">{description}</p>
      </div>
      <Link
        href={href}
        className="mt-auto inline-flex w-fit items-center gap-8 text-text-link text-label-m after:absolute after:inset-0 after:rounded-xl after:content-['']"
      >
        {linkLabel}
        <span className="sr-only"> — {title}</span>
        <ArrowRight
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-200 ease-ui group-hover/card:translate-x-4"
        />
      </Link>
    </article>
  );
}

/**
 * Ligne de service de l'accueil mobile (Figma 22:195) : pastille M, titre, accroche courte,
 * chevron ; hauteur 76, rayon 16. Toute la ligne est le lien.
 */
export function ServiceRow({
  icon,
  tone = "blue",
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  title: string;
  description: string;
  href: Href;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-76 items-center gap-14 rounded-lg border border-border-default bg-surface-default px-14 py-12 transition-colors duration-200 ease-ui hover:border-accent-cyan active:bg-surface-sunken"
    >
      <IconTile icon={icon} tone={tone} size="M" />
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-text-primary text-label-l">{title}</span>
        <span className="text-text-secondary text-body-s">{description}</span>
      </span>
      <ChevronRight aria-hidden size={20} strokeWidth={1.75} className="shrink-0 text-text-muted" />
    </Link>
  );
}
