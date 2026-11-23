import { getTranslations } from "next-intl/server";
import { CompactRealisationCard, RealisationCard } from "@/components/cards/RealisationCard";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { RingMotif } from "@/components/ui/RingMotif";
import { getFeaturedRealisations, getRealisations } from "@/data/realisations";

/** Visuels des cartes vedettes, exportés de Figma (101:2089, 317:1238, 243:88, 283:88). */
export const CARD_IMAGES: Record<string, string> = {
  fleetrent: "/media/realisations/fleetrent-carte.webp",
  cocoatrack: "/media/realisations/cocoatrack-carte.webp",
  "ste-scpb": "/media/realisations/ste-scpb-carte.webp",
  "ninety-one-foot-academy": "/media/realisations/ninety-one-foot-academy-carte.webp",
};

/**
 * Section — Nos réalisations (Figma 12:305 desktop, 22:283 mobile) : 4 réalisations mises en avant
 * (cartes vedettes), 7 autres en cartes compactes, mention des maquettes et lien vers le portfolio.
 * Les cartes masquées (`published: false`, ex. CocoaTrack sans accord) disparaissent d'elles-mêmes.
 */
export async function HomeRealisations() {
  const t = await getTranslations("home.realisations");
  const p = await getTranslations("portfolio");
  const a11y = await getTranslations("a11y");
  const featured = getFeaturedRealisations();
  const all = getRealisations();
  const others = all.filter((r) => !r.featured);

  return (
    <section
      aria-labelledby="realisations-title"
      className="relative isolate overflow-hidden bg-(image:--gradient-dark-section) py-64 text-text-inverse desktop:py-120"
    >
      <RingMotif className="absolute top-[-5%] right-[-40%] -z-10 size-520 opacity-10 desktop:right-[-12%] desktop:h-[56rem] desktop:w-[56rem]" />
      <div className="container flex flex-col gap-28 desktop:gap-56">
        <SectionHeader
          id="realisations-title"
          theme="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          descriptionClassName="hidden tablet:block"
        />

        <div className="flex flex-col gap-16 desktop:gap-40">
          <div className="flex flex-col gap-16 desktop:gap-24">
            <h3 className="text-overline text-accent-cyan">{t("featured")}</h3>
            <ul className="grid gap-24 desktop:grid-cols-2">
              {featured.map((r, i) => {
                const key = `items.${r.slug}` as const;
                return (
                  <li key={r.slug} className="flex">
                    <RealisationCard
                      realisation={r}
                      image={CARD_IMAGES[r.slug]}
                      imageAlt={p(`${key}.imageAlt`)}
                      typeBadge={p(`${key}.typeBadge`)}
                      extraBadge={p.has(`${key}.extraBadge`) ? p(`${key}.extraBadge`) : undefined}
                      statutLabel={p(`statuts.${r.statut}`)}
                      domains={p(`${key}.domains`)}
                      description={p(`${key}.description`)}
                      ctaLabel={p(`cta.${p(`${key}.cta`)}`)}
                      visitLabel={p("cta.visiterSite")}
                      newTabLabel={a11y("newTab")}
                      headingLevel="h4"
                      priority={i === 0}
                      className="w-full"
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-16 desktop:gap-24">
            <h3 className="text-overline text-accent-cyan">{t("others")}</h3>
            <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-24">
              {others.map((r) => (
                <li key={r.slug} className="flex">
                  <CompactRealisationCard
                    realisation={r}
                    domains={p(`items.${r.slug}.domains`)}
                    description={p(`items.${r.slug}.short`)}
                    linkLabel={p("cta.voirRealisation")}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-24 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-32">
          <p className="max-w-[45rem] text-text-inverse-muted text-body-xs">{t("note")}</p>
          <Button href="/realisations" variant="inverse-outline" className="w-full desktop:w-auto">
            {t("all", { count: all.length })}
          </Button>
        </div>
      </div>
    </section>
  );
}
