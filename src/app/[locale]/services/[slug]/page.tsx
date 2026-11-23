import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { StepTimeline } from "@/components/cards/StepTimeline";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/motion/text";
import { SERVICE_VISUAL } from "@/components/sections/services/data";
import { DETAIL_ICONS } from "@/components/sections/services/detail-icons";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Interactive";
import { Breadcrumb } from "@/components/ui/Misc";
import { getService, getServicesWithDetail } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
type Item = { title: string; text: string };
type Faq = { question: string; answer: string };

/**
 * Les 8 slugs sont prérendus ; la page lit `params` hors <Suspense> pour répondre en vrai 404
 * aux adresses inconnues (Cache Components : `dynamicParams` n'existe plus).
 */
export const instant = false;

export function generateStaticParams() {
  return getServicesWithDetail().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getService(slug)) return {};
  const t = await getTranslations(`serviceDetail.items.${slug}`);
  return buildMetadata({
    title: t("title"),
    description: t("lead"),
    href: { pathname: "/services/[slug]", params: { slug } },
  });
}

/**
 * Détail service — gabarit Figma 13:2161 (Applications mobiles) décliné pour les 8 services
 * (68:6024 … 70:8772), mobile 23:1975. En-tête + visuel → situations → réalisations (fond sombre)
 * → bénéfices → démarche en 5 étapes → questions fréquentes → CTA.
 */
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getService(slug)) notFound();

  const t = await getTranslations("serviceDetail");
  const a11y = await getTranslations("a11y");
  const key = `items.${slug}` as const;
  const icons = DETAIL_ICONS[slug];
  const needs = t.raw(`${key}.needs`) as Item[];
  const deliver = t.raw(`${key}.deliver`) as Item[];
  const benefits = t.raw(`${key}.benefits`) as string[];
  const steps = (t.raw(`${key}.steps`) as Item[]).map((s, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: s.title,
    text: s.text,
  }));
  const faq = (t.raw(`${key}.faq`) as Faq[]).map((f, i) => ({
    id: `q${i + 1}`,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      <ReadingProgress />
      <PageHeader
        breadcrumb={
          <Breadcrumb
            label={a11y("breadcrumb")}
            items={[
              { label: t("crumbHome"), href: "/" },
              { label: t("crumbServices"), href: "/services" },
              { label: t(`${key}.crumb`) },
            ]}
          />
        }
        eyebrow={t("eyebrow")}
        title={t(`${key}.title`)}
        lead={t(`${key}.lead`)}
        aside={
          <Image
            src={SERVICE_VISUAL(slug)}
            alt=""
            width={1040}
            height={800}
            priority
            sizes="(min-width: 75rem) 520px, 100vw"
            className="aspect-[520/400] w-full rounded-xl"
          />
        }
      >
        <div className="flex flex-col items-center gap-8 pt-4 tablet:flex-row">
          <Button href={{ pathname: "/contact", query: { service: slug } }} block className="tablet:w-auto">
            {t("quote")}
          </Button>
          <Button href="/contact" variant="ghost">
            {t("talk")}
          </Button>
        </div>
      </PageHeader>

      {/* Le besoin */}
      <section aria-labelledby="besoin-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-56">
          <SectionHeader
            id="besoin-title"
            eyebrow={t("needsEyebrow")}
            title={t("needsTitle")}
            description={t(`${key}.needsDescription`)}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-32 tablet:grid-cols-3 tablet:gap-24 desktop:gap-40">
            {needs.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100}>
                <FeatureItem icon={icons.needs[i]} title={item.title} text={item.text} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ce que nous réalisons */}
      <section
        aria-labelledby="realisons-title"
        className="bg-background-inverse py-64 text-text-inverse desktop:py-96"
      >
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="realisons-title"
            theme="dark"
            eyebrow={t("deliverEyebrow")}
            title={t(`${key}.deliverTitle`)}
            description={t(`${key}.deliverDescription`)}
            descriptionClassName="hidden tablet:block"
          />
          <ul className="grid gap-16 tablet:grid-cols-2 tablet:gap-24 desktop:grid-cols-4">
            {deliver.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100} className="flex">
                <FeatureItem
                  theme="dark"
                  glass
                  icon={icons.deliver[i]}
                  title={item.title}
                  text={item.text}
                  className="w-full"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Vos bénéfices */}
      <section aria-labelledby="benefices-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:flex-row desktop:items-start desktop:gap-72">
          <SectionHeader
            id="benefices-title"
            eyebrow={t("benefitsEyebrow")}
            title={t(`${key}.benefitsTitle`)}
            description={t(`${key}.benefitsDescription`)}
            descriptionClassName="hidden tablet:block"
            className="desktop:w-[30rem] desktop:shrink-0"
          />
          <ul className="flex flex-1 flex-col gap-12 tablet:gap-16">
            {benefits.map((benefit, i) => (
              <Reveal
                as="li"
                key={benefit}
                delay={i * 80}
                className="flex items-center gap-16 rounded-lg border border-border-default bg-background-subtle px-20 py-20 text-text-primary text-body-s tablet:font-medium tablet:text-body-m"
              >
                <span
                  aria-hidden
                  className="flex size-28 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-default"
                >
                  <Check size={16} strokeWidth={2} />
                </span>
                {benefit}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Notre démarche */}
      <section aria-labelledby="demarche-title" className="bg-background-subtle py-64 desktop:py-96">
        <div className="container flex flex-col gap-32 desktop:gap-56">
          <SectionHeader
            id="demarche-title"
            align="center"
            eyebrow={t("methodEyebrow")}
            title={t("methodTitle")}
            circuit
            className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
          />
          <StepTimeline steps={steps} />
        </div>
      </section>

      {/* Questions fréquentes */}
      <section aria-labelledby="faq-title" className="py-64 desktop:py-120">
        <div className="container flex flex-col gap-32 desktop:gap-48">
          <SectionHeader
            id="faq-title"
            align="center"
            eyebrow={t("faqEyebrow")}
            title={t("faqTitle")}
            className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
          />
          <Accordion items={faq} className="mx-auto w-full max-w-[50rem]" />
        </div>
      </section>

      <CtaSection
        title={t(`${key}.ctaTitle`)}
        description={t("ctaDescription")}
        primary={{ label: t("ctaPrimary"), href: "/contact" }}
        secondary={{ label: t("ctaSecondary"), href: "/services" }}
      />
    </>
  );
}
