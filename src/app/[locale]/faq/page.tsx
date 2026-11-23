import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/text";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Interactive";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faq.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/faq" });
}

type Item = { q: string; a: string };

/**
 * FAQ — Figma 19:4431 (desktop), 25:3959 (mobile), 380:5285 (tablette).
 * Desktop : encart « Une autre question ? » à gauche, accordéons à droite (première question
 * ouverte) ; mobile : accordéons puis encart. JSON-LD FAQPage avec les mêmes textes.
 */
export default async function FaqPage() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as Item[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        eyebrow={t("header.eyebrow")}
        title={t("header.title")}
        lead={t("header.lead")}
        leadShort={t("header.leadShort")}
      />

      <section aria-label={t("listLabel")} className="pt-32 pb-64 tablet:pt-80 tablet:pb-0 desktop:pt-120">
        <div className="container flex flex-col gap-20 desktop:flex-row desktop:items-start desktop:gap-64">
          <Reveal className="order-2 desktop:sticky desktop:top-[calc(var(--header-height)+var(--space-32))] desktop:order-1 desktop:w-[21rem] desktop:shrink-0">
            <aside className="flex flex-col gap-12 rounded-xl bg-background-inverse p-24 tablet:gap-16 tablet:p-32">
              <h2 className="text-h4 text-text-inverse">{t("help.title")}</h2>
              <p className="text-text-inverse-muted text-body-s">
                <span className="max-tablet:hidden">{t("help.text")}</span>
                <span className="tablet:hidden">{t("help.textShort")}</span>
              </p>
              <Button href="/contact" className="max-tablet:w-full tablet:w-fit">
                {t("help.cta")}
              </Button>
            </aside>
          </Reveal>

          <Reveal delay={100} className="order-1 min-w-0 flex-1 desktop:order-2">
            <Accordion
              size="L"
              headingLevel={2}
              items={items.map((item, i) => ({ id: `q${i + 1}`, question: item.q, answer: item.a }))}
            />
          </Reveal>
        </div>
      </section>

      <div className="max-tablet:hidden">
        <CtaSection
          title={t("cta.title")}
          description={t("cta.description")}
          primary={{ label: t("cta.primary"), href: "/contact" }}
          secondary={{ label: t("cta.secondary"), href: "/services" }}
        />
      </div>
    </>
  );
}
