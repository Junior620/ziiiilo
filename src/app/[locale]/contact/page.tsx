import { ArrowRight, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealLines, TypeLine } from "@/components/motion/text";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/Misc";
import { RingMotif } from "@/components/ui/RingMotif";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/contact" });
}

const whatsapp: string = site.contact.whatsapp;
const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : null;

function DirectRow({
  icon: Icon,
  label,
  value,
  action,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  action: string;
  href: string;
}) {
  return (
    <li className="flex items-center gap-12">
      <span
        aria-hidden
        className="flex size-36 shrink-0 items-center justify-center rounded-md bg-primary-subtle text-primary-default"
      >
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-text-primary text-label-m">{label}</span>
        <span className="truncate text-text-secondary text-body-s">{value}</span>
      </div>
      <a
        href={href}
        className="group inline-flex items-center gap-6 rounded-sm text-text-link text-label-m focus-visible:shadow-focus"
      >
        {action}
        <span className="sr-only"> — {value}</span>
        <ArrowRight
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-200 ease-ui group-hover:translate-x-4"
        />
      </a>
    </li>
  );
}

/**
 * Contact — Figma 19:4130 (desktop), 25:3462 (mobile), 77:9388 (tablette).
 * Desktop : colonne d'introduction (contact direct, étapes) + carte formulaire.
 * Mobile : en-tête, boutons e-mail / téléphone (WhatsApp seulement si configuré), formulaire
 * pleine largeur sur fond blanc.
 */
export default async function ContactPage() {
  const t = await getTranslations("contact");
  const steps = t.raw("next.steps") as string[];
  const mailto = `mailto:${site.contact.email}`;

  return (
    <section
      data-hero
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-(image:--gradient-page-header) pt-[calc(var(--header-height)+var(--space-40))] desktop:pt-[calc(var(--header-height)+var(--space-64))] desktop:pb-120"
    >
      <RingMotif
        eager
        className="absolute top-[8%] right-[-30%] -z-10 size-300 opacity-20 tablet:right-[-8%] desktop:top-[40%] desktop:right-auto desktop:left-[-12%] desktop:size-520"
      />
      <div className="container flex flex-col gap-32 desktop:flex-row desktop:items-start desktop:gap-64">
        {/* Introduction */}
        <div className="flex flex-col gap-24 desktop:w-[27.5rem] desktop:shrink-0 desktop:gap-32">
          <div className="flex flex-col gap-20">
            <p className="inline-flex items-center gap-10">
              <BrandMark />
              <TypeLine text={t("header.eyebrow")} inViewRef className="text-overline text-primary-default" />
            </p>
            <RevealLines
              as="h1"
              id="contact-title"
              text={t("header.title")}
              preset="h2"
              trigger="mount"
              delay={250}
              className="text-display-l text-text-primary"
            />
            <RevealLines
              text={t("header.lead")}
              preset="description"
              trigger="mount"
              delay={650}
              className="hidden text-body-l text-text-secondary desktop:block"
            />
            <RevealLines
              text={t("header.leadShort")}
              preset="description"
              trigger="mount"
              delay={650}
              className="text-body-l text-text-secondary desktop:hidden"
            />
          </div>

          {/* Mobile et tablette : accès direct */}
          <Reveal trigger="mount" delay={850} className="flex flex-col gap-16 desktop:hidden">
            <div className="grid grid-cols-2 gap-12 tablet:flex">
              <Button
                externalHref={mailto}
                variant="secondary"
                size="M"
                icon={null}
                leadingIcon={Mail}
                className="rounded-full"
              >
                {t("direct.email")}
              </Button>
              {whatsappHref ? (
                <Button
                  externalHref={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="M"
                  icon={null}
                  leadingIcon={MessageCircle}
                  className="rounded-full"
                >
                  {t("direct.whatsapp")}
                </Button>
              ) : (
                <Button
                  externalHref={site.contact.phoneHref}
                  variant="secondary"
                  size="M"
                  icon={null}
                  leadingIcon={Phone}
                  className="rounded-full"
                >
                  {t("direct.phone")}
                </Button>
              )}
            </div>
            <p className="text-text-secondary text-body-xs">
              {t("direct.note", { email: site.contact.email, phone: site.contact.phone })}
            </p>
          </Reveal>

          {/* Desktop : contact direct + étapes */}
          <Reveal trigger="mount" delay={850} className="hidden flex-col gap-32 desktop:flex">
            <div className="flex flex-col gap-20 rounded-xl border border-border-default bg-surface-default p-24">
              <h2 className="text-text-primary text-label-l">{t("direct.title")}</h2>
              <ul className="flex flex-col gap-20">
                <DirectRow
                  icon={Mail}
                  label={t("direct.email")}
                  value={site.contact.email}
                  action={t("direct.write")}
                  href={mailto}
                />
                <DirectRow
                  icon={Phone}
                  label={t("direct.phone")}
                  value={site.contact.phone}
                  action={t("direct.call")}
                  href={site.contact.phoneHref}
                />
                {whatsappHref && (
                  <DirectRow
                    icon={MessageCircle}
                    label={t("direct.whatsapp")}
                    value={whatsapp}
                    action={t("direct.write")}
                    href={whatsappHref}
                  />
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-16">
              <h2 className="text-text-primary text-label-l">{t("next.title")}</h2>
              <ol className="flex flex-col gap-16">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-12">
                    <span
                      aria-hidden
                      className="flex size-26 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-default text-primary-default text-label-s"
                    >
                      {i + 1}
                    </span>
                    <span className="text-text-secondary text-body-m">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* Formulaire : carte en desktop, pleine largeur sur fond blanc en mobile et tablette */}
        <Reveal
          trigger="mount"
          delay={400}
          distance={24}
          className="-mx-(--container-gutter) bg-surface-default px-(--container-gutter) pt-32 pb-64 tablet:pb-80 desktop:mx-0 desktop:min-w-0 desktop:flex-1 desktop:rounded-2xl desktop:border desktop:border-border-default desktop:p-40 desktop:shadow-md"
        >
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
