"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * 19 · Onde d'alerte (`Effet/Onde d’alerte` 407:711, DESIGN §8 v3.0) : sur une parcelle fictive
 * en alerte, un cercle passe de 40 à 160 px (échelle 0,25 → 1) pendant que son contour s'efface
 * (0,9 → 0), 1,4 s ease-out, une onde toutes les 2,4 s. Boucle en pause hors écran et onglet
 * masqué ; avec `prefers-reduced-motion`, un anneau fixe reste affiché.
 * `at` : position du centre de la parcelle, en % de la maquette (x, y).
 */
export function AlertWave({ at, className }: { at: [number, number]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wave = el.animate(
      [
        { scale: "0.25", opacity: 0.9, easing: "ease-out" },
        { scale: "1", opacity: 0, offset: 1400 / 2400 },
        { scale: "1", opacity: 0 },
      ],
      { duration: 2400, iterations: Infinity, fill: "both" },
    );
    let visible = false;
    const apply = () => (visible && !document.hidden ? wave.play() : wave.pause());
    wave.pause();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      apply();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
      wave.cancel();
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      style={{ left: `${at[0]}%`, top: `${at[1]}%` }}
      className={cn(
        "pointer-events-none absolute size-96 -translate-1/2 scale-50 rounded-full border-2 border-accent-orange tablet:size-160",
        className,
      )}
    />
  );
}
