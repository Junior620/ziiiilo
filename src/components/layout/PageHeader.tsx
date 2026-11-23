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
  titleShort,
  lead,
  leadShort,
  children,
  align = "left",
  breadcrumb,
  aside,
  ring = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Titre raccourci des maquettes mobile (affiché sous 768 px, un seul H1 visible). */
  titleShort?: string;
  lead?: string;
  /** Chapô raccourci des maquettes mobile et tablette (affiché sous 1200 px). */
  leadShort?: string;
  children?: ReactNode;
  align?: "left" | "center";
  breadcrumb?: ReactNode;
  /** Visuel à droite en desktop, sous le texte en mobile (détail service). */
  aside?: ReactNode;
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
        <RingMotif
          eager
          className="absolute top-[10%] right-[-30%] -z-10 size-300 opacity-20 tablet:right-[-8%] desktop:size-520"
        />
      )}
      <div
        className={cn(
          "container",
          !!aside &&
            "grid gap-40 desktop:grid-cols-[minmax(0,1fr)_32.5rem] desktop:items-center desktop:gap-80",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-20",
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
            className={cn(
              "max-w-[52rem] text-display-l text-text-primary",
              align === "center" && "mx-auto",
              titleShort && "max-tablet:hidden",
            )}
          />
          {titleShort && (
            <RevealLines
              as="h1"
              text={titleShort}
              preset="h2"
              trigger="mount"
              delay={250}
              className="text-display-l text-text-primary tablet:hidden"
            />
          )}
          {lead && (
            <RevealLines
              text={lead}
              preset="description"
              trigger="mount"
              delay={650}
              className={cn(
                "max-w-[45rem] text-body-xl text-text-secondary",
                leadShort && "hidden desktop:block",
              )}
            />
          )}
          {leadShort && (
            <RevealLines
              text={leadShort}
              preset="description"
              trigger="mount"
              delay={650}
              className="max-w-[45rem] text-body-l text-text-secondary desktop:hidden"
            />
          )}
          {children && (
            <Reveal trigger="mount" delay={850} className="w-full">
              {children}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal trigger="mount" delay={500} distance={24}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
