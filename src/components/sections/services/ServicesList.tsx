import { Check, Sparkle } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealLines } from "@/components/motion/text";
import { TiltCapture } from "@/components/motion/effects";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { getRealisation } from "@/data/realisations";
import { SERVICES, type Service } from "@/data/services";
import { cn } from "@/lib/cn";
import { SERVICE_EXAMPLES, SERVICE_ICONS, SERVICE_VISUAL } from "./data";
import { ServiceAccordion, ServiceAccordionGroup } from "./ServiceAccordion";

type T = Awaited<ReturnType<typeof getTranslations<"services">>>;

/**
 * Liste des 10 services. Desktop (13:861) : blocs `Section/Service détaillé` alternés (visuel à
 * droite puis à gauche, fonds blanc / subtil). Mobile et tablette (23:760, 378:2099) : accordéons,
 * le premier ouvert. Les exemples de réalisation suivent leur service dans les deux mises en page.
 */
export async function ServicesList() {
  const t = await getTranslations("services");
  return (
    <section aria-label={t("listTitle")} className="bg-background-subtle desktop:bg-transparent">
      <ServiceAccordionGroup initial={SERVICES[0].slug}>
        <p className="container pt-32 text-text-secondary text-body-s desktop:hidden">{t("hint")}</p>
        <div className="flex flex-col gap-12 pt-12 pb-64 desktop:gap-0 desktop:p-0">
          {SERVICES.map((service, index) => (
            <ServiceSection key={service.slug} service={service} index={index} t={t} />
          ))}
        </div>
      </ServiceAccordionGroup>
    </section>
  );
}

