"use client";

import { ArrowUp, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/* ——— 02 · Barre de lecture : 3 px, dégradé cyan → bleu, sans transition (rAF) ——— */
export function ReadingProgress() {
  const t = useTranslations("a11y");
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden title={t("readingProgress")} className="fixed inset-x-0 top-0 z-50 h-3">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-(image:--gradient-reading)" />
    </div>
  );
}

/** Suit la sortie de l'écran du premier `#hero` et l'arrivée du pied de page. */
function useScrollState() {
  const [past, setPast] = useState({ screen: false, hero: false, footer: false });
  const pathname = usePathname();
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const footer = document.querySelector("footer");
    let heroOut = !hero;
    let footerIn = false;
    const sync = () =>
      setPast({ screen: window.scrollY > window.innerHeight, hero: heroOut, footer: footerIn });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroOut = !e.isIntersecting;
        if (e.target === footer) footerIn = e.isIntersecting;
      }
      sync();
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sync);
    };
  }, [pathname]);
  return past;
}

/** Pages où le bouton d'appel flottant apparaît (§8 n° 11). */
const CALL_PAGES = ["/", "/services", "/realisations", "/contact"];

/* ——— 03 · Haut de page + 11 · Bouton d'appel flottant (mobile et tablette) ——— */
export function FloatingActions() {
  const t = useTranslations("a11y");
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { screen, hero, footer } = useScrollState();
  const ring = useRef<SVGCircleElement>(null);
  const showCall = CALL_PAGES.includes(pathname) && hero && !footer;
  const [keyboard, setKeyboard] = useState(false);

  // Masquer le bouton d'appel quand le clavier virtuel est ouvert
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKeyboard(vv.height < window.innerHeight * 0.75);
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  // Anneau de progression du bouton « haut de page »
  useEffect(() => {
    const C = 2 * Math.PI * 22;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const anim = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 16 } };

  return (
    <div className="pointer-events-none fixed right-16 bottom-[calc(var(--space-16)+env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-12">
      <AnimatePresence>
        {screen && (
          <motion.button
            key="top"
            type="button"
            {...anim}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            aria-label={t("backToTop")}
            className="pointer-events-auto relative flex size-48 items-center justify-center rounded-full bg-surface-default text-text-primary shadow-md"
          >
            <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
              <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-border-default" />
              <circle
                ref={ring}
                cx="24"
                cy="24"
                r="22"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 22}
                className="stroke-primary-brand"
              />
            </svg>
            <ArrowUp size={20} strokeWidth={1.75} />
          </motion.button>
        )}
        {showCall && !keyboard && (
          <motion.a
            key="call"
            href={site.contact.phoneHref}
            {...anim}
            transition={{ duration: 0.25, ease: "easeOut" }}
            aria-label={`${t("call")} — ${site.contact.phone}`}
            className={cn(
              "call-fab-pulse pointer-events-auto flex size-56 items-center justify-center rounded-full bg-primary-default text-text-inverse shadow-lg desktop:hidden",
            )}
          >
            <Phone aria-hidden size={24} strokeWidth={1.75} />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
