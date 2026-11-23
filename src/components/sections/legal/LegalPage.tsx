import { Fragment, type ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { CookieSettingsLink } from "@/components/cookies/CookieSettingsLink";
import { ReadingProgress } from "@/components/layout/PageAids";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/text";
import { buttonClasses } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Misc";
import { Link } from "@/i18n/navigation";
import { resolveLegal } from "@/lib/legal";
import { LegalToc } from "./LegalToc";

export type LegalNamespace = "legalNotice" | "privacy" | "cookiePolicy" | "terms";

type Row = { label: string; value?: string; from?: string };
type Section = {
  id: string;
  title: string;
  text?: string;
  bullets?: string[];
  rows?: Row[];
  action?: "cookies";
};

const TAG_LINKS = {
  contact: "/contact",
  notice: "/mentions-legales",
  privacy: "/confidentialite",
  cookies: "/politique-cookies",
} as const;

/** Balises des textes juridiques : <b>…</b> et liens internes <contact|notice|privacy|cookies>. */
function rich(text: string): ReactNode {
  const parts = text.split(/(<(\w+)>.*?<\/\2>)/g);
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const match = /^<(\w+)>(.*?)<\/\1>$/.exec(part);
    if (match) {
      const [, tag, inner] = match;
      i++; // saute le groupe capturé (nom de balise)
      if (tag === "b")
        out.push(
          <strong key={i} className="font-semibold text-text-primary">
            {inner}
          </strong>,
        );
      else if (tag in TAG_LINKS)
        out.push(
          <Link
            key={i}
            href={TAG_LINKS[tag as keyof typeof TAG_LINKS]}
            className="text-text-link underline underline-offset-2"
          >
            {inner}
          </Link>,
        );
      else out.push(inner);
    } else if (part) out.push(<Fragment key={i}>{part}</Fragment>);
  }
  return out;
}

/**
 * Gabarit des pages juridiques — Figma 71:8677 (mentions légales), 71:8970 (confidentialité),
 * 405:87 (cookies), 405:682 (CGU) ; mobile 71:15945, 71:16198, 405:1270, 405:1803.
 * En-tête, sommaire (fixe en desktop), alerte « Modèle à compléter », articles numérotés.
 * Les valeurs viennent de `site.ts` ; une valeur absente s'affiche « À configurer ».
 */
export async function LegalPage({ ns }: { ns: LegalNamespace }) {
  const t = await getTranslations(ns as "privacy");
  const common = await getTranslations("legal");
  const sections = t.raw("sections") as Section[];

  const toConfigure = (
    <span className="inline-flex rounded-full bg-warning-subtle px-10 py-2 text-warning-default text-label-s">
      {common("toConfigure")}
    </span>
  );

  return (
    <>
      <ReadingProgress />
      <PageHeader eyebrow={t("header.eyebrow")} title={t("header.title")} lead={t("header.lead")} />

      <div className="container flex flex-col gap-32 pt-32 pb-64 tablet:pt-56 tablet:pb-80 desktop:flex-row desktop:items-start desktop:gap-64 desktop:py-96">
        <Reveal
          trigger="mount"
          delay={300}
          className="desktop:sticky desktop:top-[calc(var(--header-height)+var(--space-32))] desktop:w-280 desktop:shrink-0"
        >
          <LegalToc title={common("toc")} items={sections.map(({ id, title }) => ({ id, title }))} />
        </Reveal>

        <div className="flex max-w-[47.5rem] min-w-0 flex-1 flex-col gap-40 desktop:gap-48">
          <Alert tone="info" title={common("alert.title")}>
            {common("alert.text")}
          </Alert>

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="flex scroll-mt-[calc(var(--header-height)+var(--space-32))] flex-col gap-16"
            >
              <h2 id={`${section.id}-title`} className="text-h4 text-text-primary">
                {section.title}
              </h2>
              {section.text && <p className="text-text-secondary text-body-m">{rich(section.text)}</p>}
              {section.bullets && (
                <ul className="flex list-disc flex-col gap-8 pl-20 text-text-secondary text-body-m marker:text-primary-brand">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{rich(bullet)}</li>
                  ))}
                </ul>
              )}
              {section.rows && (
                <dl className="flex flex-col gap-16 tablet:gap-0 tablet:border-t tablet:border-border-default">
                  {section.rows.map((row) => {
                    const resolved = row.value
                      ? { text: row.value }
                      : row.from
                        ? resolveLegal(row.from)
                        : null;
                    return (
                      <div
                        key={row.label}
                        className="flex flex-col gap-4 tablet:grid tablet:grid-cols-[18.75rem_minmax(0,1fr)] tablet:items-center tablet:gap-16 tablet:border-b tablet:border-border-default tablet:py-14"
                      >
                        <dt className="text-text-primary text-label-m">{row.label}</dt>
                        <dd className="whitespace-pre-line text-text-secondary text-body-s">
                          {!resolved ? (
                            toConfigure
                          ) : "href" in resolved && resolved.href ? (
                            <a
                              href={resolved.href}
                              className="text-text-link underline-offset-2 hover:underline"
                            >
                              {resolved.text}
                            </a>
                          ) : (
                            resolved.text
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              )}
              {section.action === "cookies" && (
                <CookieSettingsLink
                  className={buttonClasses({ variant: "secondary", size: "M", className: "w-fit" })}
                >
                  {common("cookieButton")}
                </CookieSettingsLink>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
