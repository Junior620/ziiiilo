"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/Interactive";
import { FILTRES, isCategorie, type Filtre } from "@/data/realisations";
import { cn } from "@/lib/cn";

type Ctx = { filter: Filtre; matches: (categories: readonly string[]) => boolean };
const FilterContext = createContext<Ctx>({ filter: "tous", matches: () => true });

const PARAM = "categorie";

/**
 * Filtres de la page Réalisations — Figma 17:3900 (mobile 24:3108, rangée défilante).
 * Filtre lu et écrit dans l'URL (`?categorie=`), sans rechargement ; nombre de projets annoncé
 * aux lecteurs d'écran ; état vide (17:4225) seulement si un filtre ne donne aucun projet.
 * `items` = catégories de chaque réalisation publiée (données de realisations.ts).
 */
export function PortfolioFilter({
  items,
  children,
}: {
  items: readonly (readonly string[])[];
  children: ReactNode;
}) {
  const t = useTranslations("realisations");
  const [filter, setFilter] = useState<Filtre>("tous");
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(PARAM);
    // Synchronisation unique avec l'URL partagée (?categorie=…) après l'hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isCategorie(value)) setFilter(value);
  }, []);

  // Rangée défilante (mobile, tablette) : amène le filtre actif dans la rangée, sans faire
  // défiler la page verticalement.
  useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    const left = chip.offsetLeft - row.offsetLeft;
    const right = left + chip.offsetWidth;
    if (left < row.scrollLeft || right > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: Math.max(0, left - (row.clientWidth - chip.offsetWidth) / 2) });
    }
  }, [filter]);

  const choose = (next: Filtre) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "tous") url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next);
    window.history.replaceState(window.history.state, "", url);
  };

  const matches = (categories: readonly string[]) => filter === "tous" || categories.includes(filter);
  const count = items.filter(matches).length;

  return (
    <FilterContext.Provider value={{ filter, matches }}>
      <div
        ref={rowRef}
        role="group"
        aria-label={t("filters.label")}
        className="scrollbar-none flex gap-8 overflow-x-auto max-desktop:-mx-(--container-gutter) max-desktop:px-(--container-gutter) desktop:flex-wrap desktop:gap-10"
      >
        {FILTRES.map((key) => (
          <FilterChip key={key} pressed={filter === key} onClick={() => choose(key)}>
            {t(`filters.${key}`)}
          </FilterChip>
        ))}
      </div>
      <p role="status" className="sr-only">
        {t("count", { count })}
      </p>
      {count === 0 && (
        <div className="flex flex-col items-start gap-20 rounded-xl bg-background-subtle p-24 tablet:flex-row tablet:items-center tablet:gap-24 tablet:p-32">
          <span
            aria-hidden
            className="flex size-60 shrink-0 items-center justify-center rounded-full bg-surface-default text-primary-default"
          >
            <FileText size={26} strokeWidth={1.75} />
          </span>
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-h4 text-text-primary">{t("empty.title")}</p>
            <p className="text-text-secondary text-body-m">{t("empty.text")}</p>
          </div>
          <Button variant="secondary" size="M" icon={null} onClick={() => choose("tous")}>
            {t("empty.reset")}
          </Button>
        </div>
      )}
      {children}
    </FilterContext.Provider>
  );
}

/** Élément filtrable : masqué quand le filtre courant exclut ses catégories. */
export function FilterItem({
  categories,
  as: Tag = "div",
  className,
  children,
}: {
  categories: readonly string[];
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
}) {
  const { matches } = useContext(FilterContext);
  const hidden = !matches(categories);
  return (
    <Tag hidden={hidden} className={cn(hidden && "hidden", className)}>
      {children}
    </Tag>
  );
}

/** Bloc affiché seulement si au moins une des réalisations listées passe le filtre. */
export function FilterGroup({
  items,
  children,
}: {
  items: readonly (readonly string[])[];
  children: ReactNode;
}) {
  const { matches } = useContext(FilterContext);
  return items.some(matches) ? <>{children}</> : null;
}
