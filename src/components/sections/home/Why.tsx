import { Eye, Puzzle, SlidersHorizontal, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { SectionHeader } from "@/components/layout/SectionHeader";

/** Six principes, icônes Figma (12:702). */
const PRINCIPES: readonly { key: string; icon: LucideIcon }[] = [
  { key: "besoins", icon: Target },
  { key: "mesure", icon: Puzzle },
  { key: "vision", icon: Eye },
  { key: "technologies", icon: SlidersHorizontal },
  { key: "collaboration", icon: Users },
  { key: "evolutive", icon: TrendingUp },
];

/** Section — Pourquoi ZIIIILO (Figma 12:692 desktop : en-tête à gauche + grille 2 × 3 ; 22:650 mobile). */
export async function HomeWhy() {
  const t = await getTranslations("home.why");
  return (
    <section aria-labelledby="why-title" className="py-64 desktop:py-120">
      <div className="container flex flex-col gap-32 desktop:flex-row desktop:gap-72">
        <SectionHeader
          id="why-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          descriptionClassName="hidden tablet:block"
          className="desktop:sticky desktop:top-[calc(var(--header-height)+var(--space-40))] desktop:w-[24rem] desktop:shrink-0 desktop:self-start"
        />
        <ul className="grid flex-1 gap-24 tablet:grid-cols-2 tablet:gap-40">
          {PRINCIPES.map(({ key, icon }) => (
            <li key={key}>
              <FeatureItem
                icon={icon}
                title={t(`items.${key}.title`)}
                text={t(`items.${key}.text`)}
                layout="responsive"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
