"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sommaire des pages juridiques (« Sur cette page ») : liens d'ancre, entrée de la section
 * lue mise en évidence (`aria-current`). Fixe au défilement en desktop (§10 pages légales).
 */
export function LegalToc({
  title,
  items,
}: {
  title: string;
  items: readonly { id: string; title: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-labelledby="legal-toc-title"
      className="flex flex-col gap-12 rounded-lg border border-border-default bg-background-subtle p-20 tablet:p-24"
    >
      <h2 id="legal-toc-title" className="text-overline text-text-secondary">
        {title}
      </h2>
      <ol className="flex flex-col gap-4">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={cn(
                  "block rounded-sm py-4 transition-colors duration-150 ease-ui text-body-s hover:text-primary-default focus-visible:shadow-focus",
                  current ? "text-primary-default" : "text-text-secondary",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
