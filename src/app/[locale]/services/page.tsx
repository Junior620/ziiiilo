import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesList } from "@/components/sections/services/ServicesList";
import { ServicesNav } from "@/components/sections/services/ServicesNav";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/services" });
}

/**
 * Services — Figma 13:861 (desktop), 23:760 (mobile), 378:2099 (tablette) : en-tête, accès rapide,
 * 10 services (blocs alternés en desktop, accordéons en mobile) avec leurs exemples, CTA.
 */
export default async function ServicesPage() {
  const t = await getTranslations("services");
  const nav = SERVICES.map(({ slug }) => ({
    slug,
    label: t(`items.${slug}.chip`),
    labelShort: t(`items.${slug}.chipShort`),
  }));

  return (
    <>
      <PageHeader
        eyebrow={t("header.eyebrow")}
        title={t("header.title")}
        lead={t("header.lead")}
        leadShort={t("header.leadShort")}
        className="desktop:pb-80"
      >
        <div className="flex flex-col gap-20 pt-4 desktop:gap-24">
          <div className="flex flex-col gap-12 tablet:flex-row">
            <Button href="/contact" block className="desktop:w-auto">
              {t("header.primary")}
            </Button>
            <Button
              href={{ pathname: "/a-propos", hash: "methode" }}
              variant="secondary"
              className="hidden desktop:inline-flex"
            >
              {t("header.secondary")}
            </Button>
          </div>
          <ServicesNav label={t("nav.label")} items={nav} />
        </div>
      </PageHeader>
      <ServicesList />
      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: { pathname: "/services", hash: SERVICES[0].slug } }}
      />
    </>
  );
}
