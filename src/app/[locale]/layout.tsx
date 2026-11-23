import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { publishedLocales } from "@/i18n/routing";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return publishedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("defaultDescription"),
    applicationName: site.name,
    openGraph: {
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/brand/ziiiilo-logo-couleur-2536px.png", alt: site.name }],
    },
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
    <html lang={locale} className={fontVariables}>
      <body>
        <a href="#contenu" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
