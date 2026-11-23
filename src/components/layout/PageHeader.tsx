"use client";

import type { ReactNode } from "react";
import { Reveal, RevealLines, TypeLine } from "@/components/motion/text";
import { BrandMark } from "@/components/ui/Misc";
import { RingMotif } from "@/components/ui/RingMotif";
import { cn } from "@/lib/cn";

/**
 * En-tête de page intérieure (Services, Solutions, À propos, Réalisations, FAQ, Contact,
 * pages juridiques) : fond `--gradient-page-header`, surtitre tapé, H1 Display L
 * révélé ligne par ligne au montage, chapô. Seul H1 de la page.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  align = "left",
  breadcrumb,
  ring = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  align?: "left" | "center";
  breadcrumb?: ReactNode;
  ring?: boolean;
  className?: string;
}) {
  return (
    <section
      data-hero
      className={cn(
        "relative isolate overflow-hidden bg-(image:--gradient-page-header) pt-[calc(var(--header-height)+var(--space-40))] pb-64 desktop:pt-[calc(var(--header-height)+var(--space-64))] desktop:pb-96",
        className,
      )}
    >
      {ring && (
        <RingMotif className="absolute top-[10%] right-[-30%] -z-10 size-300 opacity-20 tablet:right-[-8%] desktop:size-520" />
      )}
      <div
        className={cn(
          "container flex flex-col gap-20",
          align === "center" ? "items-center text-center" : "items-start",
        )}
      >
        {breadcrumb}
        {eyebrow && (
          <p className="inline-flex items-center gap-10">
            <BrandMark />
            <TypeLine text={eyebrow} inViewRef className="text-overline text-primary-default" />
          </p>
        )}
        <RevealLines
          as="h1"
          text={title}
          preset="h2"
          trigger="mount"
          delay={250}
          className={cn("max-w-[52rem] text-display-l text-text-primary", align === "center" && "mx-auto")}
        />
        {lead && (
          <RevealLines
            text={lead}
            preset="description"
            trigger="mount"
            delay={650}
            className="max-w-[45rem] text-body-xl text-text-secondary"
          />
        )}
        {children && (
          <Reveal trigger="mount" delay={850} className="w-full">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
