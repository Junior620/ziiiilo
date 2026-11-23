import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Pastille icône — Figma 6:138 / 6:179. Tons Bleu / Violet / Orange / Sombre, tailles L 56 / M 44
 * (jamais en dessous de 44 px). `glass` = variante sur fond sombre (cartes Principe et Produit).
 */
export type IconTone = "blue" | "violet" | "orange" | "dark" | "glass";

const tones: Record<IconTone, string> = {
  blue: "bg-primary-subtle text-primary-default",
  violet: "bg-accent-violet-soft text-accent-violet",
  orange: "bg-accent-orange-soft text-warning-default",
  dark: "bg-secondary-dark text-accent-cyan",
  glass: "border border-glass-inverse-border bg-glass-inverse text-accent-cyan",
};

export function IconTile({
  icon: Icon,
  tone = "blue",
  size = "L",
  className,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  size?: "XL" | "L" | "M";
  className?: string;
}) {
  const box =
    size === "XL" ? "size-88 rounded-lg" : size === "L" ? "size-56 rounded-lg" : "size-44 rounded-md";
  const iconSize = size === "M" ? 22 : 26;
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center", box, tones[tone], className)}
    >
      <Icon size={iconSize} strokeWidth={1.75} />
    </span>
  );
}
