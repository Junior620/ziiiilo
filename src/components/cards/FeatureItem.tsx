import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/cn";

/**
 * Carte/Principe — Figma 6:311. Clair : pastille M bleue, titre H5, texte Body S.
 * Sombre : fond inverse, padding 24, rayon 16, pastille en verre.
 * `layout="row"` = disposition mobile (pastille à gauche, 22:660).
 */
export function FeatureItem({
  icon,
  title,
  text,
  theme = "light",
  layout = "column",
  glass = false,
  headingLevel: Heading = "h3",
  className,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  theme?: "light" | "dark";
  layout?: "column" | "row" | "responsive";
  /** Sombre : carte en verre sur une section déjà sombre (détail service 13:2161). */
  glass?: boolean;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const dark = theme === "dark";
  return (
    <div
      className={cn(
        "flex gap-16",
        layout === "column" && "flex-col",
        layout === "row" && "flex-row items-start",
        layout === "responsive" && "flex-row items-start tablet:flex-col",
        dark && "rounded-lg p-24",
        dark && (glass ? "border border-glass-card-border bg-glass-card" : "bg-background-inverse"),
        className,
      )}
    >
      <IconTile icon={icon} tone={dark ? "glass" : "blue"} size="M" />
      <div className="flex min-w-0 flex-col gap-8">
        <Heading className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{title}</Heading>
        <p className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>{text}</p>
      </div>
    </div>
  );
}
