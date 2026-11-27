import {
  Building2,
  Calendar,
  ChartColumn,
  CircleCheck,
  Clock,
  Cloud,
  Compass,
  Eye,
  FileText,
  Globe,
  Layers,
  LayoutGrid,
  Mail,
  PenTool,
  Phone,
  Search,
  Send,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { getRealisation } from "@/data/realisations";
import { cn } from "@/lib/cn";
import { EtudeHero, EtudeSection, type Txt } from "../scpb-commercial/kit";
import {
  BlockFlow,
  BrowserFrame,
  CheckRows,
  ChipGroup,
  DarkCards,
  DarkMentions,
  Device,
  DevicesVisual,
  ExternalButton,
  IconRows,
  InfoNote,
  PlainFeatures,
  StatusGrid,
  StepChain,
  TechRows,
  type Capture,
  type Item,
  type TechRow,
} from "../_b4/parts";

/**
 * Agora Film Invest — Figma desktop 297:27498, mobile 300:22316 (16 sections).
 * Captures réelles d'agorafilminvest.com (22/11/2026), non retouchées : la mention Fastgraphiste
 * du pied de page reste visible et est signalée. Aucun avant / après (aucune capture de l'ancienne
 * version) : le comparateur 397:254 n'est pas codé. Palette et visuels appartiennent au client.
 */

const SLUG = "agora-film-invest";
const MEDIA = `/media/${SLUG}`;

const img = (name: string, width = 1520, height = 782) => ({ src: `${MEDIA}/${name}.webp`, width, height });
const SHOTS = {
  accueil: img("capture-01-accueil"),
  realisations: img("capture-03-realisations"),
  projet: img("capture-04-projet-en-developpement"),
  produits: img("capture-05-produits"),
  actualites: img("capture-06-actualites"),
  equipe: img("capture-07-equipe"),
  galerie: img("capture-08-galerie"),
  contact: img("capture-09-contact"),
  og: img("image-open-graph", 1200, 630),
  icone: img("icone-du-site", 180, 180),
  mAccueil: img("capture-m1-accueil-mobile", 600, 1130),
  mRealisations: img("capture-m2-realisations-mobile", 600, 1130),
  mActualites: img("capture-m5-actualites-mobile", 600, 1130),
};

const CONTEXT_ICONS: LucideIcon[] = [Globe, Shield, Target, FileText];
const STYLE_ICONS: LucideIcon[] = [Eye, PenTool, LayoutGrid];
const PAGE_ICONS: LucideIcon[] = [Building2, Users, Calendar, Eye, Clock, Users, Mail];
const NAV_ICONS: LucideIcon[] = [Compass, Target, LayoutGrid, Eye, Smartphone];
const FILM_ICONS: LucideIcon[] = [Search, FileText, Send];
const NEWS_ICONS: LucideIcon[] = [Sparkles, Calendar, CircleCheck, Calendar, Target, LayoutGrid];
const TEAM_ICONS: LucideIcon[] = [Users, LayoutGrid, Globe, Calendar];
const ADAPT_ICONS: LucideIcon[] = [Clock, FileText, CircleCheck, CircleCheck];
const PERF_ICONS: LucideIcon[] = [Zap, Search, Shield, CircleCheck];
const SEO_ICONS: LucideIcon[] = [FileText, Search, Share2];
const BRAND_ICONS: LucideIcon[] = [PenTool, Layers, Mail];
const LAYER_ICONS: LucideIcon[] = [FileText, LayoutGrid, Eye, Zap, Layers, Cloud, ChartColumn];
const CONTACT_ICONS: LucideIcon[] = [Users, Compass, Phone, FileText, Mail];
const HOW_ICONS: LucideIcon[] = [Clock, FileText, CircleCheck];

const BADGE_TONES: { tone: BadgeTone; pulse?: boolean }[] = [
  { tone: "dark" },
  { tone: "available", pulse: true },
  { tone: "neutral" },
];

type Head = { eyebrow: string; title: string; description: string; descriptionShort?: string };
type Noted = { note: string; noteShort?: string };
type Shot = Capture & { url: string };
type Mentions = { items: Txt[]; line: string; lineShort?: string; visuals: string; visualsShort?: string };

/** Deux colonnes desktop (680 / 472) : visuel et informations. */
function Split({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-32 desktop:items-start desktop:gap-48",
        reverse
          ? "desktop:grid-cols-[minmax(0,29.625rem)_minmax(0,42.5rem)]"
          : "desktop:grid-cols-[minmax(0,42.5rem)_minmax(0,29.5rem)]",
      )}
    >
      {children}
    </div>
  );
}

