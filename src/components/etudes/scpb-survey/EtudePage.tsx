import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CircleAlert,
  CircleCheck,
  Clock,
  Cloud,
  Database,
  Eye,
  FileText,
  Layers,
  Map,
  MapPin,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  SlidersVertical,
  Smartphone,
  Tag,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { Reveal } from "@/components/motion/text";
import { IconTile } from "@/components/ui/IconTile";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getRealisation, modulesSurvey } from "@/data/realisations";
import { cn } from "@/lib/cn";
import { EtudeHero, EtudeSection, HeroActions, InfoAlert, MentionsBand, Note, Visual } from "../_b3/kit";
import { PlainFeatures, StepChain, type Item } from "../_b3/parts";

/**
 * SCPB Survey — Figma desktop 200:23564, mobile 204:16328 (§7 v2.0). Application Android de
 * collecte terrain réalisée pour SCPB : statut « Pilote en préparation », statut propre à chaque
 * module (10 disponibles, 3 en finalisation, 2 maquettes), écrans conceptuels à données fictives,
 * aucune photo de personne, aucun lien externe. Tablette : grilles en 2 colonnes.
 */

const MEDIA = "/media/realisations/scpb-survey";
const SCREENS = [
  "01-accueil-agent",
  "02-fiche-planteur",
  "03-consentement",
  "04-enquete-menage",
  "05-releve-parcelle",
  "06-synchronisation",
];

const CONTEXT_ICONS: LucideIcon[] = [Users, Map, ShieldCheck, Calendar, Cloud];
const ROLE_ICONS: LucideIcon[] = [Smartphone, MapPin, Target, ShieldCheck, Eye, SlidersVertical];
const STEP_ICONS: LucideIcon[] = [Smartphone, Users, Tag, FileText, Layers, MapPin, RefreshCw, CircleCheck];
const NODE_ICONS: LucideIcon[] = [Smartphone, Database, Users];
const SYNC_ICONS: LucideIcon[] = [Database, Send, RefreshCw, CircleAlert, Users];
const SECURITY_ICONS: LucideIcon[] = [ShieldCheck, Database, Users, Phone, Clock, CircleCheck];
const ARCHI_ICONS: LucideIcon[] = [Smartphone, Database, Cloud, Layers, MapPin, Send, CircleCheck];

const pad = (i: number) => String(i + 1).padStart(2, "0");

type Head = { eyebrow: string; title: string; description: string };
type Role = Item & { scope: "sites" | "all" };
type Module = Item & { status?: string };

