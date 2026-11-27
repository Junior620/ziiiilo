import {
  BarChart3,
  Bot,
  Building2,
  CircleCheck,
  Clock,
  Cloud,
  Compass,
  Database,
  Eye,
  FileText,
  Globe,
  Languages,
  Layers,
  LayoutDashboard,
  Mail,
  Map,
  MapPin,
  PanelsTopLeft,
  PenTool,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { Short } from "@/components/produits/parts";
import { StatusBadge } from "@/components/ui/StatusBadge";
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
 * Golden Beans SA — Figma desktop 262:24524, mobile 266:19740 (§7). Plateforme web B2B bilingue
 * en production, captures réelles du 22/11/2026 (260:5374–260:5418, mobile 260:5471). EUDR =
 * préparation documentaire ; cours datés et indicatifs ; carte = données de démonstration ;
 * charte du client montrée comme élément du projet. Tablette : grilles en 2 colonnes.
 */

const MEDIA = "/media/etudes/golden-beans";
const wide = (name: string) => ({ src: `${MEDIA}/${name}.webp`, width: 1523, height: 784 });
const page = (name: string) => ({ src: `${MEDIA}/${name}.webp`, width: 1536, height: 735 });
const SWATCHES = ["cacao", "or", "beige", "ivoire", "brun-profond"].map(
  (c) => `/media/realisations/golden-beans/palette-${c}.svg`,
);

const DEFI_ICONS: LucideIcon[] = [Globe, ShieldCheck, Target, FileText];
const IDENTITY_ICONS: LucideIcon[] = [Eye, PenTool, PanelsTopLeft];
const CATALOGUE_ICONS: LucideIcon[] = [Search, FileText, Send];
const TRACE_STEP_ICONS: LucideIcon[] = [MapPin, Users, Smartphone, Building2, Layers, Send];
const TRACE_ICONS: LucideIcon[] = [Workflow, MapPin, Layers, CircleCheck, FileText];
const CONVERSION_ICONS: LucideIcon[] = [ShoppingBag, FileText, Send, Mail, Users];
const SCHEMA_ICONS: LucideIcon[] = [Users, Database, Globe];
const CMS_ICONS: LucideIcon[] = [PenTool, Layers, Mail];
const AI_ICONS: LucideIcon[] = [Clock, Search, Sparkles, ShieldCheck, Languages, Database, Globe, Mail];
const MARKET_ICONS: LucideIcon[] = [BarChart3, TrendingUp, RefreshCw, Cloud, Eye, LayoutDashboard];
const MAP_ICONS: LucideIcon[] = [Map, Users, Send, Compass];
const ARCHI_ICONS: LucideIcon[] = [PanelsTopLeft, Database, Bot, Map, Mail, ShieldCheck, Cloud];
const QUALITY_ICONS: LucideIcon[] = [Zap, Search, ShieldCheck, CircleCheck];

type Head = {
  eyebrow: string;
  title: string;
  description: string;
  descriptionShort?: string;
  noteShort?: string;
};
type Cap = Capture;
type List = { title: string; items: Item[] };

export default async function EtudePage() {
  const t = await getTranslations("etude-golden-beans");
  const statuts = await getTranslations("portfolio.statuts");
  const realisation = getRealisation("golden-beans");
  const siteUrl = realisation?.siteUrl ?? "https://goldenbeans.cm";

  const hero = t.raw("hero") as Record<string, string> & { badges: string[] };
  const defi = t.raw("defi") as Head & { items: Item[]; note: string };
  const id = t.raw("identite") as Head & {
    capture: Cap;
    palette: { title: string; items: { name: string; value: string }[]; text: string };
    items: Item[];
    note: string;
  };
  const bi = t.raw("bilingue") as Head & { captures: Cap[]; note: string };
  const cat = t.raw("catalogue") as Head & { captures: Cap[]; items: Item[] };
  const tr = t.raw("tracabilite") as Head & { steps: Item[]; capture: Cap; items: Item[]; note: string };
  const conv = t.raw("conversion") as Head & {
    steps: Item[];
    highlight: string;
    capture: Cap;
    chips: { label: string; items: string[] };
    list: List;
    note: string;
  };
  const cms = t.raw("cms") as Head & {
    schema: Item[];
    schemaLabel: string;
    schemaLabelShort?: string;
    items: Item[];
  };
  const auto = t.raw("automatisation") as Head & {
    steps: Item[];
    highlight: string;
    capture: Cap;
    chips: { label: string; items: string[] };
    schedule: List;
    note: string;
  };
  const marche = t.raw("marche") as Head & { items: Item[]; capture: Cap };
  const carte = t.raw("cartographie") as Head & { capture: Cap; list: List; note: string };
  const archi = t.raw("architecture") as Head & {
    rows: { title: string; titleShort?: string; chips: string[] }[];
    note: string;
  };
  const qual = t.raw("qualite") as Head & { items: Item[]; note: string };
  const res = t.raw("resultat") as Head & {
    items: string[];
    itemsShort?: string[];
    line: string;
    lineShort?: string;
    visuals: string;
    visualsShort?: string;
    action: string;
    note: string;
  };

  const split = "grid items-start gap-32 desktop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] desktop:gap-40";

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero : captures réelles desktop et mobile */}
      <EtudeHero
        crumb={hero.crumb}
        identity={null}
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand">
              <Short full={hero.badges[0]} short={hero.badgeShort} />
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
            laptop={wide("01-accueil-fr")}
            laptopAlt={hero.visualAlt}
            chipLaptop={hero.chipCapture}
            chipPhone={hero.chipMobile}
            chipShort={hero.chipShort}
            phone={
              <PhoneFrame>
                <Image
                  src="/media/realisations/golden-beans/m1-accueil-fr.webp"
                  alt={hero.phoneAlt}
                  width={600}
                  height={1130}
                  priority
                  sizes="(min-width: 75rem) 160px, 28vw"
                  className="h-auto w-full"
                />
              </PhoneFrame>
            }
          />
        }
      />

      {/* 02 — Le défi */}
      <EtudeSection id="defi" theme="subtle" {...head(defi)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <PlainFeatures items={defi.items} icons={DEFI_ICONS} columns={4} />
          <Note icon>{defi.note}</Note>
        </div>
      </EtudeSection>

      {/* 03 — Identité digitale (charte du client) */}
      <EtudeSection id="identite" theme="dark" {...head(id)}>
        <div className="flex flex-col gap-48 desktop:gap-64">
          <div className={split}>
            <BrowserFrame image={page("11-usine")} capture={id.capture} dark />
            <Palette {...id.palette} swatches={SWATCHES} />
          </div>
          <PlainFeatures items={id.items} icons={IDENTITY_ICONS} dark />
          <Note icon dark>
            <Short full={id.note} short={id.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 04 — Expérience bilingue */}
      <EtudeSection id="bilingue" {...head(bi)}>
        <div className="flex flex-col gap-32 desktop:gap-40">
          <div className="grid gap-24 tablet:grid-cols-2">
            {bi.captures.map((c, i) => (
              <BrowserFrame
                key={c.url}
                image={wide(["01-accueil-fr", "02-accueil-en"][i])}
                capture={c}
                sizes="(min-width: 75rem) 588px, (min-width: 48rem) 45vw, 100vw"
              />
            ))}
          </div>
          <Note icon>
            <Short full={bi.note} short={bi.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 05 — Catalogue B2B */}
      <EtudeSection id="catalogue" theme="subtle" {...head(cat)}>
        <div className={split}>
          <BrowserFrame image={wide("03-catalogue")} capture={cat.captures[0]} />
          <div className="flex flex-col gap-32">
            <BrowserFrame
              image={wide("05-specifications")}
              capture={cat.captures[1]}
              sizes="(min-width: 75rem) 470px, 100vw"
            />
            <CheckRows items={cat.items} icons={CATALOGUE_ICONS} />
          </div>
        </div>
      </EtudeSection>

      {/* 06 — Traçabilité et EUDR (préparation documentaire) */}
      <EtudeSection id="tracabilite" theme="dark" {...head(tr)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <StepChain steps={tr.steps} icons={TRACE_STEP_ICONS} perRow={6} mobileGrid dark />
          <div className={split}>
            <BrowserFrame image={wide("07-eudr")} capture={tr.capture} dark />
            <IconRows items={tr.items} icons={TRACE_ICONS} dark />
          </div>
          <Note icon dark>
            <Short full={tr.note} short={tr.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 07 — Conversion commerciale (étape 03 mise en avant) */}
      <EtudeSection id="conversion" {...head(conv)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <StepChain
            steps={conv.steps}
            icons={CONVERSION_ICONS}
            perRow={5}
            highlightIndex={2}
            highlight={conv.highlight}
          />
          <div className={split}>
            <BrowserFrame image={page("08-devis")} capture={conv.capture} />
            <div className="flex flex-col gap-32">
              <ChipGroup {...conv.chips} />
              <CheckRows {...conv.list} />
            </div>
          </div>
          <Note icon>{conv.note}</Note>
        </div>
      </EtudeSection>

      {/* 08 — Contenus et CMS (schéma conceptuel) */}
      <EtudeSection id="cms" theme="subtle" {...head(cms)}>
        <div className="flex flex-col gap-48">
          <SchemaFlow
            label={cms.schemaLabel}
            labelShort={cms.schemaLabelShort}
            items={cms.schema}
            icons={SCHEMA_ICONS}
          />
          <PlainFeatures items={cms.items} icons={CMS_ICONS} />
        </div>
      </EtudeSection>

      {/* 09 — Automatisation et IA (étape 04 mise en avant) */}
      <EtudeSection id="automatisation" {...head(auto)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <StepChain
            steps={auto.steps}
            icons={AI_ICONS}
            perRow={4}
            slots={5}
            highlightIndex={3}
            highlight={auto.highlight}
            mobileGrid
          />
          <div className={split}>
            <BrowserFrame image={page("12-ressources")} capture={auto.capture} />
            <div className="flex flex-col gap-32">
              <ChipGroup {...auto.chips} />
              <CheckRows {...auto.schedule} />
            </div>
          </div>
          <Note icon>
            <Short full={auto.note} short={auto.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 10 — Données de marché (cours datés, indicatifs) */}
      <EtudeSection id="marche" theme="dark" {...head(marche)}>
        <div className="grid items-start gap-32 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] desktop:gap-48">
          <IconRows items={marche.items} icons={MARKET_ICONS} dark />
          <BrowserFrame image={page("09-prix-marche")} capture={marche.capture} dark />
        </div>
      </EtudeSection>

      {/* 11 — Cartographie (données de démonstration) */}
      <EtudeSection id="cartographie" {...head(carte)}>
        <div className="flex flex-col gap-40 desktop:gap-48">
          <div className={split}>
            <BrowserFrame image={page("10-carte")} capture={carte.capture} />
            <IconRows {...carte.list} icons={MAP_ICONS} />
          </div>
          <Note icon>
            <Short full={carte.note} short={carte.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 12 — Architecture technologique */}
      <EtudeSection id="architecture" {...head(archi)}>
        <div className="flex flex-col gap-32">
          <TechRows rows={archi.rows} icons={ARCHI_ICONS} />
          <Note icon>
            <Short full={archi.note} short={archi.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      {/* 13 — Qualité */}
      <EtudeSection id="qualite" theme="subtle" {...head(qual)}>
        <div className="flex flex-col gap-40">
          <PlainFeatures items={qual.items} icons={QUALITY_ICONS} columns={4} />
          <Note icon>{qual.note}</Note>
        </div>
      </EtudeSection>

      {/* 14 — Résultat */}
      <EtudeSection id="resultat" theme="dark" {...head(res)}>
        <div className="flex flex-col gap-40">
          <ResultBlock
            items={res.items}
            itemsShort={res.itemsShort}
            line={res.line}
            lineShort={res.lineShort}
            visuals={res.visuals}
            visualsShort={res.visualsShort}
            action={res.action}
            href={siteUrl}
            newTab={hero.newTab}
          />
          <Note icon dark>
            <Short full={res.note} short={res.noteShort} />
          </Note>
        </div>
      </EtudeSection>

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        descriptionShort={t("cta.descriptionShort")}
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
