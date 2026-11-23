import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealLines, TypeLine } from "@/components/motion/text";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/Misc";
import { RingMotif } from "@/components/ui/RingMotif";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound.meta");
  return { title: t("title"), robots: { index: false } };
}

const LINKS = [
  { key: "services", href: "/services" },
  { key: "solutions", href: "/solutions" },
  { key: "realisations", href: "/realisations" },
  { key: "faq", href: "/faq" },
] as const;

/**
 * Page 404 — Figma 75:9346 (desktop), 75:16308 (mobile), 380:6007 (tablette).
 * « 404 » en JetBrains Mono, caractère par caractère + curseur (planche 12), anneau qui pivote
 * puis flotte ; deux actions (accueil, contact) et quatre pages utiles.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <section
        data-hero
        aria-labelledby="not-found-title"
        className="relative isolate overflow-hidden bg-(image:--gradient-page-header) pt-[calc(var(--header-height)+var(--space-32))] pb-56 desktop:pt-[calc(var(--header-height)+var(--space-64))] desktop:pb-80"
      >
        <RingMotif
          eager
          className="absolute top-[-6%] right-[-40%] -z-10 size-300 opacity-25 ring-404 tablet:right-[-10%] desktop:top-[4%] desktop:right-[-6%] desktop:size-480"
        />
        <div className="container flex flex-col gap-24 desktop:flex-row-reverse desktop:items-center desktop:justify-between desktop:gap-64">
          <p aria-hidden className="code-404 shrink-0">
            {["4", "0", "4"].map((char, i) => (
              <span key={i} className="code-404-char" style={{ animationDelay: `${i * 120}ms` }}>
                {char}
              </span>
            ))}
            <span className="code-404-cursor" />
          </p>
          <div className="flex max-w-[36rem] flex-col items-start gap-20 desktop:max-w-[42rem] desktop:gap-24">
            <p className="inline-flex items-center gap-10">
              <BrandMark />
              <TypeLine text={t("eyebrow")} inViewRef className="text-overline text-primary-default" />
            </p>
            <RevealLines
              as="h1"
              id="not-found-title"
              text={t("title")}
              preset="h2"
              trigger="mount"
              delay={250}
              className="text-display-l text-text-primary"
            />
            <RevealLines
              text={t("lead")}
              preset="description"
              trigger="mount"
              delay={600}
              className="text-text-secondary text-body-m tablet:text-body-xl"
            />
            <Reveal
              trigger="mount"
              delay={800}
              className="flex w-full flex-col gap-12 pt-4 tablet:w-auto tablet:flex-row"
            >
              <Button href="/" block className="tablet:w-auto">
                {t("home")}
              </Button>
              <Button href="/contact" variant="secondary" icon={null} block className="tablet:w-auto">
                {t("contact")}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="useful-title"
        className="pt-32 pb-64 tablet:pt-56 desktop:pt-80 desktop:pb-96"
      >
        <div className="container flex flex-col gap-20 desktop:gap-24">
          <h2 id="useful-title" className="text-overline text-text-secondary">
            {t("usefulTitle")}
          </h2>
          <ul className="grid gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:grid-cols-4 desktop:gap-24">
            {LINKS.map((link, i) => (
              <li key={link.key}>
                <Reveal delay={i * 80} className="h-full">
                  <article className="group relative flex h-full flex-col gap-8 rounded-lg border border-border-default bg-surface-default p-20 transition-[transform,box-shadow] duration-(--duration-card) ease-ui focus-within:shadow-md hover:-translate-y-4 hover:shadow-md motion-reduce:hover:translate-y-0">
                    <h3 className="text-text-primary text-h5">{t(`links.${link.key}.title`)}</h3>
                    <p className="text-text-secondary text-body-s">{t(`links.${link.key}.text`)}</p>
                    <Link
                      href={link.href}
                      className="mt-auto inline-flex w-fit items-center gap-8 pt-4 text-text-link text-label-m after:absolute after:inset-0 after:content-['']"
                    >
                      {t("access")}
                      <span className="sr-only"> — {t(`links.${link.key}.title`)}</span>
                      <ArrowRight
                        aria-hidden
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform duration-200 ease-ui group-hover:translate-x-4"
                      />
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
