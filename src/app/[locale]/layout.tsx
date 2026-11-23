import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ConsentProvider } from "@/components/cookies/Consent";
import { OrganizationJsonLd } from "@/components/layout/OrganizationJsonLd";
import { FloatingActions } from "@/components/layout/PageAids";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { bootScript } from "@/components/splash/boot";
import { SplashLoader } from "@/components/splash/SplashLoader";
import { site } from "@/config/site";
import { publishedLocales, routing, type Locale } from "@/i18n/routing";
import { ogImage } from "@/lib/seo";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return publishedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  // Image par défaut des pages sans métadonnées propres (404…) : celle de l’accueil.
  const image = await ogImage("accueil", locale as Locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("defaultDescription"),
    applicationName: site.name,
    openGraph: {
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [{ url: image.url, alt: image.alt }] },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#020A24", // tokens-ok : = --primitive-navy-950 (les métadonnées n'acceptent pas les variables CSS)
  colorScheme: "light",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const t = await getTranslations("a11y");

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Pose `js` (animations) et `splash-pending` (1re visite) avant le premier rendu */}
        <script dangerouslySetInnerHTML={{ __html: bootScript(routing.locales) }} />
        <noscript>
          <style>
            {".motion-reveal{opacity:1!important;transform:none!important;filter:none!important}"}
          </style>
        </noscript>
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          {t("skipToContent")}
        </a>
        <OrganizationJsonLd />
        <NextIntlClientProvider>
          <ConsentProvider>
            <SiteHeader />
            <main id="contenu" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
            <FloatingActions />
            <SplashLoader />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
