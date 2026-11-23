import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import fr from "../content/fr.json";
import { publishedLocales, routing, type Locale } from "./routing";

type Messages = { [key: string]: string | Messages };

/** Fusion profonde : les clés absentes de `override` retombent sur `base`. */
function withFallback(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const prev = out[key];
    out[key] = typeof value === "object" && typeof prev === "object" ? withFallback(prev, value) : value;
  }
  return out;
}

/** L'anglais retombe sur le français tant que la traduction complète n'est pas faite (§10). */
async function loadMessages(locale: Locale): Promise<Messages> {
  if (locale === routing.defaultLocale) return fr as Messages;
  const translated = (await import(`../content/${locale}.json`)).default as Messages;
  return withFallback(fr as Messages, translated);
}

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
    messages: await loadMessages(locale as Locale),
    timeZone: "Africa/Douala",
  };
});
