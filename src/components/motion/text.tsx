"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Animations de texte du §8 (Figma 52:87). Toutes se jouent une seule fois ;
 * seul le curseur clignote. Rendu serveur = texte final ; la couche animée
 * n'apparaît qu'après hydratation. `useReducedMotion()` → état final direct.
 */

export const EASE_REVEAL = [0, 0, 0.58, 1] as const;
export const EASE_SWEEP = [0.42, 0, 0.58, 1] as const;
export const EASE_UI = [0.2, 0.8, 0.2, 1] as const;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const noop = () => () => {};
/** Faux au rendu serveur et à l'hydratation, vrai ensuite (sans setState dans un effet). */
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Déclenchement commun : entrée dans l'écran à 40 %, une fois. */
export function useRevealOnView<T extends Element>(amount = 0.4) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  return [ref, inView] as const;
}

/** Horloge rAF démarrée quand `run` passe à vrai ; s'arrête après `end` ms. */
function useClock(run: boolean, end: number) {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const e = now - t0;
      setT(e);
      if (e < end + 50) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, end]);
  return t;
}

const GLYPHS = "01<>/{}[]#%+=*ABCDEFXZ";

/* ——— DecodeText (52:92) : front cyan qui décode le H1 du hero ——— */
export function DecodeText({
  text,
  as: Tag = "h1",
  delay = 300,
  duration = 1400,
  lag = 220,
  cursor = true,
  scramble = true,
  start = true,
  className,
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
  duration?: number;
  lag?: number;
  cursor?: boolean;
  scramble?: boolean;
  /** Départ différé (ex. fin du splash) ; vrai par défaut = au montage. */
  start?: boolean;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const end = delay + duration + lag;
  const t = useClock(mounted && start && !reduce, end);

  // Avant le départ (et en mouvement réduit) : texte final, masqué par `.js .reveal-pending`
  // tant que l'animation n'a pas commencé ; la requête « reduce » le laisse visible.
  if (t === null)
    return (
      <Tag id={id} className={cn(className, "reveal-pending")}>
        {text}
      </Tag>
    );
  const n = text.replace(/\s/g, "").length;
  const step = duration / n;
  let k = -1;
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, w, words) => (
          <Fragment key={w}>
            <span className="whitespace-nowrap">
              {Array.from(word).map((c, i) => {
                k++;
                const on = delay + k * step;
                if (t < on)
                  return (
                    <span key={i} className="opacity-0">
                      {c}
                    </span>
                  );
                if (t < on + lag)
                  return (
                    <span key={i} className="relative">
                      <span className="text-transparent">{c}</span>
                      <span className="decode-glyph absolute inset-0">
                        {scramble ? GLYPHS[(Math.floor(t / 50) + k) % GLYPHS.length] : c}
                      </span>
                    </span>
                  );
                return <span key={i}>{c}</span>;
              })}
            </span>
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
        {cursor && t >= end && <span className="motion-cursor" />}
      </span>
    </Tag>
  );
}

/* ——— TypeLine (52:121) : surtitre tapé, curseur bloc qui suit la frappe ——— */
export function TypeLine({
  text,
  duration = 500,
  delay = 0,
  cursor = true,
  className,
  inViewRef,
}: {
  text: string;
  duration?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
  /** Déclenché par un parent (en-tête de section) ; sinon par sa propre entrée à l'écran. */
  inViewRef?: boolean;
}) {
  const reduce = useReducedMotion();
  const [ref, ownInView] = useRevealOnView<HTMLSpanElement>();
  const run = (inViewRef ?? ownInView) && !reduce;
  const t = useClock(run, delay + duration);
  if (t === null)
    return (
      <span ref={ref} className={cn(className, "reveal-pending")}>
        {text}
      </span>
    );
  const shown =
    t === null ? 0 : Math.max(0, Math.min(text.length, Math.ceil(((t - delay) / duration) * text.length)));
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, shown)}
        {cursor && <span className="motion-cursor motion-cursor--block" />}
        <span className="opacity-0">{text.slice(shown)}</span>
      </span>
    </span>
  );
}

/* ——— RevealLines (52:121 / 52:146) : mots ou lignes qui montent du flou ——— */
export type RevealPreset = "h2" | "cta" | "hero-sub" | "description";
const PRESETS: Record<
  RevealPreset,
  { by: "line" | "word"; duration: number; overlap: number; distance: number; blur: number; delay: number }
> = {
  h2: { by: "line", duration: 800, overlap: 0.55, distance: 16, blur: 8, delay: 350 },
  cta: { by: "word", duration: 1000, overlap: 0.45, distance: 20, blur: 10, delay: 200 },
  "hero-sub": { by: "line", duration: 700, overlap: 0.6, distance: 12, blur: 8, delay: 1350 },
  description: { by: "line", duration: 600, overlap: 0.6, distance: 8, blur: 4, delay: 800 },
};

