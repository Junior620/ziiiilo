"use client";

import { Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ——— Filtre (4:579) : `aria-pressed`, sélectionné = fond secondary-dark ——— */
export function FilterChip({
  pressed,
  className,
  ...props
}: ComponentProps<"button"> & { pressed: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "inline-flex h-44 shrink-0 items-center rounded-full px-20 whitespace-nowrap text-label-m",
        "transition-colors duration-200 ease-ui",
        pressed
          ? "bg-secondary-dark text-text-inverse"
          : "border border-border-strong bg-surface-default text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

/* ——— Accordéon (10:418) : un seul ouvert à la fois, `button[aria-expanded]` + région ——— */
export type AccordionItem = { id: string; question: ReactNode; answer: ReactNode };

export function Accordion({
  items,
  defaultOpen = 0,
  headingLevel = 3,
  size = "M",
  className,
}: {
  items: readonly AccordionItem[];
  /** Index ouvert au départ (−1 : tous fermés). */
  defaultOpen?: number;
  headingLevel?: 2 | 3 | 4;
  /** L : accordéon FAQ (19:4488) — marge 24, bouton 36 px, réponse Body M. */
  size?: "M" | "L";
  className?: string;
}) {
  const large = size === "L";
  const [open, setOpen] = useState<string | null>(items[defaultOpen]?.id ?? null);
  const base = useId();
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={cn("flex flex-col", large ? "gap-12" : "gap-16", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-lg border border-border-default bg-surface-default transition-shadow duration-200",
              isOpen && "shadow-sm",
              isOpen && large && "border-border-strong",
            )}
          >
            <Heading className="text-h5">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg text-left text-text-primary",
                  large ? "gap-24 p-20 tablet:p-24" : "gap-16 px-20 py-20 tablet:px-24",
                )}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    large ? "size-36" : "size-28",
                    isOpen ? "bg-secondary-dark text-text-inverse" : "bg-background-muted text-text-primary",
                  )}
                >
                  {isOpen ? (
                    <Minus size={large ? 18 : 16} strokeWidth={2} />
                  ) : (
                    <Plus size={large ? 18 : 16} strokeWidth={2} />
                  )}
                </span>
              </button>
            </Heading>
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
                <div
                  className={cn(
                    "px-20 pb-20 text-text-secondary tablet:px-24",
                    large ? "text-body-m tablet:pb-24" : "text-body-s",
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ——— Interrupteur (73:712) : Activé / Désactivé / Verrouillé ——— */
export function Switch({
  checked,
  onChange,
  locked = false,
  label,
  className,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={locked || undefined}
      onClick={() => !locked && onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-24 w-44 shrink-0 items-center rounded-full p-2 transition-colors duration-200 ease-ui",
        checked ? "bg-primary-default" : "bg-border-strong",
        locked && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-20 rounded-full bg-surface-default shadow-sm transition-transform duration-200 ease-ui",
          checked && "translate-x-20",
        )}
      />
    </button>
  );
}

/* ——— Modale (10:443) : voile bleu nuit 60 %, focus piégé, Échap, clic extérieur ——— */
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

export function Dialog({
  open,
  onClose,
  labelledBy,
  closeLabel,
  initialFocus,
  children,
  className,
  widthClass = "max-w-520",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  closeLabel: string;
  /** Élément focalisé à l'ouverture (titre de confirmation, §8 n° 10). */
  initialFocus?: React.RefObject<HTMLElement | null>;
  children: ReactNode;
  className?: string;
  /** Largeur maximale (520 confirmation d'envoi, 560 préférences cookies). */
  widthClass?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    const target = initialFocus?.current ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE);
    target?.focus();
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      returnTo.current?.focus?.();
    };
  }, [open, onKeyDown, initialFocus]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center p-16 tablet:items-center">
      <div aria-hidden className="absolute inset-0 bg-overlay" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "relative max-h-[calc(100dvh-var(--space-32))] w-full overflow-y-auto rounded-2xl bg-surface-default p-24 shadow-lg tablet:p-40",
          widthClass,
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-16 right-16 flex size-40 items-center justify-center rounded-full bg-background-muted text-text-primary hover:bg-border-default"
        >
          <X aria-hidden size={18} strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>
  );
}
