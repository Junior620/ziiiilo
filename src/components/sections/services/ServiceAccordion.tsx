"use client";

import { ChevronDown } from "lucide-react";
import { createContext, use, useCallback, useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Événement émis par l'accès rapide pour ouvrir un service (mobile et tablette). */
export const OPEN_SERVICE_EVENT = "ziiiilo:open-service";

type Ctx = { open: string | null; toggle: (slug: string) => void };
const AccordionCtx = createContext<Ctx | null>(null);

/**
 * Groupe d'accordéons de la page Services (mobile 23:760, tablette 378:2099) : un seul service
 * ouvert à la fois, le premier ouvert au départ ; s'ouvre aussi depuis l'ancre de l'adresse.
 */
export function ServiceAccordionGroup({ initial, children }: { initial: string; children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(initial);

  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (slug) setOpen(slug);
    };
    const onOpen = (e: Event) => setOpen((e as CustomEvent<string>).detail);
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(OPEN_SERVICE_EVENT, onOpen);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(OPEN_SERVICE_EVENT, onOpen);
    };
  }, []);

  const toggle = useCallback((slug: string) => setOpen((cur) => (cur === slug ? null : slug)), []);
  const value = useMemo(() => ({ open, toggle }), [open, toggle]);
  return <AccordionCtx value={value}>{children}</AccordionCtx>;
}

/**
 * Accordéon/Service — Figma 66:798. En-tête : pastille, « SERVICE 0N », titre, chevron ;
 * `button[aria-expanded]` + région. Ouvert : bordure bleue et ombre.
 */
export function ServiceAccordion({
  slug,
  icon,
  overline,
  title,
  className,
  children,
}: {
  slug: string;
  /** Pastille déjà rendue (les composants d'icône ne passent pas la frontière serveur/client). */
  icon: ReactNode;
  overline: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  const ctx = use(AccordionCtx);
  const isOpen = ctx?.open === slug;
  const id = useId();
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <article
      className={cn(
        "rounded-lg border bg-surface-default p-20 transition-[border-color,box-shadow] duration-200 ease-ui tablet:p-24",
        isOpen ? "border-primary-brand shadow-md" : "border-border-default shadow-xs",
        className,
      )}
    >
      <h2>
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => ctx?.toggle(slug)}
          className="flex w-full items-center gap-14 rounded-md text-left"
        >
          {icon}
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-overline text-primary-default">{overline}</span>
            <span className="text-h4 text-text-primary">{title}</span>
          </span>
          <ChevronDown
            aria-hidden
            size={24}
            strokeWidth={1.75}
            className={cn(
              "shrink-0 text-text-secondary transition-transform duration-(--duration-accordion) ease-ui",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={cn(
          "grid transition-[grid-template-rows] duration-(--duration-accordion) ease-ui",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <div className="flex flex-col gap-20 pt-20">
            <span aria-hidden className="h-px w-full bg-border-default" />
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