/** Nuancier du client (couleurs du site Agora Film Invest, données de contenu, pas des tokens ZIIIILO). */
function Palette({
  title,
  swatches,
  note,
  noteShort,
}: {
  title: string;
  swatches: { name: string; hex: string }[];
  note: string;
  noteShort: string;
}) {
  return (
    <Reveal as="div" delay={120} className="flex flex-col gap-14 tablet:gap-24">
      <h3 className="text-text-inverse text-h5 max-tablet:sr-only">{title}</h3>
      <ul className="grid grid-cols-5 gap-8 tablet:flex tablet:gap-12">
        {swatches.map((s) => (
          <li key={s.name} className="flex min-w-0 flex-col gap-6 tablet:w-80 tablet:gap-8">
            <span
              aria-hidden
              className="h-48 rounded-md border border-inverse-line tablet:h-64"
              style={{ backgroundColor: s.hex }}
            />
            <span className="text-text-inverse text-label-m max-tablet:text-label-s">{s.name}</span>
            <span className="text-text-inverse-muted text-body-xs">{s.hex}</span>
          </li>
        ))}
      </ul>
      <p className="text-text-inverse-muted text-body-s">
        <Short full={note} short={noteShort} />
      </p>
    </Reveal>
  );
}

export default async function EtudePage() {
  const t = await getTranslations(`etude-${SLUG}`);
  const a11y = await getTranslations("a11y");
  const siteUrl = getRealisation(SLUG)?.siteUrl ?? null;

  const hero = t.raw("hero") as Record<string, string> & { badges: Txt[] };
  const ctx = t.raw("contexte") as Head & Noted & { items: Item[] };
  const idt = t.raw("identite") as Head &
    Noted & {
      capture: Shot;
      paletteTitle: string;
      swatches: { name: string; hex: string }[];
      paletteNote: string;
      paletteNoteShort: string;
      items: Item[];
    };
  const one = t.raw("onePage") as Head & Noted & { steps: Item[]; capture: Shot; items: Item[] };
  const films = t.raw("films") as Head & { realisations: Shot; projet: Shot; points: Item[] };
  const mm = t.raw("multimedia") as Head & Noted & { galerie: Shot; produits: Shot };
  const news = t.raw("actualites") as Head & { items: Item[]; capture: Shot };
  const team = t.raw("equipe") as Head & Noted & { capture: Shot; listTitle: string; items: Item[] };
  const refonte = t.raw("refonte") as Head & Noted & Mentions & { action: string };
  const rsp = t.raw("responsive") as Head &
    Noted & {
      desktopAlt: string;
      realisationsAlt: string;
      actualitesAlt: string;
      caption: string;
      captionShort: string;
      screensTitle: string;
      screens: string[];
      adaptTitle: string;
      items: Item[];
    };
  const perf = t.raw("performance") as Head & Noted & { items: Item[] };
  const seo = t.raw("seo") as Head & {
    label: string;
    labelShort: string;
    blocks: Item[];
    ogAlt: string;
    ogDomain: string;
    ogTitle: string;
    iconAlt: string;
    iconCaption: string;
    ogNote: string;
    ogNoteShort: string;
    items: Item[];
  };
  const arch = t.raw("architecture") as Head & Noted & { rows: TechRow[] };
  const ct = t.raw("contact") as Head &
    Noted & {
      steps: Item[];
      highlight: string;
      capture: Shot;
      fieldsTitle: string;
      fields: string[];
      howTitle: string;
      how: Item[];
    };
  const res = t.raw("resultat") as Head & Noted & Mentions;
  const cta = t.raw("cta") as Record<string, string>;

  const head = (h: Head) => ({
    eyebrow: h.eyebrow,
    title: h.title,
    description: h.description,
    descriptionShort: h.descriptionShort,
  });
  const visit = (label: string, className?: string) =>
    siteUrl && (
      <ExternalButton
        href={siteUrl}
        label={label}
        newTab={a11y("newTab")}
        variant="inverse"
        className={className}
      />
    );
  const wide = "(min-width: 75rem) 680px, 100vw";
  const half = "(min-width: 75rem) 588px, (min-width: 48rem) 50vw, 100vw";
  const side = "(min-width: 75rem) 472px, 100vw";

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero cinématographique (297:27499 / 300:22317) */}
      <EtudeHero
        crumb={hero.crumb}
        identity={null}
        badges={hero.badges.map((b, i) => (
          <StatusBadge key={b.text} tone={BADGE_TONES[i].tone} pulse={BADGE_TONES[i].pulse}>
            <Short full={b.text} short={b.textShort} />
          </StatusBadge>
        ))}
        title={hero.title}
        lead={hero.lead}
        leadShort={hero.leadShort}
        actions={
          <div className="flex flex-col gap-12 tablet:flex-row tablet:flex-wrap">
            {visit(hero.primary, "w-full tablet:w-auto")}
            <Button
              href="/realisations"
              variant="inverse-outline"
              icon={null}
              className="w-full tablet:w-auto"
            >
              {hero.secondary}
            </Button>
          </div>
        }
        note={<Short full={hero.note} short={hero.noteShort} />}
        visual={
          <DevicesVisual
            laptop={{ ...SHOTS.accueil, alt: hero.laptopAlt }}
            phone={{ ...SHOTS.mAccueil, alt: hero.phoneAlt }}
            chipLaptop={hero.chipLaptop}
            chipPhone={hero.chipPhone}
            chipShort={hero.chipShort}
          />
        }
      />

      {/* 02 — Le contexte (297:27533) */}
      <EtudeSection id="contexte" theme="subtle" {...head(ctx)}>
        <PlainFeatures items={ctx.items} icons={CONTEXT_ICONS} columns={4} />
        <InfoNote text={ctx.note} textShort={ctx.noteShort} />
      </EtudeSection>

      {/* 03 — L'identité visuelle (297:27543) */}
      <EtudeSection id="identite-visuelle" theme="dark" {...head(idt)}>
        <Split>
          <BrowserFrame image={SHOTS.realisations} capture={idt.capture} dark sizes={wide} />
          <Palette
            title={idt.paletteTitle}
            swatches={idt.swatches}
            note={idt.paletteNote}
            noteShort={idt.paletteNoteShort}
          />
        </Split>
        <DarkCards items={idt.items} icons={STYLE_ICONS} />
        <InfoNote text={idt.note} textShort={idt.noteShort} dark />
      </EtudeSection>

      {/* 04 — Expérience one-page (297:27652) */}
      <EtudeSection id="one-page" theme="dark" {...head(one)} className="desktop:pt-0">
        <StepChain steps={one.steps} icons={PAGE_ICONS} perRow={7} mobileGrid />
        <Split>
          <BrowserFrame image={SHOTS.accueil} capture={one.capture} dark sizes={wide} />
          <IconRows items={one.items} icons={NAV_ICONS} dark />
        </Split>
        <InfoNote text={one.note} textShort={one.noteShort} dark />
      </EtudeSection>

      {/* 05 — Valorisation des films (297:27613) */}
      <EtudeSection id="films" theme="subtle" {...head(films)}>
        <Split>
          <BrowserFrame image={SHOTS.realisations} capture={films.realisations} sizes={wide} />
          <div className="flex flex-col gap-24">
            <BrowserFrame image={SHOTS.projet} capture={films.projet} sizes={side} />
            <CheckRows items={films.points} icons={FILM_ICONS} />
          </div>
        </Split>
      </EtudeSection>

      {/* 06 — Multimédia et galerie (297:27587) */}
      <EtudeSection id="galerie" {...head(mm)}>
        <div className="grid gap-24 tablet:grid-cols-2">
          <BrowserFrame image={SHOTS.galerie} capture={mm.galerie} sizes={half} />
          <BrowserFrame image={SHOTS.produits} capture={mm.produits} sizes={half} />
        </div>
        <InfoNote text={mm.note} textShort={mm.noteShort} />
      </EtudeSection>

      {/* 07 — L'actualité cinématographique (297:27851) */}
      <EtudeSection id="actualites" theme="dark" {...head(news)}>
        <Split reverse>
          <IconRows items={news.items} icons={NEWS_ICONS} dark className="max-desktop:order-last" />
          <BrowserFrame image={SHOTS.actualites} capture={news.capture} dark sizes={wide} />
        </Split>
      </EtudeSection>

      {/* 08 — L'équipe et les partenaires (297:27895) */}
      <EtudeSection id="equipe" {...head(team)}>
        <Split>
          <BrowserFrame image={SHOTS.equipe} capture={team.capture} sizes={wide} />
          <IconRows title={team.listTitle} items={team.items} icons={TEAM_ICONS} />
        </Split>
        <InfoNote text={team.note} textShort={team.noteShort} />
      </EtudeSection>

      {/* 09 — Modernisation et améliorations UX (297:28940) — sans avant / après */}
      <EtudeSection id="refonte" theme="dark" {...head(refonte)}>
        <StatusGrid items={refonte.items} />
        <DarkMentions
          line={refonte.line}
          lineShort={refonte.lineShort}
          visuals={refonte.visuals}
          visualsShort={refonte.visualsShort}
          action={visit(refonte.action, "shrink-0 max-tablet:w-full")}
        />
        <InfoNote text={refonte.note} textShort={refonte.noteShort} dark />
      </EtudeSection>

      {/* 10 — Responsive (297:27786) */}
      <EtudeSection id="responsive" {...head(rsp)}>
        <Split>
          <Reveal as="div" distance={24}>
            <figure className="flex flex-col gap-10 tablet:gap-12">
              <div className="flex flex-col gap-10 tablet:flex-row tablet:items-end tablet:gap-16">
                <Device
                  image={{ ...SHOTS.accueil, alt: rsp.desktopAlt }}
                  kind="screen"
                  sizes="(min-width: 75rem) 396px, (min-width: 48rem) 55vw, 100vw"
                  className="tablet:flex-[396]"
                />
                <div className="flex gap-8 tablet:contents">
                  <Device
                    image={{ ...SHOTS.mRealisations, alt: rsp.realisationsAlt }}
                    kind="phone"
                    sizes="(min-width: 48rem) 123px, 50vw"
                    className="w-1/2 tablet:w-auto tablet:flex-[123]"
                  />
                  <Device
                    image={{ ...SHOTS.mActualites, alt: rsp.actualitesAlt }}
                    kind="phone"
                    sizes="(min-width: 48rem) 123px, 50vw"
                    className="w-1/2 tablet:w-auto tablet:flex-[123]"
                  />
                </div>
              </div>
              <figcaption className="font-medium text-text-primary text-body-s">
                <Short full={rsp.caption} short={rsp.captionShort} />
              </figcaption>
            </figure>
          </Reveal>
          <div className="flex flex-col gap-16 tablet:gap-20">
            <ChipGroup label={rsp.screensTitle} items={rsp.screens} className="[&>h3]:max-tablet:hidden" />
            <CheckRows
              title={rsp.adaptTitle}
              items={rsp.items}
              icons={ADAPT_ICONS}
              className="[&>h3]:max-tablet:hidden"
            />
          </div>
        </Split>
        <InfoNote text={rsp.note} textShort={rsp.noteShort} />
      </EtudeSection>

      {/* 11 — Performance et accessibilité (297:28012) */}
      <EtudeSection id="performance" theme="subtle" {...head(perf)}>
        <PlainFeatures items={perf.items} icons={PERF_ICONS} columns={4} />
        <InfoNote text={perf.note} textShort={perf.noteShort} />
      </EtudeSection>

      {/* 12 — SEO et image de marque (297:27762) */}
      <EtudeSection id="seo" theme="subtle" {...head(seo)} className="desktop:pt-0">
        <BlockFlow
          label={<Short full={seo.label} short={seo.labelShort} />}
          blocks={seo.blocks}
          icons={SEO_ICONS}
        />
        <Reveal
          as="div"
          distance={24}
          className="flex flex-col gap-32 desktop:max-w-[55.875rem] desktop:flex-row desktop:items-start"
        >
          <figure className="overflow-hidden rounded-lg border border-border-default bg-surface-default shadow-md desktop:w-[35.125rem] desktop:shrink-0">
            <Image
              src={SHOTS.og.src}
              alt={seo.ogAlt}
              width={SHOTS.og.width}
              height={SHOTS.og.height}
              sizes="(min-width: 75rem) 562px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="flex flex-col gap-4 bg-background-muted px-12 py-10 tablet:px-16 tablet:py-14">
              <span className="text-text-muted text-body-xs max-tablet:hidden">{seo.ogDomain}</span>
              <span className="font-medium text-text-primary text-body-s max-tablet:hidden">
                {seo.ogTitle}
              </span>
              <span className="text-text-secondary text-body-xs tablet:hidden">{seo.ogNoteShort}</span>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-12 max-tablet:hidden">
            <Image
              src={SHOTS.icone.src}
              alt={seo.iconAlt}
              width={SHOTS.icone.width}
              height={SHOTS.icone.height}
              className="size-96 rounded-lg border border-border-default"
            />
            <figcaption className="flex flex-col gap-12 text-text-secondary text-body-s">
              <span>{seo.iconCaption}</span>
              <span>{seo.ogNote}</span>
            </figcaption>
          </figure>
        </Reveal>
        <PlainFeatures items={seo.items} icons={BRAND_ICONS} />
      </EtudeSection>

      {/* 13 — Architecture technologique (297:27933) */}
      <EtudeSection id="architecture" {...head(arch)}>
        <TechRows rows={arch.rows} icons={LAYER_ICONS} />
        <InfoNote text={arch.note} textShort={arch.noteShort} />
      </EtudeSection>

      {/* 14 — Contact et conversion (297:27706) */}
      <EtudeSection id="contact" {...head(ct)} className="desktop:pt-0">
        <StepChain
          steps={ct.steps}
          icons={CONTACT_ICONS}
          highlightIndex={4}
          highlight={ct.highlight}
          perRow={5}
        />
        <Split>
          <BrowserFrame image={SHOTS.contact} capture={ct.capture} sizes={wide} />
          <div className="flex flex-col gap-16 tablet:gap-20">
            <ChipGroup label={ct.fieldsTitle} items={ct.fields} className="[&>h3]:max-tablet:hidden" />
            <CheckRows
              title={ct.howTitle}
              items={ct.how}
              icons={HOW_ICONS}
              className="[&>h3]:max-tablet:hidden"
            />
          </div>
        </Split>
        <InfoNote text={ct.note} textShort={ct.noteShort} />
      </EtudeSection>

      {/* 15 — Résultat et livraison (297:28022) */}
      <EtudeSection id="resultat" theme="dark" {...head(res)}>
        <StatusGrid items={res.items} />
        <DarkMentions
          line={res.line}
          lineShort={res.lineShort}
          visuals={res.visuals}
          visualsShort={res.visualsShort}
          action={visit(hero.primary, "shrink-0 max-tablet:w-full")}
        />
        <InfoNote text={res.note} textShort={res.noteShort} dark />
      </EtudeSection>

      {/* 16 — Conclusion ZIIIILO (297:28063) */}
      <CtaSection
        title={cta.title}
        description={cta.description}
        descriptionShort={cta.descriptionShort}
        primary={{ label: cta.primary, href: "/realisations" }}
        secondary={{ label: cta.secondary, href: "/contact" }}
      />
    </>
  );
}