export function RevealLines({
  text,
  as: Tag = "p",
  preset = "h2",
  delay,
  trigger,
  className,
  id,
}: {
  text: string;
  as?: ElementType;
  preset?: RevealPreset;
  delay?: number;
  /** Déclenchement par le parent ; `undefined` = entrée à l'écran ; `"mount"` = au montage. */
  trigger?: boolean | "mount";
  className?: string;
  id?: string;
}) {
  const p = PRESETS[preset];
  const start = (delay ?? p.delay) / 1000;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const ownInView = useInView(ref, { once: true, amount: 0.4 });
  const mounted = useMounted();
  const run = reduce || (trigger === "mount" ? mounted : (trigger ?? ownInView));
  const words = text.split(/\s+/);
  const [lineOf, setLineOf] = useState<number[] | null>(null);

  useIsoLayoutEffect(() => {
    if (p.by !== "line" || !ref.current) return;
    const measure = () => {
      const spans = ref.current?.querySelectorAll<HTMLElement>("[data-w]");
      if (!spans) return;
      const tops: number[] = [];
      const lines = Array.from(spans).map((s) => {
        const top = s.offsetTop;
        let idx = tops.findIndex((v) => Math.abs(v - top) < 4);
        if (idx < 0) idx = tops.push(top) - 1;
        return idx;
      });
      setLineOf(lines);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [p.by, text]);

  const groups = p.by === "line" ? Math.max(1, ...(lineOf ?? [0]).map((l) => l + 1)) : words.length;
  const step = (p.duration / 1000) * (1 - p.overlap);
  const each = groups > 1 ? p.duration / 1000 / (1 + (groups - 1) * (1 - p.overlap)) : p.duration / 1000;

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const g = p.by === "line" ? (lineOf?.[i] ?? 0) : i;
          return (
            <motion.span
              key={i}
              data-w
              className="motion-reveal inline-block"
              initial={reduce ? false : { opacity: 0, y: p.distance, filter: `blur(${p.blur}px)` }}
              animate={run ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{
                delay: start + g * step * (each / (p.duration / 1000)),
                duration: each,
                ease: EASE_REVEAL,
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          );
        })}
      </span>
    </Tag>
  );
}

/* ——— ScanText (52:156) : balayage lumineux unique sur les titres sombres ——— */
export function ScanText({
  children,
  delay = 400,
  run = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  run?: boolean;
  className?: string;
}) {
  return (
    <span className={cn(run && "scan-text", className)} style={{ ["--scan-delay" as string]: `${delay}ms` }}>
      {children}
    </span>
  );
}

/* ——— CircuitUnderline (52:174) : soulignement « circuit » sous Méthode / Démarche ——— */
export function CircuitUnderline({ delay = 1000, className }: { delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [w, setW] = useState(240);
  useIsoLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const measure = () => setW(Math.max(80, Math.min(parent.clientWidth, 480)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  const s = Math.round(w * 0.62);
  const d0 = delay / 1000;
  const nodes = [
    { cx: 4, at: d0 - 0.05 },
    { cx: s + 10, at: d0 + 0.55 },
    { cx: w - 4, at: d0 + 0.85 },
  ];
  const show = inView || reduce;
  return (
    <svg
      ref={ref}
      aria-hidden
      width={w}
      height={18}
      viewBox={`-6 -6 ${w + 12} 24`}
      className={cn("block overflow-visible", className)}
    >
      <motion.path
        d={`M4 0 H${s} L${s + 10} 10 H${w - 4}`}
        fill="none"
        className="stroke-primary-brand"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : undefined}
        transition={{ delay: d0, duration: 0.9, ease: EASE_SWEEP }}
      />
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={i === 0 ? 0 : 10}
          r={4}
          className="fill-surface-default stroke-primary-brand"
          strokeWidth={2}
          initial={{ scale: reduce ? 1 : 0 }}
          animate={show ? { scale: 1 } : undefined}
          transition={{ delay: n.at, type: "spring", stiffness: 500, damping: 22 }}
        />
      ))}
    </svg>
  );
}

/* ——— Reveal : apparition générique (fondu + montée) pour blocs, cartes, boutons ——— */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  distance = 16,
  duration = 450,
  trigger,
  className,
  ...rest
}: {
  children: ReactNode;
  as?: "div" | "li" | "section" | "article" | "span";
  delay?: number;
  distance?: number;
  duration?: number;
  trigger?: boolean | "mount";
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const mounted = useMounted();
  const run = reduce || (trigger === "mount" ? mounted : (trigger ?? inView));
  const M = motion[as] as typeof motion.div;
  return (
    <M
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("motion-reveal", className)}
      initial={reduce ? false : { opacity: 0, y: distance }}
      animate={run ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: delay / 1000, duration: duration / 1000, ease: EASE_REVEAL }}
      {...rest}
    >
      {children}
    </M>
  );
}

/**
 * Titre sur fond sombre : révélation (lignes ou mots) puis un seul balayage lumineux.
 * Une fois la révélation finie, le texte redevient un nœud simple pour que
 * `background-clip: text` s'applique sans calques de transformation.
 */
export function RevealScan({
  text,
  preset = "h2",
  trigger,
  scanAt = 1300,
  delay,
}: {
  text: string;
  preset?: RevealPreset;
  trigger?: boolean | "mount";
  /** Début du balayage (ms après le déclenchement). */
  scanAt?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [scan, setScan] = useState(false);
  const mounted = useMounted();
  const ref = useRef<HTMLSpanElement>(null);
  const ownInView = useInView(ref, { once: true, amount: 0.4 });
  const run = trigger === "mount" ? mounted : (trigger ?? ownInView);
  useEffect(() => {
    if (!run || reduce) return;
    const id = window.setTimeout(() => setScan(true), scanAt);
    return () => window.clearTimeout(id);
  }, [run, reduce, scanAt]);
  if (scan) {
    return (
      <span ref={ref} className="scan-text" style={{ ["--scan-delay" as string]: "0s" }}>
        {text}
      </span>
    );
  }
  return (
    <span ref={ref}>
      <RevealLines as="span" text={text} preset={preset} trigger={run} delay={delay} />
    </span>
  );
}
