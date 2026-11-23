import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Motif/Anneau ZIIIILO — Figma 6:143. Décoratif (arcs du logo), jamais un substitut du logo.
 * Opacité conseillée 20–100 % selon le fond.
 */
export function RingMotif({
  className,
  eager,
}: {
  className?: string;
  /** En-têtes : au-dessus de la ligne de flottaison. */ eager?: boolean;
}) {
  return (
    <Image
      src="/brand/motif-anneau.svg"
      alt=""
      aria-hidden
      width={400}
      height={400}
      unoptimized
      loading={eager ? "eager" : undefined}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