function ServiceSection({ service, index, t }: { service: Service; index: number; t: T }) {
  const { slug } = service;
  const key = `items.${slug}` as const;
  const title = t(`${key}.title`);
  const overline = t("labels.number", { number: service.numero });
  const example = SERVICE_EXAMPLES[slug];
  const realisation = example && getRealisation(example.realisation);
  const quoteHref = { pathname: "/contact" as const, query: { service: slug } };
  const detailHref = { pathname: "/services/[slug]" as const, params: { slug } };

  return (
    <section
      id={slug}
      aria-label={title}
      className={cn(
        "desktop:py-96",
        index % 2 ? "desktop:bg-background-subtle" : "desktop:bg-surface-default",
      )}
    >
      <div className="container flex flex-col gap-12 desktop:gap-64">
        {/* Desktop : bloc détaillé */}
        <div
          className={cn(
            "hidden items-center justify-between gap-120 desktop:flex",
            index % 2 === 1 && "flex-row-reverse",
          )}
        >
          <div className="flex w-560 shrink-0 flex-col gap-24">
            <div className="flex flex-col gap-10">
              <p className="text-overline text-primary-default">{overline}</p>
              <RevealLines
                as="h2"
                text={title}
                preset="h2"
                delay={100}
                className="text-text-primary text-h3"
              />
            </div>
            <Reveal delay={250} className="flex flex-col gap-24">
              <ServiceBody t={t} slug={slug} variant="block" />
              <div className="flex items-center gap-12">
                <Button href={quoteHref} size="M">
                  {t("labels.quote")}
                </Button>
                {service.hasDetail && (
                  <Button href={detailHref} size="M" variant="ghost">
                    {t("labels.detail")}
                    <span className="sr-only"> — {title}</span>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} distance={24} className="w-520 shrink-0">
            <Image
              src={SERVICE_VISUAL(slug)}
              alt=""
              width={1040}
              height={800}
              sizes="520px"
              className="aspect-[520/400] w-full rounded-xl"
            />
          </Reveal>
        </div>

        {/* Mobile et tablette : accordéon */}
        <ServiceAccordion
          slug={slug}
          icon={<IconTile icon={SERVICE_ICONS[slug]} size="M" />}
          overline={overline}
          title={title}
          className="desktop:hidden"
        >
          <ServiceBody t={t} slug={slug} variant="compact" />
          <div className="flex flex-col gap-8">
            {service.hasDetail && (
              <Button href={detailHref} size="M" block>
                {t("labels.detail")}
                <span className="sr-only"> — {title}</span>
              </Button>
            )}
            <Button href={quoteHref} size="M" block variant={service.hasDetail ? "ghost" : "primary"}>
              {t("labels.quote")}
            </Button>
          </div>
        </ServiceAccordion>

        {realisation && example && (
          <ServiceExample t={t} slug={example.realisation} example={example} realisation={realisation} />
        )}
      </div>
    </section>
  );
}

/** Besoin, réalisations (coches bleues) et bénéfices (étincelles violettes). */
function ServiceBody({ t, slug, variant }: { t: T; slug: string; variant: "block" | "compact" }) {
  const key = `items.${slug}` as const;
  const deliver = t.raw(`${key}.deliver`) as string[];
  const benefits = t.raw(`${key}.benefits`) as string[];
  const block = variant === "block";
  const label = "text-label-m text-text-primary";
  const text = block ? "text-body-m text-text-secondary" : "text-body-s text-text-secondary";

  return (
    <div className={cn("flex flex-col", block ? "gap-24" : "gap-20")}>
      <div className="flex flex-col gap-6">
        <h3 className={label}>{t("labels.need")}</h3>
        <p className={text}>{t(`${key}.need`)}</p>
      </div>
      {(
        [
          {
            title: t("labels.deliver"),
            items: deliver,
            icon: Check,
            tone: "bg-primary-subtle text-primary-default",
          },
          {
            title: t("labels.benefits"),
            items: benefits,
            icon: Sparkle,
            tone: "bg-accent-violet-soft text-accent-violet",
          },
        ] as const
      ).map(({ title, items, icon: Icon, tone }) => (
        <div key={title} className="flex flex-col gap-10">
          <h3 className={label}>{title}</h3>
          <ul className={cn("flex flex-col", block ? "gap-12" : "gap-10")}>
            {items.map((item) => (
              <li key={item} className={cn("flex items-start gap-12", text)}>
                <span
                  aria-hidden
                  className={cn(
                    "flex shrink-0 items-center justify-center",
                    block ? cn("mt-1 size-24 rounded-full", tone) : cn("mt-1 size-18", tone.split(" ")[1]),
                  )}
                >
                  <Icon size={block ? 14 : 16} strokeWidth={2} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Exemple de réalisation (248:1113 desktop, 248:1143 mobile) : capture, texte, savoir-faire, lien. */
function ServiceExample({
  t,
  slug,
  example,
  realisation,
}: {
  t: T;
  slug: string;
  example: (typeof SERVICE_EXAMPLES)[string];
  realisation: NonNullable<ReturnType<typeof getRealisation>>;
}) {
  const key = `examples.${slug}` as const;
  const title = t(`${key}.title`);
  const chips = t.raw(`${key}.chips`) as string[];
  const hasShort = t.has(`${key}.textShort`);
  const hasCaption = t.has(`${key}.caption`);
  const [w, h] = example.ratio.split("/").map(Number);

  return (
    <Reveal
      as="article"
      className="flex flex-col gap-16 rounded-xl border border-border-default bg-surface-default p-16 tablet:p-20 desktop:flex-row desktop:items-center desktop:gap-40 desktop:bg-background-subtle desktop:p-28"
    >
      <figure className="flex shrink-0 flex-col gap-8 desktop:w-300">
        <TiltCapture>
          <Image
            src={example.image}
            alt={t(`${key}.imageAlt`)}
            width={w * 2}
            height={h * 2}
            sizes="(min-width: 75rem) 300px, (min-width: 48rem) 720px, 100vw"
            className="w-full rounded-md shadow-sm"
          />
        </TiltCapture>
        {hasCaption && (
          <figcaption className="text-text-muted text-body-xs">{t(`${key}.caption`)}</figcaption>
        )}
      </figure>
      <div className="flex min-w-0 flex-col gap-12">
        <p className="text-overline text-primary-default">{t("labels.example")}</p>
        <h3 className="text-h4 text-text-primary">{title}</h3>
        <p className="text-text-secondary text-body-s tablet:text-body-m">
          {hasShort ? (
            <>
              <span className="desktop:hidden">{t(`${key}.textShort`)}</span>
              <span className="hidden desktop:inline">{t(`${key}.text`)}</span>
            </>
          ) : (
            t(`${key}.text`)
          )}
        </p>
        <p className="text-text-primary text-body-s desktop:hidden">
          {t("labels.skills")} {t(`${key}.skills`)}
        </p>
        <ul className="hidden flex-wrap gap-8 desktop:flex">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border-default bg-surface-default px-12 py-6 text-text-primary text-label-s"
            >
              {chip}
            </li>
          ))}
        </ul>
        <Button href={realisation.route} size="M" variant="ghost" className="w-fit">
          {t("labels.seeRealisation")}
          <span className="sr-only"> — {title}</span>
        </Button>
      </div>
    </Reveal>
  );
}
