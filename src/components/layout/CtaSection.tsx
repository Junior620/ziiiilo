"use client";

import { useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, type ComponentProps } from "react";
import { Reveal, RevealLines, RevealScan } from "@/components/motion/text";
import { useLoopPause } from "@/components/motion/effects";
import { Button } from "@/components/ui/Button";
import { RingMotif } from "@/components/ui/RingMotif";
import { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

/**
 * Section CTA — Figma 6:265 (Desktop 6:221 / Mobile 6:243). Fond `--gradient-cta`, anneau,
 * halo qui dérive (§8 n° 20). Animations : titre mot par mot dès 0,2 s, description 0,95 s,
 * boutons 1,2 → 1,6 s, balayage 1,9 s.
 */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: Href };
  secondary?: { label: string; href: Href } | null;
}) {
  const t = useTranslations("cta");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const loopRef = useLoopPause<HTMLDivElement>();
  const p = primary ?? { label: t("primary"), href: "/contact" as Href };
  const s = secondary === null ? null : (secondary ?? { label: t("secondary"), href: "/services" as Href });
  const heading = title ?? t("title");

  return (
    <section aria-label={heading} className="py-64 desktop:py-120">
      <div className="container">
        <div
          ref={ref}
          className="relative isolate overflow-hidden rounded-xl bg-(image:--gradient-cta) px-24 py-48 shadow-cta tablet:px-48 tablet:py-64 desktop:rounded-2xl desktop:px-80 desktop:py-88"
        >
          <div ref={loopRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <span className="cta-halo absolute top-[-20%] left-[10%] size-520 rounded-full bg-[radial-gradient(circle,var(--color-accent-cyan)_0%,transparent_60%)] opacity-20" />
            <RingMotif className="absolute top-[-35%] right-[-45%] size-300 tablet:top-[-40%] tablet:right-[-12%] desktop:size-520" />
          </div>
          <div className="flex flex-col gap-24 tablet:items-center tablet:gap-32 tablet:text-center">
            <h2 className="max-w-[51rem] text-h1 text-text-inverse desktop:text-display-l">
              <RevealScan text={heading} preset="cta" trigger={inView} scanAt={1900} />
            </h2>
            <RevealLines
              text={description ?? t("description")}
              preset="description"
              delay={950}
              trigger={inView}
              className="max-w-[40rem] text-body-l text-text-inverse-muted"
            />
            <Reveal
              trigger={inView}
              delay={1200}
              className="flex flex-col gap-12 tablet:flex-row tablet:justify-center"
            >
              <Button href={p.href} variant="inverse" glow className="w-full tablet:w-auto">
                {p.label}
              </Button>
              {s && (
                <Button href={s.href} variant="inverse-outline" icon={null} className="w-full tablet:w-auto">
                  {s.label}
                </Button>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
