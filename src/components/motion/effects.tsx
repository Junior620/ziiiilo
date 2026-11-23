"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Effets de la page Figma « 08 — Animations et micro-interactions » (396:87).
 * Les boucles sont en CSS pur et mises en pause hors écran et onglet masqué (§8 v3.0).
 */

/** Pose `data-paused` sur l'élément quand il sort de l'écran ou que l'onglet est masqué. */
export function useLoopPause<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const apply = () => el.setAttribute("data-paused", String(!visible || document.hidden));
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      apply();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);
  return ref;
}

/* ——— 18 · Bandeau des technologies (407:699) : 40 s par tour, pause au survol ——— */
export function TechMarquee({ items, label }: { items: readonly string[]; label: string }) {
  const ref = useLoopPause<HTMLDivElement>();
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-glass-inverse-border bg-glass-inverse px-16 py-8 font-mono whitespace-nowrap text-text-inverse-muted text-body-s"
        >
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div ref={ref} className="tech-strip mask-fade-x overflow-hidden" role="region" aria-label={label}>
      <div className="tech-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ——— 05 · Capture inclinée (397:96) : survol d'une carte, pointeur fin ——— */
export function TiltCapture({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group/tilt [perspective:1000px]", className)}>
      <div
        className={cn(
          "ease-out transition-[transform,box-shadow] duration-400 will-change-transform",
          "pointer-fine:group-hover/tilt:[transform:rotateX(4deg)_rotateY(-6deg)_translateY(-6px)_scale(1.02)]",
          "pointer-fine:group-hover/tilt:shadow-lg pointer-fine:group-hover/tilt:duration-300",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ——— 07 · Défilement automatique (397:279) : 12 s aller-retour, pause au survol ——— */
export function AutoScroll({
  children,
  className,
  durationMs = 12000,
}: {
  children: ReactNode;
  className?: string;
  durationMs?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const pauseRef = useLoopPause<HTMLDivElement>();

  useEffect(() => {
    const measure = () => {
      if (frame.current && inner.current) {
        setDistance(Math.max(0, inner.current.scrollHeight - frame.current.clientHeight));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = inner.current;
    if (!el || reduce || distance <= 0) return;
    const anim = el.animate([{ transform: "translateY(0)" }, { transform: `translateY(-${distance}px)` }], {
      duration: durationMs,
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out",
    });
    const host = pauseRef.current;
    const sync = () => {
      const paused = host?.getAttribute("data-paused") === "true" || host?.matches(":hover");
      if (paused) anim.pause();
      else anim.play();
    };
    const mo = new MutationObserver(sync);
    if (host) {
      mo.observe(host, { attributes: true, attributeFilter: ["data-paused"] });
      host.addEventListener("mouseenter", sync);
      host.addEventListener("mouseleave", sync);
    }
    return () => {
      anim.cancel();
      mo.disconnect();
      host?.removeEventListener("mouseenter", sync);
      host?.removeEventListener("mouseleave", sync);
    };
  }, [distance, durationMs, reduce, pauseRef]);

  return (
    <div ref={pauseRef} className={className}>
      <div ref={frame} className="h-full overflow-hidden">
        <div ref={inner}>{children}</div>
      </div>
    </div>
  );
}
