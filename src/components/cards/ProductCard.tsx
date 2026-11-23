import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { IconTile } from "@/components/ui/IconTile";
import { RingMotif } from "@/components/ui/RingMotif";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];

/**
 * Carte/Produit — Figma 6:326 (FleetRent 14:2585, DocCloud 14:2621 ; mobile 24:2260).
 * Visuel codé 260 px : dégradé produit, anneau, pastille verre 88 px. Contenu 32 px : statut,
 * titre, description, catégories, lien. Toute la carte est cliquable ; survol : montée de 4 px.
 */
export function ProductCard({
  name,
  icon,
  status,
  description,
  descriptionShort,
  tags,
  linkLabel,
  href,
  headingLevel: Heading = "h3",
  className,
}: {
  name: string;
  icon: LucideIcon;
  status: { label: string; tone: BadgeTone; pulse?: boolean };
  description: string;
  descriptionShort?: string;
  tags: string;
  linkLabel: string;
  href: Href;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/product relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-default",
        "transition-[transform,box-shadow] duration-(--duration-card) ease-ui hover:-translate-y-4 hover:shadow-md focus-within:shadow-md motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div
        aria-hidden
        className="relative flex h-260 items-center justify-center overflow-hidden bg-(image:--gradient-product)"
      >
        <RingMotif className="absolute top-[-15%] right-[-10%] size-360 opacity-40" />
        <IconTile icon={icon} tone="glass" size="XL" className="relative [backdrop-filter:var(--glass-card)]" />
      </div>
      <div className="flex flex-1 flex-col gap-16 p-24 tablet:p-32">
        <StatusBadge tone={status.tone} pulse={status.pulse}>
          {status.label}
        </StatusBadge>
        <Heading className="text-h3 text-text-primary">{name}</Heading>
        <p className="text-text-secondary text-body-m">
          {descriptionShort ? (
            <>
              <span className="max-tablet:hidden">{description}</span>
              <span className="tablet:hidden">{descriptionShort}</span>
            </>
          ) : (
            description
          )}
        </p>
        <p className="text-text-secondary text-label-s">{tags}</p>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-8 text-text-link text-label-m after:absolute after:inset-0 after:content-['']"
        >
          {linkLabel}
          <span className="sr-only"> — {name}</span>
          <ArrowRight
            aria-hidden
            size={16}
            strokeWidth={1.75}
            className="transition-transform duration-200 ease-ui group-hover/product:translate-x-4"
          />
        </Link>
      </div>
    </article>
  );
}
