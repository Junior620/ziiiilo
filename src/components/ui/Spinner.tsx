import { cn } from "@/lib/cn";

/**
 * Indicateur de chargement — Figma 73:704 / Loader/Spinner 385:114 (S 20, M 32, L 56).
 * Tons : Marque (sur fond clair) / Inverse (sur fond sombre ou bouton primaire). 1 tour/s.
 */
export function Spinner({
  size = 20,
  tone = "brand",
  label = "Chargement",
  className,
}: {
  size?: number;
  tone?: "brand" | "inverse";
  /** Texte annoncé ; `null` quand le parent porte déjà `aria-busy`. */
  label?: string | null;
  className?: string;
}) {
  const svg = (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("spinner shrink-0", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        strokeWidth="3"
        className={tone === "inverse" ? "stroke-inverse-outline" : "stroke-primary-soft"}
      />
      <path
        d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
        strokeWidth="3"
        strokeLinecap="round"
        className={tone === "inverse" ? "stroke-text-inverse" : "stroke-primary-brand"}
      />
    </svg>
  );
  if (label === null) return svg;
  return (
    <span role="status" className="inline-flex">
      {svg}
      <span className="sr-only">{label}</span>
    </span>
  );
}
