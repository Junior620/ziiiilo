"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { SPLASH_KEY } from "./boot";

/**
 * Splash d'ouverture — Figma 394:299 → 394:1115 (desktop), 394:1346 → 394:1994 (mobile), §8 v2.8.
 * Couche posée sur la page déjà rendue (SSR) : elle ne bloque ni le référencement ni le LCP.
 * Le compteur suit le chargement réel (polices, image du hero, hydratation) sans jamais le dépasser,
 * par paliers de 10 % ; pause à 100 %, ouverture en deux temps, fondu final. Pas de bouton « Passer » (retiré à la demande de ZIIIILO).
 */

const R = 136; // rayon de l'anneau (280 px de diamètre, trait 4)
const C = 2 * Math.PI * R;

type Phase = "count" | "hold" | "open1" | "open2" | "fade" | "done";

function statusKey(p: number) {
  if (p >= 100) return "welcome";
  if (p >= 60) return "interface";
  if (p >= 40) return "images";
  if (p >= 20) return "fonts";
  return "init";
}

export function SplashLoader() {
  const t = useTranslations("splash");
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("count");
  const [shown, setShown] = useState(0); // palier affiché (0–100)
  const real = useRef(0);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => C * (1 - v / 100));
  const barScale = useTransform(progress, (v) => v / 100);

  // Décision d'affichage (posée côté client par le script inline : html.splash-pending)
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("splash-pending")) return;
    sessionStorage.setItem(SPLASH_KEY, "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    // `splash-active` garde en pause la chorégraphie du hero jusqu'à l'ouverture
    html.classList.add("splash-active");
    html.classList.remove("splash-pending");
  }, []);

  // L'accueil se dévoile pendant l'ouverture : on lance alors les animations du hero
  useEffect(() => {
    if (phase === "open2" || phase === "fade" || phase === "done") {
      document.documentElement.classList.remove("splash-active");
    }
  }, [phase]);

  // Progression réelle : polices 30 %, image du hero 40 %, hydratation / repos 30 %
  useEffect(() => {
    if (!show) return;
    const add = (w: number) => () => (real.current = Math.min(100, real.current + w));
    document.fonts.ready.then(add(30));
    const hero = document.querySelector<HTMLImageElement>("[data-hero] img");
    const heroReady = hero && !hero.complete ? hero.decode().catch(() => undefined) : Promise.resolve();
    heroReady.then(add(40));
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    idle(add(30));
    const cap = window.setTimeout(() => (real.current = 100), site.splash.maxLoadMs);
    return () => window.clearTimeout(cap);
  }, [show]);

  // Chorégraphie : paliers de 10 % (pause + transition), jamais en avance sur le réel
  useEffect(() => {
    if (!show) return;
    if (reduce) {
      const id = window.setTimeout(() => setPhase("fade"), 300);
      return () => window.clearTimeout(id);
    }
    let cancelled = false;
    const tail = 1200 + 1300 + 1500 + 900;
    const palier = Math.max(300, (site.splash.durationMs - tail) / 10);
    const pause = palier * 0.25;
    const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
    (async () => {
      for (let step = 10; step <= 100; step += 10) {
        await wait(pause);
        while (!cancelled && real.current < step) await wait(80);
        if (cancelled) return;
        setShown(step);
        await animate(progress, step, { duration: (palier - pause) / 1000, ease: [0.42, 0, 0.58, 1] });
      }
      if (cancelled) return;
      setPhase("hold");
      await wait(1200);
      if (!cancelled) setPhase("open1");
      await wait(1300);
      if (!cancelled) setPhase("open2");
      await wait(1500);
      if (!cancelled) setPhase("fade");
    })();
    return () => {
      cancelled = true;
    };
  }, [show, reduce, progress]);

  // Retrait du DOM après le fondu final
  useEffect(() => {
    if (phase !== "fade") return;
    const id = window.setTimeout(() => setPhase("done"), reduce ? 200 : 900);
    return () => window.clearTimeout(id);
  }, [phase, reduce]);

  // Verrouille le défilement pendant l'affichage
  useEffect(() => {
    if (!show || phase === "done") return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [show, phase]);

  if (!show || phase === "done") return null;

  const ringScale = phase === "open1" ? 2.6 : phase === "open2" || phase === "fade" ? 9 : 1;
  const opening = phase === "open1" || phase === "open2" || phase === "fade";
  const label = t(statusKey(shown));

  return (
    <motion.div
      className="fixed inset-0 z-60 overflow-hidden"
      role="progressbar"
      aria-label={t("label")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={shown}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.7, 0, 0.84, 0] }}
    >
      {/* Voile : dégradé radial bleu nuit, passe à 55 % pendant l'ouverture */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primitive-navy-800)_0%,var(--primitive-navy-900)_50%,var(--primitive-navy-950)_100%)]"
        animate={{ opacity: opening ? (phase === "open1" ? 0.55 : 0) : 1 }}
        transition={{
          duration: phase === "open1" ? 1.3 : 1.5,
          ease: phase === "open1" ? [0.42, 0, 0.58, 1] : "easeOut",
        }}
      />
      {/* Trame technique 80 px */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(var(--color-accent-cyan)_1px,transparent_1px),linear-gradient(90deg,var(--color-accent-cyan)_1px,transparent_1px)] bg-size-[80px_80px] opacity-[0.015]"
        animate={{ opacity: opening ? 0 : 0.015 }}
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-24 px-20">
        {!reduce && (
          <motion.div
            aria-hidden
            className="relative size-200 tablet:size-[17.5rem]"
            animate={{ scale: ringScale, opacity: phase === "open2" || phase === "fade" ? 0 : 1 }}
            transition={{
              duration: phase === "open1" ? 1.3 : 1.5,
              ease: phase === "open1" ? [0.42, 0, 0.58, 1] : "easeOut",
            }}
          >
            <svg viewBox="0 0 280 280" className="absolute inset-0 -rotate-90">
              <circle cx="140" cy="140" r={R} fill="none" strokeWidth="4" className="stroke-inverse-hover" />
              <motion.circle
                cx="140"
                cy="140"
                r={R}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={C}
                style={{ strokeDashoffset: dashOffset }}
                className="stroke-accent-cyan"
              />
            </svg>
            <Image
              src="/brand/ziiiilo-symbole.svg"
              alt=""
              width={110}
              height={110}
              unoptimized
              className="absolute inset-0 m-auto w-[39%] opacity-25"
            />
          </motion.div>
        )}

        <motion.div
          className="flex flex-col items-center gap-12"
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {!reduce && (
            <p
              aria-hidden
              className="font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none font-semibold text-text-inverse tabular-nums"
            >
              {shown} %
            </p>
          )}
          <p
            aria-live="polite"
            className={
              shown === 100
                ? "text-accent-cyan text-label-l"
                : "font-medium text-text-inverse-muted text-body-m"
            }
          >
            {label}
          </p>
          {!reduce && (
            <div
              aria-hidden
              className="mt-8 h-3 w-[min(22.5rem,80vw)] overflow-hidden rounded-xs bg-inverse-hover"
            >
              <motion.div className="h-full origin-left bg-accent-cyan" style={{ scaleX: barScale }} />
            </div>
          )}
          <Image
            src="/brand/ziiiilo-logo-blanc.svg"
            alt=""
            aria-hidden
            width={120}
            height={60}
            unoptimized
            className="mt-24 opacity-35"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
