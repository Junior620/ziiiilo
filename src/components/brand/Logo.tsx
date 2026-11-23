import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Logo ZIIIILO (§11) : SVG fournis dans public/brand, jamais redessinés ni recolorés.
 * Ratio 2:1 — header desktop 112 × 56, mobile 96 × 48, minimum 96 px de large.
 * Sur fond sombre : version monochrome blanche (footer, validée en v3.1).
 */
export function Logo({
  variant = "color",
  width = 112,
  priority,
  className,
}: {
  variant?: "color" | "white";
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={variant === "white" ? "/brand/ziiiilo-logo-blanc.svg" : "/brand/ziiiilo-logo-couleur.svg"}
      alt="ZIIIILO"
      width={width}
      height={width / 2}
      unoptimized
      priority={priority}
      className={cn("h-auto shrink-0", className)}
      style={{ width, height: width / 2 }}
    />
  );
}

