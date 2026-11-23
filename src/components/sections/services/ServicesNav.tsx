"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { OPEN_SERVICE_EVENT } from "./ServiceAccordion";

/**
 * Accès rapide aux services (Figma 13:924 desktop, 23:793 mobile) : pastilles-ancres vers chaque
 * service ; la pastille du service visible est mise en avant (fond secondary-dark).
 * Mobile et tablette : rangée défilante ; un clic ouvre aussi l'accordéon du service.
 */
export function ServicesNav({
  label,
  items,
}: {
  label: string;
  items: readonly { slug: string; label: string; labelShort: string }[];
}) {
  const [active, setActive] = useState(items[0]?.slug);
  const row = useRef<HTMLUListElement>(null);

  // Service courant : le dernier dont le haut a passé le milieu de l'écran (le premier sinon)
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => !!el);
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let current = sections[0]?.id;
      for (const s of sections) if (s.getBoundingClientRect().top <= mid) current = s.id;
      if (current) setActive(current);
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
  }, [items]);

  // Garde la pastille active visible dans la rangée défilante, sans faire défiler la page
  useEffect(() => {
    const el = row.current;
    const chip = el?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!el || !chip || el.scrollWidth <= el.clientWidth) return;
    const left = chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const onClick = (slug: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(slug);
    if (!target) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(OPEN_SERVICE_EVENT, { detail: slug }));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    history.replaceState(null, "", `#${slug}`);
    setActive(slug);
  };

  return (
    <nav aria-label={label} className="max-desktop:-mx-(--container-gutter)">
      <ul
        ref={row}
        className="scrollbar-none flex gap-10 overflow-x-auto max-desktop:px-(--container-gutter) desktop:flex-wrap"
      >
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug} data-slug={item.slug} className="shrink-0">
              <a
                href={`#${item.slug}`}
                onClick={onClick(item.slug)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "inline-flex h-44 items-center rounded-full px-20 whitespace-nowrap text-label-m",
                  "transition-colors duration-200 ease-ui",
                  isActive
                    ? "bg-secondary-dark text-text-inverse"
                    : "border border-border-strong bg-surface-default text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
                )}
              >
                <span className="desktop:hidden">{item.labelShort}</span>
                <span className="hidden desktop:inline">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
