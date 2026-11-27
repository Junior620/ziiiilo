import {
  BarChart3,
  Building2,
  Cloud,
  Cpu,
  Database,
  Eye,
  FileText,
  Globe,
  Languages,
  Layers,
  Map,
  MapPin,
  PanelsTopLeft,
  PenTool,
  Search,
  Send,
  ShieldCheck,
  SlidersVertical,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { Reveal } from "@/components/motion/text";
import { Short } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { site } from "@/config/site";
import { getRealisation, STATUTS_ACTIFS } from "@/data/realisations";
import { EtudeHero, EtudeSection, HeroActions, Note } from "../_b3/kit";
import {
  BrowserFrame,
  CheckRows,
  ChipGroup,
  DevicesVisual,
  IconRows,
  Palette,
  PhoneFrame,
  PlainFeatures,
  ResultBlock,
  SchemaFlow,
  StepChain,
  TechRows,
  type Capture,
  type Item,
} from "../_b3/parts";

/**
 * STE-SCPB — Figma desktop 233:23711, mobile 240:19126 (§7). Site corporate multilingue en
 * production, captures réelles du 21/11/2026 (231:93–231:129). La vue mobile reste l'emplacement
 * « Capture mobile à insérer » (231:134) : jamais remplacée par une maquette. Le site n'est pas
 * certifié EUDR ; LCP / CLS sont des objectifs ; le schéma Sanity est conceptuel ; CocoaTrack
 * n'apparaît que comme lien vers sa propre étude. Tablette : grilles en 2 colonnes.
 */

const MEDIA = "/media/etudes/ste-scpb";
const shot = (name: string, height = 870) => ({ src: `${MEDIA}/${name}.webp`, width: 1600, height });
const small = (name: string) => ({ src: `${MEDIA}/${name}.webp`, width: 620, height: 297 });
const SWATCHES = ["noir", "or", "bleu", "vert", "ambre"].map(
  (c) => `/media/realisations/ste-scpb/palette-${c}.svg`,
);

const CONTEXT_ICONS: LucideIcon[] = [Layers, Languages, ShieldCheck, Send];
const DESIGN_ICONS: LucideIcon[] = [Sparkles, Target, PanelsTopLeft];
const CATALOGUE_ICONS: LucideIcon[] = [Search, FileText, Send];
const STEP_ICONS: LucideIcon[] = [Users, Search, FileText, Send, Users];
const EUDR_ICONS: LucideIcon[] = [Workflow, MapPin, ShieldCheck, TrendingUp, Map];
const INTL_ICONS: LucideIcon[] = [Building2, Globe, Languages, BarChart3];
const SCHEMA_ICONS: LucideIcon[] = [Users, Database, Globe];
const CMS_ICONS: LucideIcon[] = [PenTool, Database, Languages];
const XP_ICONS: LucideIcon[] = [Cpu, Zap, Eye, PanelsTopLeft, Smartphone, SlidersVertical];
const ARCHI_ICONS: LucideIcon[] = [PanelsTopLeft, Sparkles, Database, Send, Cloud];
const QUALITY_ICONS: LucideIcon[] = [Zap, Search, ShieldCheck, Eye];
const ECO_ICONS: LucideIcon[] = [TrendingUp, BarChart3, Map];
/** Études liées (section 14) : SCPB Commercial, Prévisions, CocoaTrack si publiée. */
const ECO_SLUGS = ["scpb-commercial", "previsions-cacao-robusta", "cocoatrack"] as const;

type Head = { eyebrow: string; title: string; description: string; descriptionShort?: string };
type Cap = Capture;

export default async function EtudePage() {
  const t = await getTranslations("etude-ste-scpb");
  const statuts = await getTranslations("portfolio.statuts");
  const realisation = getRealisation("ste-scpb");
  const siteUrl = realisation?.siteUrl ?? "https://ste-scpb.com";

  const hero = t.raw("hero") as Record<string, string> & { badges: string[] };
  const contexte = t.raw("contexte") as Head & { items: Item[]; note: string };
  const design = t.raw("design") as Head & {
    capture: Cap;
    palette: { title: string; items: { name: string; value: string }[]; text: string };
    items: Item[];
    note: string;
    noteShort: string;
  };
  const multi = t.raw("multilingue") as Head & { captures: Cap[]; note: string; noteShort: string };
  const cat = t.raw("catalogue") as Head & { captures: Cap[]; items: Item[] };
  const devis = t.raw("devis") as Head & {
    steps: Item[];
    highlight: string;
    capture: Cap;
    chips: { label: string; items: string[] };
    commitments: { title: string; items: Item[] };
    note: string;
  };
  const eudr = t.raw("eudr") as Head & { capture: Cap; items: Item[]; note: string };
  const intl = t.raw("international") as Head & {
    capture: Cap;
    list: { title: string; items: Item[] };
    note: string;
  };
  const contenu = t.raw("contenu") as Head & { schemaLabel: string; schema: Item[]; items: Item[] };
  const xp = t.raw("experience") as Head & { items: Item[]; capture: Cap };
  const archi = t.raw("architecture") as Head & { rows: { title: string; chips: string[] }[]; note: string };
  const qual = t.raw("qualite") as Head & { items: Item[]; note: string };
  const res = t.raw("resultat") as Head & {
    items: string[];
    line: string;
    visuals: string;
    action: string;
    note: string;
  };
  const eco = t.raw("ecosysteme") as Head & { items: Item[]; link: string };

  // CocoaTrack : lien vers son étude interne uniquement, et seulement si elle est publiée.
  const ecoItems = eco.items
    .map((item, i) => ({ item, i, slug: ECO_SLUGS[i] }))
    .filter(({ slug }) => slug !== "cocoatrack" || site.publication.cocoatrack);

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero : capture réelle + emplacement mobile à compléter */}
      <EtudeHero
        crumb={hero.crumb}
        identity={null}
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand">
              {hero.badges[0]}
            </StatusBadge>
            <StatusBadge
              tone="available"
              pulse={!!realisation && STATUTS_ACTIFS.includes(realisation.statut)}
            >
              {realisation ? statuts(realisation.statut) : hero.badges[1]}
            </StatusBadge>
            <StatusBadge tone="neutral" className="bg-surface-default text-text-primary">
              {hero.badges[2]}
            </StatusBadge>
          </>
        }
        title={hero.title}
        lead={hero.lead}
        actions={
          <HeroActions
            primary={{ label: hero.primary, externalHref: siteUrl, newTab: hero.newTab }}
            secondary={{ label: hero.secondary, href: "/realisations" }}
          />
        }
        note={hero.note}
        visual={
          <DevicesVisual
            laptop={shot("01-accueil-fr")}
            laptopAlt={hero.visualAlt}
            chipLaptop={hero.chipCapture}
            chipPhone={hero.chipMobile}
            chipShort={hero.chipShort}
            phone={
              <PhoneFrame>
                <div className="flex aspect-[9/19] flex-col items-center justify-center gap-4 bg-background-subtle p-8 text-center">
                  <span className="font-semibold text-text-primary text-body-xs">{hero.phoneTitle}</span>
                  <span className="text-text-muted text-body-xs max-tablet:hidden">{hero.phoneText}</span>
                </div>
              </PhoneFrame>
            }
          />
        }
      />

      {/* 02 — Contexte */}
      <EtudeSection id="contexte" theme="subtle" {...head(contexte)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <PlainFeatures items={contexte.items} icons={CONTEXT_ICONS} columns={4} />
          <Note icon>{contexte.note}</Note>
        </div>
      </EtudeSection>

      {/* 03 — Défi design (palette du client STE-SCPB) */}
      <EtudeSection id="design" theme="dark" {...head(design)}>
        <div className="flex flex-col gap-48 desktop:gap-64">
          <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40">
            <BrowserFrame image={shot("04-catalogue-constellation", 826)} capture={design.capture} dark />
            <Palette {...design.palette} swatches={SWATCHES} />
          </div>
          <PlainFeatures items={design.items} icons={DESIGN_ICONS} dark />
          <Note icon dark>
            <Short full={design.note} short={design.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 04 — Multilingue */}
      <EtudeSection id="multilingue" {...head(multi)}>
        <div className="flex flex-col gap-32 desktop:gap-40">
          <div className="grid gap-24 tablet:grid-cols-2 desktop:grid-cols-3">
            {multi.captures.map((c, i) => (
              <BrowserFrame
                key={c.url + i}
                image={shot(["01-accueil-fr", "02-accueil-en", "03-accueil-ru"][i], [870, 815, 820][i])}
                capture={c}
                crop
                sizes="(min-width: 75rem) 384px, (min-width: 48rem) 45vw, 100vw"
              />
            ))}
          </div>
          <Note icon>
            <Short full={multi.note} short={multi.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 05 — Catalogue */}
      <EtudeSection id="catalogue" theme="subtle" {...head(cat)}>
        <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40">
          <BrowserFrame image={shot("05-catalogue-grille", 818)} capture={cat.captures[0]} />
          <div className="flex flex-col gap-32">
            <BrowserFrame
              image={shot("06-fiche-cacao", 823)}
              capture={cat.captures[1]}
              sizes="(min-width: 75rem) 470px, 100vw"
            />
            <CheckRows items={cat.items} icons={CATALOGUE_ICONS} />
          </div>
        </div>
      </EtudeSection>

      {/* 06 — Parcours commercial (étape 04 mise en avant) */}
      <EtudeSection id="devis" {...head(devis)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <StepChain
            steps={devis.steps}
            icons={STEP_ICONS}
            perRow={5}
            highlightIndex={3}
            highlight={devis.highlight}
          />
          <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40">
            <BrowserFrame image={small("07-devis")} capture={devis.capture} />
            <div className="flex flex-col gap-32">
              <ChipGroup {...devis.chips} />
              <CheckRows {...devis.commitments} />
            </div>
          </div>
          <Note icon>{devis.note}</Note>
        </div>
      </EtudeSection>

      {/* 07 — Traçabilité et EUDR (présentation de la démarche, pas de certification) */}
      <EtudeSection id="eudr" theme="dark" {...head(eudr)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40">
            <BrowserFrame image={small("08-eudr")} capture={eudr.capture} dark />
            <IconRows items={eudr.items} icons={EUDR_ICONS} dark />
          </div>
          <Note icon dark>
            {eudr.note}
          </Note>
        </div>
      </EtudeSection>

      {/* 08 — Présence internationale */}
      <EtudeSection id="international" {...head(intl)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40">
            <BrowserFrame image={small("09-cocoatrack-carte")} capture={intl.capture} />
            <IconRows {...intl.list} icons={INTL_ICONS} />
          </div>
          <Note icon>{intl.note}</Note>
        </div>
      </EtudeSection>

      {/* 09 — Gestion de contenu (schéma conceptuel) */}
      <EtudeSection id="contenu" theme="subtle" {...head(contenu)}>
        <div className="flex flex-col gap-48">
          <SchemaFlow label={contenu.schemaLabel} items={contenu.schema} icons={SCHEMA_ICONS} />
          <PlainFeatures items={contenu.items} icons={CMS_ICONS} />
        </div>
      </EtudeSection>

      {/* 10 — Expérience */}
      <EtudeSection id="experience" theme="dark" {...head(xp)}>
        <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] desktop:gap-48">
          <IconRows items={xp.items} icons={XP_ICONS} dark />
          <BrowserFrame image={small("10-theme-clair")} capture={xp.capture} dark />
        </div>
      </EtudeSection>

      {/* 11 — Architecture technique */}
      <EtudeSection id="architecture" {...head(archi)}>
        <div className="flex flex-col gap-32">
          <TechRows rows={archi.rows} icons={ARCHI_ICONS} />
          <Note icon>{archi.note}</Note>
        </div>
      </EtudeSection>

      {/* 12 — Qualité (objectifs, pas de mesures) */}
      <EtudeSection id="qualite" theme="subtle" {...head(qual)}>
        <div className="flex flex-col gap-40">
          <PlainFeatures items={qual.items} icons={QUALITY_ICONS} columns={4} />
          <Note icon>{qual.note}</Note>
        </div>
      </EtudeSection>

      {/* 13 — Résultat */}
      <EtudeSection id="resultat" theme="dark" {...head(res)}>
        <div className="flex flex-col gap-40">
          <ResultBlock
            items={res.items}
            line={res.line}
            visuals={res.visuals}
            action={res.action}
            href={siteUrl}
            newTab={hero.newTab}
          />
          <Note icon dark>
            {res.note}
          </Note>
        </div>
      </EtudeSection>

      {/* 14 — Écosystème SCPB : liens vers les autres études */}
      <EtudeSection id="ecosysteme" {...head(eco)}>
        <ul className="grid gap-32 tablet:grid-cols-2 desktop:grid-cols-3">
          {ecoItems.map(({ item, i, slug }) => (
            <Reveal as="li" key={item.title} delay={i * 60} className="flex flex-col items-start gap-16">
              <IconTile icon={ECO_ICONS[i]} tone="blue" size="M" />
              <h3 className="text-text-primary text-h5">{item.title}</h3>
              <p className="-mt-4 text-text-secondary text-body-s">{item.text}</p>
              <Button
                href={{ pathname: "/realisations/[slug]", params: { slug } }}
                variant="ghost"
                size="M"
                aria-label={`${eco.link} ${item.title}`}
              >
                {eco.link}
              </Button>
            </Reveal>
          ))}
        </ul>
      </EtudeSection>

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.primary"), href: "/realisations" }}
        secondary={{ label: t("cta.secondary"), href: "/contact" }}
      />
    </>
  );
}

const head = ({ eyebrow, title, description, descriptionShort }: Head) => ({
  eyebrow,
  title,
  description,
  descriptionShort,
});
