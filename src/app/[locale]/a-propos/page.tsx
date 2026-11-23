import { Check, Eye, Lightbulb, Shield, Target, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/motion/text";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { Eyebrow } from "@/components/ui/Misc";
import { RingMotif } from "@/components/ui/RingMotif";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/a-propos" });
}

type Item = { title: string; text: string; short: string };
type ListItem = { label: string; short?: string };

/** Icônes des valeurs (Figma 17:3573) : target, shield, eye, users, lightbulb, trending-up. */
const VALUE_ICONS = [Target, Shield, Eye, Users, Lightbulb, TrendingUp];

/** Texte complet dès la tablette, version courte de la maquette mobile en dessous. */
function Short({ full, short }: { full: string; short?: string }) {
  if (!short) return <>{full}</>;
  return (
    <>
      <span className="max-tablet:hidden">{full}</span>
      <span className="tablet:hidden">{short}</span>
    </>
  );
}

function CheckList({ items }: { items: readonly ListItem[] }) {
  return (
    <ul className="flex flex-col gap-12 tablet:gap-16">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-start gap-12 text-text-primary text-body-s tablet:text-body-m"
        >
          <span
            aria-hidden
            className="flex size-28 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-default max-tablet:size-22"
          >
            <Check size={16} strokeWidth={2} />
          </span>
          <span className="tablet:pt-2">
            <Short full={item.label} short={item.short} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * À propos — Figma 17:3467 (desktop), 25:3157 (mobile), 380:2930 (tablette).
 * Histoire → mission et vision → valeurs → innovation (#methode) → ambitions et manière de
 * travailler → CTA. La section Équipe reste masquée (`features.showTeam`, aucun membre fourni).
 */
export default async function AboutPage() {
  const t = await getTranslations("about");
  const values = t.raw("values.items") as Item[];
  const steps = t.raw("innovation.steps") as Item[];

  return (
    <>
      <PageHeader
        eyebrow={t("header.eyebrow")}
        title={t("header.title")}
        lead={t("header.lead")}
        leadShort={t("header.leadShort")}
      >
        <div className="flex flex-col gap-12 pt-4 tablet:flex-row">
          <Button href="/contact" block className="tablet:w-auto">
            {t("header.primary")}
          </Button>
          <Button href="/solutions" variant="secondary" icon={null} className="hidden tablet:inline-flex">
            {t("header.secondary")}
          </Button>
        </div>
      </PageHeader>

      {/* Notre histoire */}
      <section aria-labelledby="histoire-title" className="pt-64 pb-32 desktop:py-120">
        <div className="container flex flex-col gap-12 desktop:flex-row desktop:items-start desktop:gap-96">
          <SectionHeader
            id="histoire-title"
            eyebrow={t("story.eyebrow")}
            title={t("story.title")}
            className="desktop:w-[31.25rem] desktop:shrink-0"
          />
          <div className="flex flex-col gap-20 text-body-l text-text-secondary">
            {(t.raw("story.paragraphs") as string[]).map((p, i) => (
              <Reveal as="span" key={i} delay={200 + i * 120} className="block max-tablet:hidden">
                <p>{p}</p>
              </Reveal>
            ))}
            <p className="tablet:hidden">{t("story.short")}</p>
          </div>
        </div>
      </section>

      {/* Mission et vision */}
      <section
        aria-label={`${t("mission.eyebrow")} · ${t("vision.eyebrow")}`}
        className="pb-64 desktop:pb-120"
      >
        <div className="container grid gap-16 tablet:grid-cols-2 tablet:items-start tablet:gap-24">
          <Reveal className="relative isolate overflow-hidden rounded-xl bg-(image:--gradient-hero) p-28 desktop:rounded-2xl desktop:p-56">
            <RingMotif className="absolute top-[-45%] right-[-25%] -z-10 size-360 opacity-30" />
            <div className="flex flex-col gap-14 desktop:gap-20">
              <Eyebrow theme="dark">{t("mission.eyebrow")}</Eyebrow>
              <p className="font-display text-h4 text-text-inverse desktop:text-h3">{t("mission.text")}</p>
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="flex flex-col gap-14 rounded-xl bg-(image:--gradient-page-header) p-28 desktop:gap-20 desktop:rounded-2xl desktop:p-56"
          >
            <Eyebrow>{t("vision.eyebrow")}</Eyebrow>
            <p className="font-display text-h4 text-text-primary desktop:text-h3">{t("vision.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* Nos valeurs */}
      <section aria-labelledby="valeurs-title" className="bg-background-subtle py-64 desktop:py-120">
        <div className="container flex flex-col gap-24 desktop:gap-64">
          <SectionHeader
            id="valeurs-title"
            align="center"
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
            titleClassName="max-tablet:hidden"
            className="max-tablet:mx-0 max-tablet:items-start max-tablet:text-left"
          >
            <h2 className="text-h2 text-text-primary tablet:hidden">{t("values.titleShort")}</h2>
          </SectionHeader>
          <ul className="grid gap-24 tablet:grid-cols-2 desktop:grid-cols-3">
            {values.map((value, i) => (
              <Reveal
                as="li"
                key={value.title}
                delay={(i % 3) * 100}
                className="flex items-start gap-16 tablet:flex-col tablet:rounded-xl tablet:border tablet:border-border-default tablet:bg-surface-default tablet:p-24 desktop:p-32"
              >
                <IconTile icon={VALUE_ICONS[i]} size="M" />
                <div className="flex flex-col gap-4 tablet:gap-16">
                  <h3 className="text-h4 text-text-primary tablet:text-h5">{value.title}</h3>
                  <p className="text-text-secondary text-body-s">
                    <Short full={value.text} short={value.short} />
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Notre approche de l'innovation (ancre « Notre méthode » du pied de page) */}
      <section
        id="methode"
        aria-labelledby="methode-title"
        className="scroll-mt-(--header-height) bg-background-inverse py-64 text-text-inverse desktop:py-120"
      >
        <div className="container flex flex-col gap-20 desktop:flex-row desktop:items-center desktop:gap-96">
          <SectionHeader
            id="methode-title"
            theme="dark"
            eyebrow={t("innovation.eyebrow")}
            title={t("innovation.title")}
            description={t("innovation.description")}
            descriptionClassName="max-tablet:hidden"
            className="desktop:w-480 desktop:shrink-0"
          />
          <ol className="flex flex-1 flex-col gap-12 tablet:gap-16">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 120}
                className="flex items-center gap-16 rounded-lg border border-glass-card-border bg-glass-card p-18 tablet:gap-20 tablet:p-24"
              >
                <span aria-hidden className="text-stat text-accent-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-h4">{step.title}</h3>
                  <p className="text-text-inverse-muted text-body-s">
                    <Short full={step.text} short={step.short} />
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Ambitions et manière de travailler */}
      <section
        aria-label={`${t("ambitions.eyebrow")} · ${t("work.eyebrow")}`}
        className="py-64 desktop:py-120"
      >
        <div className="container grid gap-16 tablet:grid-cols-2 tablet:gap-24">
          {(["ambitions", "work"] as const).map((key, i) => (
            <Reveal
              key={key}
              delay={i * 120}
              className="flex flex-col gap-14 rounded-xl bg-background-subtle p-24 desktop:gap-20 desktop:rounded-2xl desktop:p-48"
            >
              <Eyebrow>{t(`${key}.eyebrow`)}</Eyebrow>
              <h2 className="hidden text-text-primary text-h3 tablet:block">{t(`${key}.title`)}</h2>
              <CheckList items={t.raw(`${key}.items`) as ListItem[]} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/services" }}
      />
    </>
  );
}
