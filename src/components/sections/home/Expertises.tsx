import { Globe, Layers, PenTool, RefreshCw, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ServiceCard, ServiceRow } from "@/components/cards/ServiceCard";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";

/** Six expertises de l'accueil, dans l'ordre Figma (11:287), reliées à leur page de détail. */
const EXPERTISES: readonly { slug: string; icon: LucideIcon }[] = [
  { slug: "sites-web", icon: Globe },
  { slug: "applications-mobiles", icon: Smartphone },
  { slug: "logiciels-sur-mesure", icon: Layers },
  { slug: "transformation-digitale", icon: RefreshCw },
  { slug: "ui-ux-design", icon: PenTool },
  { slug: "automatisation-integration", icon: Workflow },
];

/** Section — Nos expertises (Figma 11:287 desktop : grille 3 × 2 ; 22:185 mobile : liste). */
export async function HomeExpertises() {
  const t = await getTranslations("home.expertises");
  return (
    <section aria-labelledby="expertises-title" className="bg-background-subtle py-64 desktop:py-120">
      <div className="container flex flex-col gap-32 desktop:gap-64">
        <SectionHeader
          id="expertises-title"
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          descriptionClassName="hidden tablet:block"
          className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
        />

        <ul className="flex flex-col gap-10 tablet:hidden">
          {EXPERTISES.map(({ slug, icon }) => (
            <li key={slug}>
              <ServiceRow
                icon={icon}
                title={t(`items.${slug}.titleShort`)}
                description={t(`items.${slug}.short`)}
                href={{ pathname: "/services/[slug]", params: { slug } }}
              />
            </li>
          ))}
        </ul>

        <ul className="hidden gap-24 tablet:grid tablet:grid-cols-2 desktop:grid-cols-3">
          {EXPERTISES.map(({ slug, icon }) => (
            <li key={slug} className="flex">
              <ServiceCard
                icon={icon}
                title={t(`items.${slug}.title`)}
                description={t(`items.${slug}.text`)}
                href={{ pathname: "/services/[slug]", params: { slug } }}
                linkLabel={t("linkLabel")}
                className="w-full"
              />
            </li>
          ))}
        </ul>

        <Button href="/services" variant="secondary" className="w-full tablet:mx-auto tablet:w-auto">
          {t("all")}
        </Button>
      </div>
    </section>
  );
}
