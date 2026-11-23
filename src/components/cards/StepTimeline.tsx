"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { EASE_SWEEP } from "@/components/motion/text";
import { cn } from "@/lib/cn";

export type Step = { number: string; title: string; text: string };

/**
 * Frise de la méthode — Carte/Étape (Figma 6:325) en disposition Colonne (desktop, 12:781)
 * ou Ligne (mobile, 22:738). §8 n° 08 : à 30 % de visibilité, la liaison se trace (1,2 s)
 * et les étapes s'allument en décalé de 0,24 s. Une seule fois ; état final si mouvement réduit.
 */
export function StepTimeline({ steps, className }: { steps: readonly Step[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const on = inView || !!reduce;
  const n = steps.length;

  return (
    <ol ref={ref} className={cn("grid gap-28 desktop:grid-cols-5 desktop:gap-20", className)}>
      {steps.map((step, i) => {
        const last = i === n - 1;
        const litAt = reduce ? 0 : (i * 1.2) / Math.max(1, n - 1);
        return (
          <li key={step.number} className="relative flex gap-16 desktop:flex-col desktop:gap-20">
            {!last && (
              <>
                {/* Liaison horizontale (desktop) */}
                <motion.span
                  aria-hidden
                  className="absolute top-24 -right-12 left-56 hidden h-2 origin-left -translate-y-1/2 bg-linear-to-r from-primary-brand to-transparent desktop:block"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={on ? { scaleX: 1 } : undefined}
                  transition={{ delay: litAt, duration: 1.2 / Math.max(1, n - 1), ease: EASE_SWEEP }}
                />
                {/* Liaison verticale (mobile, tablette) */}
                <motion.span
                  aria-hidden
                  className="absolute top-56 -bottom-20 left-24 w-2 origin-top -translate-x-1/2 bg-linear-to-b from-primary-brand to-transparent desktop:hidden"
                  initial={{ scaleY: reduce ? 1 : 0 }}
                  animate={on ? { scaleY: 1 } : undefined}
                  transition={{ delay: litAt, duration: 1.2 / Math.max(1, n - 1), ease: EASE_SWEEP }}
                />
              </>
            )}
            <motion.span
              aria-hidden
              className="motion-reveal relative flex size-48 shrink-0 items-center justify-center rounded-full border-(length:--border-strong) bg-surface-default text-primary-default text-label-l"
              initial={
                reduce ? false : { borderColor: "var(--color-border-default)", scale: 0.9, opacity: 0.4 }
              }
              animate={on ? { borderColor: "var(--color-primary-brand)", scale: 1, opacity: 1 } : undefined}
              style={reduce ? { borderColor: "var(--color-primary-brand)" } : undefined}
              transition={{ delay: litAt + 0.05, duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {step.number}
            </motion.span>
            <motion.div
              className="motion-reveal flex min-w-0 flex-col gap-8"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={on ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: litAt + 0.1, duration: 0.45, ease: [0, 0, 0.58, 1] }}
            >
              <h3 className="text-text-primary text-h5">
                <span className="sr-only">{step.number}. </span>
                {step.title}
              </h3>
              <p className="text-text-secondary text-body-s">{step.text}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
