import { Compass, Layers } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";

/** Texte desktop / texte mobile repensé (Figma 11:222 / 22:131). */
function Responsive({ desktop, mobile }: { desktop: string; mobile: string }) {
  return (
    <>
      <span className="tablet:hidden">{mobile}</span>
      <span className="hidden tablet:inline">{desktop}</span>
    </>
  );
}

/** Section — Présentation (Figma 11:222 desktop, 22:131 mobile). */
export async function HomePresentation() {
  const t = await getTranslations("home.presentation");
  return (
    <section aria-labelledby="presentation-title" className="py-64 desktop:py-120">
      <div className="container flex flex-col gap-32 desktop:gap-56">
        <div className="flex flex-col gap-16 desktop:flex-row desktop:gap-96">
          <SectionHeader
            id="presentation-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("p1")}
            descriptionClassName="tablet:hidden"
            className="desktop:w-480 desktop:shrink-0"
          />
          <div className="flex flex-col items-start gap-24 text-body-l text-text-secondary">
            <p className="hidden tablet:block">{t("p1")}</p>
            <p>
              <Responsive desktop={t("p2")} mobile={t("p2Short")} />
            </p>
            <Button href="/a-propos" variant="ghost" size="M" className="-ml-22 hidden tablet:inline-flex">
              {t("more")}
            </Button>
          </div>
        </div>
        <div className="grid gap-24 tablet:grid-cols-2">
          <ServiceCard
            icon={Compass}
            tone="blue"
            title={<Responsive desktop={t("services.title")} mobile={t("services.titleShort")} />}
            description={<Responsive desktop={t("services.text")} mobile={t("services.textShort")} />}
            href="/services"
            linkLabel={t("services.link")}
          />
          <ServiceCard
            icon={Layers}
            tone="violet"
            title={<Responsive desktop={t("products.title")} mobile={t("products.titleShort")} />}
            description={<Responsive desktop={t("products.text")} mobile={t("products.textShort")} />}
            href="/solutions"
            linkLabel={t("products.link")}
          />
        </div>
      </div>
    </section>
  );
}
