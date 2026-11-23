import { getTranslations } from "next-intl/server";

/** Accueil provisoire (étape 1) : remplacé par les sections de l'accueil à l'étape 4. */
export default async function HomePage() {
  const t = await getTranslations("dev");
  return (
    <section className="bg-background-inverse text-text-inverse">
      <div className="container flex min-h-dvh flex-col justify-center gap-32 py-64 desktop:py-120">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG fourni, jamais redessiné (§11) */}
        <img
          src="/brand/ziiiilo-logo-blanc.svg"
          alt="ZIIIILO"
          width={224}
          height={112}
          className="h-auto w-[min(224px,60%)]"
        />
        <div className="flex max-w-prose flex-col gap-16">
          <p className="text-overline text-text-accent-on-dark">ziiiilo.tech</p>
          <h1 className="text-display-xl">{t("placeholderTitle")}</h1>
          <p className="text-body-xl text-text-inverse-muted">{t("placeholderText")}</p>
        </div>
      </div>
    </section>
  );
}
