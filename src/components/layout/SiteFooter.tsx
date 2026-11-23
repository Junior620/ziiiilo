import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ComponentProps, ReactNode } from "react";
import { LogoOnPlate } from "@/components/brand/Logo";
import { CookieSettingsLink } from "@/components/cookies/CookieSettingsLink";
import { Button } from "@/components/ui/Button";
import { FOOTER_SERVICES } from "@/config/navigation";
import { configuredSocials, site } from "@/config/site";
import { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

/**
 * Pied de page — Figma Footer/Desktop 5:188 et Footer/Mobile 5:255 (§9 bis).
 * Réseaux sociaux masqués tant que leurs adresses ne sont pas configurées (§12).
 */
export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  const socials = configuredSocials();

  const services = FOOTER_SERVICES.map((slug) => ({
    label: t(`services.${slug}`),
    href: { pathname: "/services/[slug]", params: { slug } } as Href,
  }));

  return (
    <footer className="bg-background-inverse text-text-inverse">
      <div className="container flex flex-col gap-40 pt-64 pb-40 desktop:gap-64 desktop:pt-96">
        <div className="flex flex-col gap-40 desktop:flex-row desktop:justify-between desktop:gap-64">
          {/* Marque */}
          <div className="flex flex-col items-start gap-24 desktop:w-340 desktop:shrink-0">
            <LogoOnPlate width={144} />
            <p className="text-text-inverse-muted text-body-s">{t("tagline")}</p>
            <Button href="/contact" variant="inverse-outline" size="M" className="hidden desktop:inline-flex">
              {nav("startProject")}
            </Button>
          </div>

          <nav
            aria-label={a11y("footerNav")}
            className="flex flex-col gap-40 desktop:flex-row desktop:gap-64"
          >
            {/* Mobile : Services (4 + tous) | Entreprise */}
            <div className="grid grid-cols-2 gap-16 desktop:contents">
              <FooterColumn title={t("columns.services")}>
                {services.map((s, i) => (
                  <FooterLink
                    key={s.label}
                    href={s.href}
                    className={i >= 4 ? "hidden desktop:block" : undefined}
                  >
                    {s.label}
                  </FooterLink>
                ))}
                <FooterLink href="/services" className="desktop:hidden">
                  {t("seeAllServices")}
                </FooterLink>
              </FooterColumn>

              <FooterColumn title={t("columns.solutions")} className="hidden desktop:flex">
                <FooterLink href="/solutions/fleetrent">{t("solutions.fleetrent")}</FooterLink>
                <FooterLink href="/solutions/doccloud">{t("solutions.doccloud")}</FooterLink>
                <FooterLink href="/solutions">{t("solutions.allProducts")}</FooterLink>
                <FooterLink href="/realisations">{t("solutions.realisations")}</FooterLink>
              </FooterColumn>

              <FooterColumn title={t("columns.company")}>
                <FooterLink href="/solutions" className="desktop:hidden">
                  {t("mobileCompany.solutions")}
                </FooterLink>
                <FooterLink href="/realisations" className="desktop:hidden">
                  {t("mobileCompany.realisations")}
                </FooterLink>
                <FooterLink href="/a-propos">{t("company.about")}</FooterLink>
                <FooterLink
                  href={{ pathname: "/a-propos", hash: "methode" }}
                  className="hidden desktop:block"
                >
                  {t("company.method")}
                </FooterLink>
                <FooterLink href="/faq">{t("company.faq")}</FooterLink>
                <FooterLink href="/contact" className="hidden desktop:block">
                  {t("company.contact")}
                </FooterLink>
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-16">
              <h2 className="text-overline text-text-inverse-muted">{t("columns.contact")}</h2>
              <ul className="flex flex-col gap-4">
                <ContactLine icon={Mail} href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </ContactLine>
                <ContactLine icon={Phone} href={site.contact.phoneHref}>
                  {site.contact.phone}
                </ContactLine>
                <ContactLine icon={MapPin}>{site.contact.address}</ContactLine>
              </ul>
              {socials.length > 0 && (
                <>
                  <h2 className="text-overline text-text-inverse-muted">{t("columns.follow")}</h2>
                  <ul aria-label={a11y("socialNav")} className="flex flex-wrap gap-8">
                    {socials.map(({ network, href }) => (
                      <li key={network}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-32 items-center rounded-full border border-inverse-line-soft px-12 text-text-inverse text-label-s hover:bg-inverse-hover"
                        >
                          {t(`social.${network}`)}
                          <span className="sr-only"> {a11y("newTab")}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </nav>
        </div>

        <div aria-hidden className="h-1 bg-border-inverse" />

        <div className="flex flex-col gap-24 text-text-inverse-muted text-body-xs desktop:flex-row desktop:items-center desktop:justify-between">
          <p>{t("copyright")}</p>
          <nav aria-label={a11y("legalNav")}>
            <ul className="flex flex-col gap-4 desktop:flex-row desktop:gap-24">
              <li>
                <LegalLink href="/mentions-legales">{t("legal.notice")}</LegalLink>
              </li>
              <li>
                <LegalLink href="/confidentialite">{t("legal.privacy")}</LegalLink>
              </li>
              <li>
                <CookieSettingsLink className="flex min-h-touch items-center hover:text-text-inverse desktop:min-h-0">
                  {t("legal.cookieSettings")}
                </CookieSettingsLink>
              </li>
              <li>
                <LegalLink href="/politique-cookies">{t("legal.cookiePolicy")}</LegalLink>
              </li>
              <li>
                <LegalLink href="/conditions-utilisation">{t("legal.terms")}</LegalLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-16 ${className ?? ""}`}>
      <h2 className="text-overline text-text-inverse-muted">{title}</h2>
      <ul className="flex flex-col gap-4 desktop:gap-12">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, className }: { href: Href; children: ReactNode; className?: string }) {
  return (
    <li className={className}>
      <Link
        href={href}
        className="link-animated flex min-h-touch items-center text-text-inverse text-body-m desktop:inline desktop:min-h-0 desktop:text-body-s"
      >
        {children}
      </Link>
    </li>
  );
}

function LegalLink({ href, children }: { href: Href; children: ReactNode }) {
  return (
    <Link href={href} className="flex min-h-touch items-center hover:text-text-inverse desktop:min-h-0">
      {children}
    </Link>
  );
}

function ContactLine({
  icon: Icon,
  href,
  children,
}: {
  icon: typeof Mail;
  href?: string;
  children: ReactNode;
}) {
  const inner = (
    <>
      <Icon aria-hidden size={16} strokeWidth={1.75} className="mt-3 shrink-0 text-accent-cyan" />
      <span>{children}</span>
    </>
  );
  const cls =
    "flex min-h-touch items-start gap-10 py-10 text-body-m text-text-inverse desktop:min-h-0 desktop:py-4 desktop:text-body-s";
  return (
    <li>
      {href ? (
        <a href={href} className={`${cls} hover:underline`}>
          {inner}
        </a>
      ) : (
        <p className={cls}>{inner}</p>
      )}
    </li>
  );
}
