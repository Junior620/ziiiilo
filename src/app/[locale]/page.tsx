import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { HomeExpertises } from "@/components/sections/home/Expertises";
import { HomeHero } from "@/components/sections/home/Hero";
import { HomeMethod } from "@/components/sections/home/Method";
import { HomePresentation } from "@/components/sections/home/Presentation";
import { HomeRealisations } from "@/components/sections/home/Realisations";
import { HomeWhy } from "@/components/sections/home/Why";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: { absolute: t("defaultTitle") },
    description: t("defaultDescription"),
  };
}

/** Accueil — Figma 11:2 (desktop), 22:2 (mobile), 77:7513 (tablette). Ordre des sections §7. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomePresentation />
      <HomeExpertises />
      <HomeRealisations />
      <HomeWhy />
      <HomeMethod />
      <CtaSection />
    </>
  );
}
