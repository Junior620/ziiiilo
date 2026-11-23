import { getTranslations } from "next-intl/server";
import { StepTimeline } from "@/components/cards/StepTimeline";
import { SectionHeader } from "@/components/layout/SectionHeader";

const NUMEROS = ["01", "02", "03", "04", "05"] as const;

/**
 * Section — Notre méthode (Figma 12:771 desktop, 22:729 mobile) : soulignement circuit sous
 * le titre (§8 v1.3), frise de 5 étapes (§8 n° 08). Ancre réutilisée par À propos (#methode).
 */
export async function HomeMethod() {
  const t = await getTranslations("home.method");
  const steps = NUMEROS.map((number) => ({
    number,
    title: t(`steps.${number}.title`),
    text: t(`steps.${number}.text`),
  }));
  return (
    <section aria-labelledby="method-title" className="bg-background-subtle py-64 desktop:py-120">
      <div className="container flex flex-col gap-32 desktop:gap-64">
        <SectionHeader
          id="method-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          descriptionClassName="hidden tablet:block"
          circuit
        />
        <StepTimeline steps={steps} />
      </div>
    </section>
  );
}