export default async function EtudePage() {
  const t = await getTranslations("etude-scpb-survey");
  const realisation = getRealisation("scpb-survey");
  const statuts = await getTranslations("portfolio.statuts");

  const hero = t.raw("hero") as Record<string, string> & { badges: string[] };
  const contexte = t.raw("contexte") as Head & { items: Item[]; note: string };
  const roles = t.raw("roles") as Head & {
    headers: { role: string; does: string; scope: string };
    scopes: Record<Role["scope"], string>;
    items: Role[];
    note: string;
  };
  const fn = t.raw("fonctionnalites") as Head &
    Record<"available" | "finalisation" | "maquette", { label: string; count: string; items: Module[] }> & {
      maquette: { text: string };
    };
  const parcours = t.raw("parcours") as Head & { steps: Item[]; highlight: string };
  const apercu = t.raw("apercu") as Head & { screens: (Item & { alt: string })[]; hint: string };
  const hl = t.raw("horsLigne") as Head & {
    diagramLabel: string;
    nodes: { title: string; items: string[] }[];
    links: { forward: string; back: string }[];
    cards: Item[];
  };
  const secu = t.raw("securite") as Head & { items: Item[]; alert: { title: string; text: string } };
  const archi = t.raw("architecture") as Head & { items: (Item & { chips: string[] })[]; note: string };
  const av = t.raw("avancement") as Head & {
    done: { title: string; items: string[] };
    next: { title: string; label: string; items: Item[] };
  };

  // Les comptes de modules viennent de data/realisations.ts (§3), jamais d'un texte figé.
  const counts = {
    available: modulesSurvey.disponible.length,
    finalisation: Object.keys(modulesSurvey.finalisation).length,
    maquette: modulesSurvey.maquette.length,
  };

  return (
    <>
      <ReadingProgress />

      {/* 01 — Hero */}
      <EtudeHero
        crumb={hero.crumb}
        identity={
          <Image
            src="/media/etudes/scpb-survey/logo-provisoire.svg"
            alt={hero.logoAlt}
            width={176}
            height={61}
            unoptimized
            priority
            className="h-52 w-auto tablet:h-60"
          />
        }
        badges={
          <>
            <StatusBadge tone="dark" className="border-primary-brand">
              {hero.badges[0]}
            </StatusBadge>
            <StatusBadge tone="development">
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
            primary={{ label: hero.primary, href: "#parcours" }}
            secondary={{ label: hero.secondary, href: "/realisations" }}
          />
        }
        note={hero.note}
        visual={
          <Visual
            image={{
              src: "/media/etudes/scpb-survey/hero.webp",
              width: 1273,
              height: 1191,
              alt: hero.visualAlt,
            }}
            priority
            sizes="(min-width: 75rem) 572px, (min-width: 48rem) 80vw, 100vw"
            className="mx-auto max-w-[35.75rem] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] desktop:max-w-none"
          />
        }
      />

      {/* 02 — Contexte et objectifs */}
      <EtudeSection id="contexte" theme="subtle" {...head(contexte)}>
        <div className="flex flex-col gap-40 desktop:gap-56">
          <PlainFeatures items={contexte.items} icons={CONTEXT_ICONS} />
          <Note icon>{contexte.note}</Note>
        </div>
      </EtudeSection>

      {/* 03 — Utilisateurs et rôles */}
      <EtudeSection id="roles" {...head(roles)}>
        <div className="flex flex-col gap-32">
          <Reveal className="overflow-hidden rounded-xl border border-border-default bg-surface-default">
            <table className="w-full border-collapse text-left max-tablet:hidden">
              <thead className="bg-background-subtle">
                <tr>
                  {[roles.headers.role, roles.headers.does, roles.headers.scope].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-24 py-12 font-semibold tracking-wide text-text-secondary uppercase text-body-xs first:w-[28%] last:w-[22%]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.items.map((r, i) => (
                  <tr key={r.title} className="border-t border-border-default">
                    <th scope="row" className="px-24 py-16 align-middle font-medium">
                      <span className="flex items-center gap-12 text-text-primary text-body-m">
                        <RoleIcon icon={ROLE_ICONS[i]} />
                        {r.title}
                      </span>
                    </th>
                    <td className="px-24 py-16 text-text-secondary text-body-s">{r.text}</td>
                    <td className="px-24 py-16">
                      <ScopeChip scope={r.scope} label={roles.scopes[r.scope]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="tablet:hidden">
              {roles.items.map((r, i) => (
                <li
                  key={r.title}
                  className="flex flex-col items-start gap-12 border-border-default p-20 not-first:border-t"
                >
                  <h3 className="flex items-center gap-12 text-body-l font-medium text-text-primary">
                    <RoleIcon icon={ROLE_ICONS[i]} />
                    {r.title}
                  </h3>
                  <p className="text-text-secondary text-body-m">{r.text}</p>
                  <p>
                    <span className="sr-only">{roles.headers.scope} : </span>
                    <ScopeChip scope={r.scope} label={roles.scopes[r.scope]} />
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Note icon>{roles.note}</Note>
        </div>
      </EtudeSection>

      {/* 04 — Fonctionnalités : statut par module */}
      <EtudeSection id="fonctionnalites" {...head(fn)}>
        <div className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] desktop:gap-20">
          <ModuleColumn
            tone="available"
            label={fn.available.label}
            count={fn.available.count.replace(/\d+/, String(counts.available))}
            className="tablet:col-span-2 desktop:col-span-1"
          >
            <ul className="grid gap-12 tablet:grid-cols-2">
              {fn.available.items.map((m) => (
                <li key={m.title} className="flex items-start gap-12 rounded-md bg-background-subtle p-16">
                  <CircleCheck
                    aria-hidden
                    size={16}
                    strokeWidth={1.75}
                    className="mt-4 shrink-0 text-primary-brand"
                  />
                  <span className="flex flex-col gap-4">
                    <span className="font-medium text-text-primary text-body-m">{m.title}</span>
                    <span className="text-text-secondary text-body-xs">{m.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </ModuleColumn>
          <ModuleColumn
            tone="development"
            label={fn.finalisation.label}
            count={fn.finalisation.count.replace(/\d+/, String(counts.finalisation))}
            className="bg-background-subtle"
          >
            <ul className="flex flex-col gap-12">
              {fn.finalisation.items.map((m) => (
                <li
                  key={m.title}
                  className="flex flex-col gap-8 rounded-md border border-border-default bg-surface-default p-16"
                >
                  <span className="font-medium text-text-primary text-body-m">{m.title}</span>
                  <span className="text-text-secondary text-body-xs">{m.text}</span>
                  <span className="mt-4 flex items-start gap-8 rounded-xs bg-background-muted px-8 py-4 text-text-primary text-body-xs">
                    <Clock aria-hidden size={12} strokeWidth={1.75} className="mt-2 shrink-0" />
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
          </ModuleColumn>
          <ModuleColumn
            tone="planned"
            label={fn.maquette.label}
            count={fn.maquette.count.replace(/\d+/, String(counts.maquette))}
            dashed
          >
            <ul className="flex flex-col gap-12">
              {fn.maquette.items.map((m) => (
                <li
                  key={m.title}
                  className="flex flex-col gap-8 rounded-md border border-dashed border-border-strong p-16"
                >
                  <span className="font-medium text-text-primary text-body-m">{m.title}</span>
                  <span className="text-text-secondary text-body-xs">{m.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary text-body-xs">{fn.maquette.text}</p>
          </ModuleColumn>
        </div>
      </EtudeSection>

      {/* 05 — Parcours terrain (Étape/Workflow 101:2082, étape 03 mise en avant) */}
      <EtudeSection id="parcours" theme="subtle" {...head(parcours)}>
        <StepChain
          steps={parcours.steps}
          icons={STEP_ICONS}
          perRow={4}
          highlightIndex={2}
          highlight={parcours.highlight}
          noArrows
        />
      </EtudeSection>

      {/* 06 — Aperçu de l'application : six écrans conceptuels */}
      <EtudeSection id="apercu" {...head(apercu)}>
        <div className="flex flex-col gap-12">
          {/* Bande défilante en mobile : focusable pour défiler au clavier. */}
          <ol
            tabIndex={0}
            className="-mx-(--container-gutter) flex snap-x snap-mandatory gap-16 overflow-x-auto px-(--container-gutter) pb-8 tablet:mx-0 tablet:grid tablet:grid-cols-3 tablet:gap-24 tablet:overflow-visible tablet:px-0 desktop:grid-cols-6 desktop:gap-20"
            aria-label={apercu.title}
          >
            {apercu.screens.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 60}
                className="w-200 shrink-0 snap-start tablet:w-auto"
              >
                <figure className="flex flex-col gap-12">
                  <Image
                    src={`${MEDIA}/${SCREENS[i]}.webp`}
                    alt={s.alt}
                    width={580}
                    height={1180}
                    sizes="(min-width: 75rem) 184px, (min-width: 48rem) 30vw, 200px"
                    className="h-auto w-full"
                  />
                  <figcaption className="flex flex-col gap-4">
                    <span className="flex items-baseline gap-6 font-medium text-text-primary text-body-m">
                      <span className="font-mono! text-primary-brand text-body-xs">{pad(i)}</span>
                      {s.title}
                    </span>
                    <span className="text-text-secondary text-body-xs">{s.text}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ol>
          <p aria-hidden className="text-text-muted text-body-xs tablet:hidden">
            {apercu.hint}
          </p>
        </div>
      </EtudeSection>

      {/* 07 — Hors ligne et synchronisation (schéma en HTML) */}
      <EtudeSection id="hors-ligne" theme="dark" {...head(hl)}>
        <div className="flex flex-col gap-32 desktop:gap-48">
          <Reveal as="div" distance={24}>
            <figure
              aria-label={hl.diagramLabel}
              className="grid items-center gap-8 rounded-xl border border-inverse-line bg-glass-card p-16 tablet:p-24 desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] desktop:p-24"
            >
              {hl.nodes.map((node, i) => {
                const Icon = NODE_ICONS[i];
                const agent = i === 0;
                return (
                  <div key={node.title} className="contents">
                    {i > 0 && <SyncLink {...hl.links[i - 1]} />}
                    <div
                      className={cn(
                        "flex flex-col gap-12 rounded-lg border p-16 tablet:p-20",
                        agent
                          ? "border-primary-brand bg-primary-brand"
                          : "border-inverse-line bg-glass-inverse",
                      )}
                    >
                      <p className="flex items-start gap-8 font-medium text-text-inverse text-body-m">
                        <Icon
                          aria-hidden
                          size={16}
                          strokeWidth={1.75}
                          className={cn("mt-4 shrink-0", agent ? "text-text-inverse" : "text-accent-cyan")}
                        />
                        {node.title}
                      </p>
                      <ul className="flex flex-col gap-8">
                        {node.items.map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "flex items-center gap-8 rounded-xs px-12 py-6 text-text-inverse text-body-s",
                              agent ? "bg-glass-inverse" : "bg-glass-card",
                            )}
                          >
                            <Check
                              aria-hidden
                              size={12}
                              strokeWidth={2}
                              className="shrink-0 text-accent-cyan"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </figure>
          </Reveal>
          <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-3">
            {hl.cards.map((c, i) => {
              const Icon = SYNC_ICONS[i];
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={i * 60}
                  className="flex flex-col gap-12 rounded-lg border border-glass-card-border bg-glass-card p-20 tablet:p-24"
                >
                  <h3 className="flex items-center gap-8 text-text-inverse text-h5">
                    <Icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-accent-cyan" />
                    {c.title}
                  </h3>
                  <p className="text-text-inverse-muted text-body-s">{c.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </EtudeSection>

      {/* 08 — Sécurité et protection des données */}
      <EtudeSection id="securite" {...head(secu)}>
        <div className="flex flex-col gap-40">
          <PlainFeatures items={secu.items} icons={SECURITY_ICONS} />
          <InfoAlert title={secu.alert.title}>{secu.alert.text}</InfoAlert>
        </div>
      </EtudeSection>

      {/* 09 — Architecture technique */}
      <EtudeSection id="architecture" theme="subtle" {...head(archi)}>
        <div className="flex flex-col gap-32">
          <ul className="grid gap-16 tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-20">
            {archi.items.map((a, i) => (
              <Reveal
                as="li"
                key={a.title}
                delay={i * 60}
                className="flex flex-col gap-16 rounded-lg border border-border-default bg-surface-default p-20 tablet:p-24"
              >
                <h3 className="flex items-center gap-12 text-text-primary text-h5">
                  <IconTile icon={ARCHI_ICONS[i]} tone="blue" size="M" />
                  {a.title}
                </h3>
                <ul className="flex flex-wrap gap-8">
                  {a.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-xs border border-border-default bg-background-subtle px-8 py-4 font-mono! text-text-primary text-body-xs"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                <p className="text-text-secondary text-body-s">{a.text}</p>
              </Reveal>
            ))}
          </ul>
          <Note icon>{archi.note}</Note>
        </div>
      </EtudeSection>

      {/* 10 — État d'avancement */}
      <EtudeSection id="avancement" {...head(av)}>
        <div className="grid gap-16 desktop:grid-cols-2 desktop:gap-20">
          <Reveal className="flex flex-col gap-20 rounded-xl border border-border-default bg-background-subtle p-24 tablet:p-32">
            <h3 className="text-text-primary text-h5">{av.done.title}</h3>
            <ul className="flex flex-col gap-16">
              {av.done.items.map((item) => (
                <li key={item} className="flex items-start gap-12 text-text-primary text-body-m">
                  <CircleCheck
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="mt-2 shrink-0 text-primary-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={120}
            className="flex flex-col gap-20 rounded-xl border border-dashed border-border-strong p-24 tablet:p-32"
          >
            <div className="flex flex-wrap items-center justify-between gap-12">
              <h3 className="text-text-primary text-h5">{av.next.title}</h3>
              <span className="rounded-full bg-background-muted px-12 py-4 font-medium text-text-primary text-body-xs">
                {av.next.label}
              </span>
            </div>
            <ol className="flex flex-col gap-16">
              {av.next.items.map((item, i) => (
                <li key={item.title} className="flex items-start gap-12">
                  <span
                    aria-hidden
                    className="flex h-22 min-w-28 shrink-0 items-center justify-center rounded-xs bg-primary-subtle font-mono! text-primary-default text-body-xs"
                  >
                    {pad(i)}
                  </span>
                  <span className="flex flex-col gap-4">
                    <span className="font-medium text-text-primary text-body-m">{item.title}</span>
                    <span className="text-text-secondary text-body-s">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </EtudeSection>

      <MentionsBand
        clientLogo={{
          src: "/media/etudes/clients/scpb.svg",
          width: 290,
          height: 160,
          alt: t("mentions.logoAlt"),
        }}
        title={t("mentions.title")}
        text={t("mentions.text")}
        action={t("mentions.action")}
      />

      <CtaSection
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.primary"), href: "/contact" }}
        secondary={{ label: t("cta.secondary"), href: "/realisations" }}
      />
    </>
  );
}

const head = ({ eyebrow, title, description }: Head) => ({ eyebrow, title, description });

function RoleIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden
      className="flex size-36 shrink-0 items-center justify-center rounded-md bg-primary-subtle text-primary-brand"
    >
      <Icon size={16} strokeWidth={1.75} />
    </span>
  );
}

function ScopeChip({ scope, label }: { scope: Role["scope"]; label: string }) {
  const Icon = scope === "sites" ? MapPin : Building2;
  return (
    <span className="inline-flex items-center gap-6 rounded-full border border-border-default bg-background-subtle px-12 py-6 whitespace-nowrap text-text-primary text-body-s">
      <Icon aria-hidden size={14} strokeWidth={1.75} className="text-primary-brand" />
      {label}
    </span>
  );
}

function ModuleColumn({
  tone,
  label,
  count,
  dashed = false,
  className,
  children,
}: {
  tone: "available" | "development" | "planned";
  label: string;
  count: string;
  dashed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-20 rounded-xl border p-16 tablet:p-24",
        dashed
          ? "border-dashed border-border-strong bg-background-subtle"
          : "border-border-default bg-surface-default",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-12">
        <StatusBadge tone={tone}>{label}</StatusBadge>
        <span className="text-text-secondary text-body-s">{count}</span>
      </div>
      {children}
    </Reveal>
  );
}

/** Liaison du schéma : « Envoi → » / « ← Réception » (verticale en mobile et tablette). */
function SyncLink({ forward, back }: { forward: string; back: string }) {
  return (
    <div className="flex items-center justify-center gap-16 py-4 text-body-xs desktop:flex-col desktop:gap-4 desktop:px-8">
      <span className="flex items-center gap-4 text-accent-cyan">
        {forward}
        <ArrowRight aria-hidden size={12} strokeWidth={2} className="max-desktop:rotate-90" />
      </span>
      <span aria-hidden className="h-1 w-80 bg-inverse-line max-desktop:hidden" />
      <span className="flex items-center gap-4 text-text-inverse-muted">
        <ArrowLeft aria-hidden size={12} strokeWidth={2} className="max-desktop:rotate-90" />
        {back}
      </span>
    </div>
  );
}
