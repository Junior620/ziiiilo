import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { publishedLocales, routing } from "./routing";

/**
 * Configuration next-intl par requête, à partir du segment racine [locale]
 * (next/root-params, Next.js ≥ 16.3). Les Route Handlers passent `locale` explicitement.
 */
export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue) && publishedLocales.includes(paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (await import(`../content/${locale}.json`)).default,
    timeZone: "Africa/Douala",
  };
});
