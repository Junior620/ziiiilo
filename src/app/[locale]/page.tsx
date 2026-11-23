import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { HomeExpertises } from "@/components/sections/home/Expertises";
import { HomeHero } from "@/components/sections/home/Hero";
import { HomeMethod } from "@/components/sections/home/Method";
import { HomePresentation } from "@/components/sections/home/Presentation";
import { HomeRealisations } from "@/components/sections/home/Realisations";
import { HomeWhy } from "@/components/sections/home/Why";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const hero = await getTranslations("home.hero");
  return buildMetadata({
    title: { absolute: t("defaultTitle") },
    description: t("defaultDescription"),
    href: "/",
    // Titre fort des aperçus de partage : le titre du hero (Figma 11:2).
    shareTitle: `${hero("title").replace(/\.$/, "")} — ${t("siteName")}`,
  });
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
