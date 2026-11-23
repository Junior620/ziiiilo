"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { BrandMark } from "@/components/ui/Misc";
import { CircuitUnderline, RevealLines, RevealScan, TypeLine } from "@/components/motion/text";
import { cn } from "@/lib/cn";

/**
 * En-tête de section — Figma 6:220 (Alignement Gauche / Centré × Thème Clair / Sombre).
 * Animations (§8 v1.3) : surtitre tapé 0,5 s ; titre ligne par ligne dès 0,35 s ;
 * description à 0,8 s ; balayage lumineux du titre sur fond sombre (1,3 s).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  as: Heading = "h2",
  titleClassName,
  descriptionClassName,
  circuit = false,
  className,
  id,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  as?: "h1" | "h2";
  titleClassName?: string;
  /** Ex. `hidden tablet:block` : description absente de la maquette mobile. */
  descriptionClassName?: string;
  /** Soulignement circuit sous le titre (Notre méthode, Notre démarche — 52:174). */
  circuit?: boolean;
  className?: string;
  /** id du titre (aria-labelledby de la section). */
  id?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const dark = theme === "dark";
  return (
    <div
      ref={ref}
      className={cn(
        "flex max-w-720 flex-col gap-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <p className="inline-flex items-center gap-10">
          <BrandMark />
          <TypeLine
            text={eyebrow}
            inViewRef={inView}
            className={cn("text-overline", dark ? "text-text-accent-on-dark" : "text-primary-default")}
          />
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          Heading === "h1" ? "text-h1" : "text-h2",
          dark ? "text-text-inverse" : "text-text-primary",
          titleClassName,
        )}
      >
        {dark ? (
          <RevealScan text={title} preset="h2" trigger={inView} scanAt={1300} />
        ) : (
          <RevealLines as="span" text={title} preset="h2" trigger={inView} />
        )}
      </Heading>
      {circuit && <CircuitUnderline className={align === "center" ? "mx-auto" : undefined} />}
      {description && (
        <RevealLines
          text={description}
          preset="description"
          trigger={inView}
          className={cn(
            "text-body-l",
            dark ? "text-text-inverse-muted" : "text-text-secondary",
            descriptionClassName,
          )}
        />
      )}
      {children}
    </div>
  );
}
