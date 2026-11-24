import { cn } from "@/lib/cn";

/**
 * Badge de statut — Figma 4:565 (Disponible / En développement / Prévu / Produit ZIIIILO /
 * Neutre / Sur fond sombre). La pastille pulse pour les statuts actifs (§8 n° 16).
 */
export type BadgeTone =
  | "available"
  | "development"
  | "planned"
  | "product"
  | "neutral"
  | "teal"
  | "dark";

const tones: Record<BadgeTone, string> = {
  available: "bg-success-subtle text-success-default",
  development: "bg-warning-subtle text-warning-default",
  planned: "bg-accent-violet-soft text-accent-violet",
  product: "bg-primary-soft text-primary-hover",
  neutral: "bg-background-muted text-text-secondary",
  /** Statuts DocCloud « Disponible pour restitution » (83:739). */
  teal: "bg-accent-teal-soft text-accent-teal-strong",
  dark: "border border-inverse-line bg-secondary-dark text-text-accent-on-dark",
};

export function StatusBadge({
  tone,
  children,
  pulse = false,
  className,
}: {
  tone: BadgeTone;
  children: React.ReactNode;
  /** Pastille qui pulse : statuts actifs seulement (« Disponible », « En production »). */
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-8 rounded-full px-12 py-6 whitespace-nowrap text-label-s",
        tones[tone],
        className,
      )}
    >
      <span aria-hidden className={cn("size-6 rounded-full bg-current", pulse && "status-dot--pulse")} />
      {children}
    </span>
  );
}
