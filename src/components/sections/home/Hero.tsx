"use client";

import { Globe, Layers, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { HeroVisual } from "@/components/brand/HeroVisual";
import { TechMarquee } from "@/components/motion/effects";
import { DecodeText, RevealLines } from "@/components/motion/text";
import { useSplashDone } from "@/components/splash/useSplashDone";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Bandeau des technologies (Figma 407:699, §8 n° 18), dans l'ordre de la maquette. */
const TECHNOLOGIES = [
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Sanity",
  "n8n",
  "OpenAI",
  "Mapbox",
  "Google Earth Engine",
  "Sentinel-2",
  "AWS Textract",
  "Resend",
] as const;

/**
 * Section — Hero de l'accueil (Figma 11:3 desktop, 22:3 mobile, 77:7514 tablette).
 * Chorégraphie §8 : badge 0,05 s, visuel 0,25 s (desktop) / 1,9 s (mobile), décodage du H1
 * de 0,3 à 1,92 s, sous-titre ligne par ligne à 1,35 s, boutons à 1,7 s, repères 2,0 / 2,1 / 2,2 s,
 * curseur ensuite. Tout attend l'ouverture du splash quand il est affiché.
 */
export function HomeHero() {
  const t = useTranslations("home.hero");
  const ready = useSplashDone();

  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-(image:--gradient-hero) pt-[calc(var(--header-height)+var(--space-8))] pb-56 text-text-inverse desktop:pt-[calc(var(--header-height)+var(--space-40))] desktop:pb-40"
    >
      {/* Trame et halo (11:5, 11:4) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid-in absolute inset-0 hidden bg-[linear-gradient(var(--color-glass-inverse)_1px,transparent_1px),linear-gradient(90deg,var(--color-glass-inverse)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)] bg-size-[80px_80px] desktop:block" />
        <div className="absolute top-[-10%] right-[-20%] size-720 rounded-full bg-[radial-gradient(circle,var(--color-primary-brand)_0%,transparent_60%)] opacity-20" />
      </div>

      <div className="container grid items-center gap-28 desktop:grid-cols-[minmax(0,37.5rem)_minmax(0,1fr)] desktop:gap-40">
        <div className="flex flex-col items-start gap-20 desktop:gap-32">
          <StatusBadge tone="dark" className="hero-in hero-in--badge">
            <span className="tablet:hidden">{t("badgeShort")}</span>
            <span className="hidden tablet:inline">{t("badge")}</span>
          </StatusBadge>

          <div className="flex flex-col gap-20 desktop:gap-24">
            <DecodeText
              id="hero-title"
              text={t("title")}
              start={ready}
              delay={300}
              duration={1400}
              lag={220}
              className="text-display-xl text-text-inverse"
            />
            <RevealLines
              text={t("subtitle")}
              preset="hero-sub"
              trigger={ready}
              className="max-w-[36rem] text-body-xl text-text-inverse-muted"
            />
          </div>

          <div className="flex w-full flex-col gap-12 tablet:w-auto tablet:flex-row">
            <Button
              href="/contact"
              variant="inverse"
              glow
              className="hero-in hero-in--action-1 w-full tablet:w-auto"
            >
              {t("primary")}
            </Button>
            <Button
              href="/solutions"
              variant="inverse-outline"
              icon={null}
              className="hero-in hero-in--action-2 w-full tablet:w-auto"
            >
              {t("secondary")}
            </Button>
          </div>

          <ul className="hidden flex-wrap gap-x-28 gap-y-12 pt-8 tablet:flex">
            {(
              [
                [Globe, "web"],
                [Layers, "software"],
                [LayoutDashboard, "saas"],
              ] as const
            ).map(([Icon, key], i) => (
              <li
                key={key}
                className={`hero-in hero-in--marker-${i + 1} flex items-center gap-8 font-medium text-text-inverse-muted text-body-s`}
              >
                <Icon aria-hidden size={18} strokeWidth={1.75} className="text-accent-cyan" />
                {t(`markers.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in hero-in--visual mx-auto w-full max-w-[22rem] tablet:max-w-[30rem] desktop:mx-0 desktop:w-620 desktop:max-w-none">
          <HeroVisual />
        </div>
      </div>

      <ScrollCue label={t("scroll")} />

      <div className="hero-in hero-in--scroll mt-40 desktop:mt-24">
        <TechMarquee items={TECHNOLOGIES} label={t("techLabel")} />
      </div>
    </section>
  );
}

/** Effet/Indicateur de défilement (407:830, §8 n° 15) : desktop, disparaît au premier défilement. */
function ScrollCue({ label }: { label: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      data-hidden={hidden}
      className="scroll-cue mx-auto mt-32 hidden w-fit flex-col items-center gap-8 transition-opacity duration-300 desktop:flex"
    >
      <span className="flex h-48 w-30 justify-center rounded-full border-(length:--border-strong) border-inverse-outline pt-8">
        <span className="scroll-cue-dot h-8 w-4 rounded-full bg-accent-cyan" />
      </span>
      <span className="text-text-inverse-muted text-label-s">{label}</span>
    </div>
  );
}
