"use client";

import { useTranslations } from "next-intl";
import { createContext, useContext, useState, type ReactNode } from "react";
import { FilterChip } from "@/components/ui/Interactive";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

/** Groupes de statut du catalogue (Figma 14:2255) : filtres et légende. */
export type CatalogueGroup = "commercialises" | "en-developpement";
const FILTERS = ["tous", "commercialises", "en-developpement"] as const;
type Filter = (typeof FILTERS)[number];

type Ctx = { filter: Filter; visible: Record<CatalogueGroup, number> };
const CatalogueContext = createContext<Ctx>({
  filter: "tous",
  visible: { commercialises: 0, "en-developpement": 0 },
});

/**
 * Catalogue des produits ZIIIILO — Figma 14:2254 (mobile 24:1962). Filtres « Tous les produits /
 * Commercialisés / En développement » (`aria-pressed`), légende des statuts, nombre de produits
 * annoncé aux lecteurs d'écran, message si un filtre ne donne rien.
 * `counts` = nombre de produits par groupe (données de realisations.ts).
 */
export function Catalogue({
  counts,
  children,
}: {
  counts: Record<CatalogueGroup, number>;
  children: ReactNode;
}) {
  const t = useTranslations("solutions.catalogue");
  const [filter, setFilter] = useState<Filter>("tous");
  const shown = filter === "tous" ? counts.commercialises + counts["en-developpement"] : counts[filter];

  return (
    <CatalogueContext.Provider value={{ filter, visible: counts }}>
      <div className="flex flex-col gap-24 tablet:flex-row tablet:items-center tablet:justify-between">
        <div
          role="group"
          aria-label={t("filtersLabel")}
          className="scrollbar-none flex gap-8 overflow-x-auto max-tablet:-mx-(--container-gutter) max-tablet:px-(--container-gutter) tablet:gap-10"
        >
          {FILTERS.map((key) => (
            <FilterChip key={key} pressed={filter === key} onClick={() => setFilter(key)}>
              {t(`filters.${key}`)}
            </FilterChip>
          ))}
        </div>
        <div className="hidden flex-wrap items-center gap-12 tablet:flex">
          <span className="text-text-secondary text-body-s">{t("legend")}</span>
          <StatusBadge tone="available">{t("legendItems.commercialise")}</StatusBadge>
          <StatusBadge tone="development">{t("legendItems.en-developpement")}</StatusBadge>
          <StatusBadge tone="neutral">{t("legendItems.a-venir")}</StatusBadge>
        </div>
      </div>
      <p role="status" className="sr-only">
        {t("count", { count: shown })}
      </p>
      {shown === 0 && (
        <p className="rounded-lg border border-border-default bg-background-subtle p-24 text-center text-text-secondary text-body-m">
          {t("empty")}
        </p>
      )}
      {children}
    </CatalogueContext.Provider>
  );
}

/** Élément filtrable du catalogue : masqué (display none) quand le filtre l'exclut. */
export function CatalogueItem({
  group,
  as: Tag = "div",
  className,
  children,
}: {
  group: CatalogueGroup;
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
}) {
  const { filter } = useContext(CatalogueContext);
  const hidden = filter !== "tous" && filter !== group;
  return (
    <Tag hidden={hidden} className={cn(hidden && "hidden", className)}>
      {children}
    </Tag>
  );
}

/** Bloc masqué quand aucun produit du filtre courant n'y figure (titre « Tous nos produits »). */
export function CatalogueGroupVisible({ children }: { children: ReactNode }) {
  const { filter, visible } = useContext(CatalogueContext);
  const count = filter === "tous" ? visible.commercialises + visible["en-developpement"] : visible[filter];
  return count === 0 ? null : <>{children}</>;
}
