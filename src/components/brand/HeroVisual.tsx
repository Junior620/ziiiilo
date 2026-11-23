"use client";

import { Car, Cloud, Database, Globe, type LucideIcon, Smartphone, Sparkles, Zap } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, type ReactNode } from "react";
import { useLoopPause } from "@/components/motion/effects";
import { RingMotif } from "@/components/ui/RingMotif";
import { cn } from "@/lib/cn";

/**
 * Visuel/Hero — Écosystème ZIIIILO (Figma 7:246, accueil 11:133 / 22:42). Composition
 * décorative en HTML/SVG (aucune donnée réelle) : anneau, panneau « Plateforme »,
 * carte code, carte mobile, puces. Cotes Figma en em (1em = 1/62 de la largeur, 620 × 600).
 * Boucles (§8 n° 14) : anneau 360° en 60 s, cartes qui flottent ; parallaxe souris (n° 04).
 */
export function HeroVisual({ className }: { className?: string }) {
  const t = useTranslations("home.hero.visual");
  const reduce = useReducedMotion();
  const loopRef = useLoopPause<HTMLDivElement>();
  const canvas = useRef<HTMLDivElement>(null);

  // Parallaxe : pointeur fin uniquement, lissage lerp 0,08
  useEffect(() => {
    const el = canvas.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      el.style.setProperty("--hero-px", cur.x.toFixed(4));
      el.style.setProperty("--hero-py", cur.y.toFixed(4));
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={loopRef}
      aria-hidden
      className={cn("hero-visual-scale relative aspect-[620/600] w-full", className)}
    >
      <div ref={canvas} className="hero-visual-canvas absolute inset-0 select-none">
        {/* Halos */}
        <span className="absolute inset-[15%_12.9%_15%_19.35%] scale-150 rounded-full bg-[radial-gradient(circle,var(--color-primary-brand)_0%,transparent_65%)] opacity-50" />
        <span className="absolute inset-[55%_4.84%_1.67%_53.23%] scale-150 rounded-full bg-[radial-gradient(circle,var(--color-accent-violet)_0%,transparent_65%)] opacity-60" />

        {/* Anneau (rotation lente) */}
        <div className="hero-parallax hero-parallax--ring absolute inset-[6.67%_8.06%]">
          <RingMotif className="hero-ring size-full opacity-90" />
        </div>

        {/* Panneau « Plateforme » */}
        <Floating className="inset-[28.33%_20.97%_34.67%_20.97%]" index={1}>
          <Glass className="flex size-full flex-col gap-[1.2em] rounded-[2em] p-[1.8em] shadow-hero-cyan">
            <div className="flex items-center justify-between">
              <span className="text-[1.2em] font-semibold text-text-inverse">{t("platform")}</span>
              <span className="flex h-[2em] items-center gap-[0.5em] rounded-full bg-accent-cyan-tint px-[0.8em]">
                <span className="size-[0.6em] rounded-full bg-accent-cyan" />
                <span className="text-[0.9em] font-semibold text-accent-cyan">{t("online")}</span>
              </span>
            </div>
            <svg
              viewBox="0 0 324 102"
              preserveAspectRatio="none"
              className="h-[11em] w-full overflow-visible"
            >
              <path
                d="M0 84C40 80 56 52 92 56C128 60 140 26 180 30C220 34 236 10 270 14C300 17 312 2 324 0V102H0V84Z"
                className="fill-accent-cyan-wash"
              />
              <path
                d="M1 84C41 80 57 52 93 56C129 60 141 26 181 30C221 34 237 10 271 14C301 17 313 2 325 0"
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="stroke-accent-cyan"
              />
            </svg>
            <div className="flex gap-[0.8em]">
              <Module icon={Globe} label={t("web")} />
              <Module icon={Smartphone} label={t("mobile")} />
              <Module icon={Database} label={t("data")} />
            </div>
          </Glass>
        </Floating>

        {/* Carte code */}
        <Floating className="inset-[10%_3.23%_69.83%_59.68%]" index={2}>
          <Glass className="flex size-full flex-col gap-[0.6em] rounded-[2em] px-[1.6em] py-[1.4em] font-mono shadow-hero-violet">
            <span className="flex gap-[0.5em]">
              <span className="size-[0.7em] rounded-full bg-window-red" />
              <span className="size-[0.7em] rounded-full bg-window-yellow" />
              <span className="size-[0.7em] rounded-full bg-window-green" />
            </span>
            <code className="text-[1.1em] leading-normal whitespace-pre">
              <span className="text-code-keyword">const </span>
              <span className="text-code-text">projet</span>
              <span className="text-code-punct"> = </span>
              <span className="text-code-keyword">await</span>
              {"\n"}
              <span className="text-code-call">{"  concevoir"}</span>
              <span className="text-code-text">(idée)</span>
              {"\n"}
              <span className="text-code-punct">{"  ."}</span>
              <span className="text-code-method">développer</span>
              <span className="text-code-text">()</span>
              {"\n"}
              <span className="text-code-punct">{"  ."}</span>
              <span className="text-code-success">déployer</span>
              <span className="text-code-text">();</span>
            </code>
          </Glass>
        </Floating>

        {/* Carte mobile */}
        <Floating className="inset-[50%_72.9%_17.33%_6.45%]" index={3}>
          <Glass className="flex size-full flex-col items-center gap-[0.8em] rounded-[2.6em] p-[1.2em] shadow-hero-card">
            <span className="h-[0.6em] w-[4em] rounded-full bg-inverse-line-soft" />
            <span className="flex h-[7.2em] w-full items-center justify-center rounded-[1.4em] bg-(image:--gradient-hero-app) text-text-inverse">
              <Car size="2.6em" strokeWidth={1.75} />
            </span>
            <span className="h-[0.8em] w-[9.2em] rounded-full bg-inverse-line" />
            <span className="h-[0.8em] w-[7em] rounded-full bg-inverse-line" />
            <span className="h-[0.8em] w-[8.4em] rounded-full bg-inverse-line" />
            <span className="mt-auto flex h-[2.8em] w-full items-center justify-center rounded-full bg-accent-cyan">
              <span className="text-[1em] font-semibold text-secondary-dark">{t("book")}</span>
            </span>
          </Glass>
        </Floating>

        {/* Puces */}
        <Chip className="inset-[25%_75.81%_68%_9.68%]" icon={Cloud} label={t("cloud")} index={4} />
        <Chip className="inset-[73.33%_10.81%_19.67%_64.52%]" icon={Zap} label={t("api")} index={2} />
        <Chip className="inset-[86.67%_29.68%_6.33%_48.39%]" icon={Sparkles} label={t("ai")} index={3} />
      </div>
    </div>
  );
}

function Floating({
  className,
  index,
  children,
}: {
  className: string;
  index: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  return (
    <div className={cn("hero-parallax hero-parallax--card absolute", className)}>
      <div className={cn("hero-card size-full", index > 1 && `hero-card--${index}`)}>{children}</div>
    </div>
  );
}

function Glass({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-inverse-line bg-glass-inverse [backdrop-filter:var(--glass-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Module({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="flex h-[3em] min-w-0 flex-1 items-center gap-[0.6em] rounded-[1em] bg-glass-inverse px-[1em] text-text-inverse">
      <Icon size="1.3em" strokeWidth={1.75} className="shrink-0" />
      <span className="truncate text-[1em] font-medium">{label}</span>
    </span>
  );
}

function Chip({
  className,
  icon: Icon,
  label,
  index,
}: {
  className: string;
  icon: LucideIcon;
  label: string;
  index: 1 | 2 | 3 | 4;
}) {
  return (
    <Floating className={className} index={index}>
      <span className="flex size-full items-center gap-[0.8em] rounded-full border border-glass-inverse-border bg-glass-navy py-[0.8em] pr-[1.4em] pl-[1em] whitespace-nowrap [backdrop-filter:var(--glass-chip)]">
        <span className="flex size-[2.4em] shrink-0 items-center justify-center rounded-full bg-accent-cyan-tint text-accent-cyan">
          <Icon size="1.3em" strokeWidth={1.75} />
        </span>
        <span className="text-[1.1em] font-semibold text-text-inverse">{label}</span>
      </span>
    </Floating>
  );
}
