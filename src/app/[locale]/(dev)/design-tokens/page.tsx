import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Planche de contrôle des tokens (étape 1) — à comparer à la page Figma
 * « 00 — Direction artistique » (0:1). Jamais servie en production, sauf si
 * ZIIIILO_DEV_PAGES=1 (tests Playwright).
 */
export const metadata: Metadata = { title: "Design tokens", robots: { index: false, follow: false } };

const PRIMITIVES = [
  ["navy", ["950", "900", "800", "700"]],
  ["blue", ["700", "600", "500", "100", "50"]],
  ["cyan", ["400", "300", "100"]],
  ["violet", ["700", "600", "100"]],
  ["orange", ["500", "100"]],
  ["gold", ["400"]],
  ["teal", ["700", "500", "100"]],
  ["gray", ["0", "25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]],
  ["green", ["600", "100"]],
  ["amber", ["700", "100"]],
  ["red", ["600", "100"]],
] as const;

const SEMANTIC_GROUPS = {
  Primaire: ["primary-default", "primary-hover", "primary-brand", "primary-subtle", "primary-soft"],
  Secondaire: ["secondary-default", "secondary-dark"],
  Accents: [
    "accent-cyan",
    "accent-cyan-soft",
    "accent-violet",
    "accent-violet-soft",
    "accent-orange",
    "accent-orange-soft",
    "accent-gold",
    "accent-teal",
    "accent-teal-strong",
    "accent-teal-soft",
  ],
  Fonds: [
    "background-default",
    "background-subtle",
    "background-muted",
    "background-inverse",
    "background-inverse-raised",
  ],
  Surfaces: ["surface-default", "surface-sunken", "surface-inverse", "surface-inverse-raised"],
  Textes: [
    "text-primary",
    "text-secondary",
    "text-muted",
    "text-inverse",
    "text-inverse-muted",
    "text-link",
    "text-accent-on-dark",
  ],
  Bordures: ["border-default", "border-strong", "border-input", "border-focus", "border-inverse"],
  États: [
    "success-default",
    "success-subtle",
    "warning-default",
    "warning-subtle",
    "error-default",
    "error-subtle",
  ],
} as const;

const TYPE_SCALE = [
  ["text-display-xl", "Display XL — 60/68 · 36/42"],
  ["text-display-l", "Display L — 48/56 · 36/42"],
  ["text-h1", "H1 — 44/52 · 32/40"],
  ["text-h2", "H2 — 36/44 · 28/36"],
  ["text-h3", "H3 — 26/34 · 22/30"],
  ["text-h4", "H4 — 20/28 · 18/26"],
  ["text-h5", "H5 — 17/24"],
  ["text-body-xl", "Body XL — 20/32 · 18/29"],
  ["text-body-l", "Body L — 18/29 · 16/26"],
  ["text-body-m", "Body M — 16/26"],
  ["text-body-s", "Body S — 14/22"],
  ["text-body-xs", "Body XS — 12/18"],
  ["text-label-l", "Label L — 16/20"],
  ["text-label-m", "Label M — 14/20"],
  ["text-label-s", "Label S — 12/16"],
  ["text-overline", "Overline — 12/16"],
  ["text-stat", "Stat — 40/48 · 32/40"],
] as const;

const SPACES = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160] as const;
const RADII = ["xs", "sm", "md", "lg", "xl", "2xl", "full"] as const;
const SHADOWS = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "halo-cyan", "focus-ring"] as const;
const GRADIENTS = ["gradient-hero", "gradient-cta", "gradient-page-header", "gradient-doccloud"] as const;

function Swatch({ token }: { token: string }) {
  return (
    <li className="flex flex-col gap-8">
      <span
        className="block h-56 rounded-md border border-border-default"
        style={{ background: `var(${token})` }}
      />
      <code className="break-all text-text-secondary text-body-xs">{token}</code>
    </li>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-24 border-t border-border-default py-48">
      <h2 className="text-h3">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignTokensPage() {
  if (process.env.NODE_ENV === "production" && process.env.ZIIIILO_DEV_PAGES !== "1") notFound();

  return (
    <div className="container py-64 desktop:py-96">
      <header className="flex flex-col gap-12 pb-48">
        <p className="text-overline text-primary-default">Étape 1 · Fondations</p>
        <h1 className="text-display-l">Design tokens ZIIIILO</h1>
        <p className="max-w-prose text-body-l text-text-secondary">
          Planche de contrôle générée depuis src/styles/tokens.css, à comparer à la page Figma « 00 —
          Direction artistique ».
        </p>
      </header>

      <Block title="Logos">
        <div className="grid gap-24 tablet:grid-cols-3">
          {/* eslint-disable @next/next/no-img-element -- SVG fournis, jamais redessinés ni recolorés (§11) */}
          <div className="flex items-center justify-center rounded-lg border border-border-default p-32">
            <img src="/brand/ziiiilo-logo-couleur.svg" alt="ZIIIILO" width={224} height={112} />
          </div>
          <div className="flex items-center justify-center rounded-lg bg-background-inverse p-32">
            <img src="/brand/ziiiilo-logo-blanc.svg" alt="ZIIIILO" width={224} height={112} />
          </div>
          <div className="flex items-center justify-center rounded-lg border border-border-default p-32">
            <img src="/brand/ziiiilo-symbole.svg" alt="ZIIIILO" width={112} height={112} />
          </div>
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </Block>

      <Block title="Couleurs sémantiques">
        {Object.entries(SEMANTIC_GROUPS).map(([group, tokens]) => (
          <div key={group} className="flex flex-col gap-12">
            <h3 className="text-text-secondary text-label-m">{group}</h3>
            <ul className="grid grid-cols-2 gap-16 tablet:grid-cols-4 desktop:grid-cols-6">
              {tokens.map((t) => (
                <Swatch key={t} token={`--color-${t}`} />
              ))}
            </ul>
          </div>
        ))}
      </Block>

      <Block title="Primitives">
        {PRIMITIVES.map(([hue, steps]) => (
          <ul key={hue} className="grid grid-cols-3 gap-12 tablet:grid-cols-6 desktop:grid-cols-12">
            {steps.map((s) => (
              <Swatch key={s} token={`--primitive-${hue}-${s}`} />
            ))}
          </ul>
        ))}
      </Block>

      <Block title="Typographie">
        <ul className="flex flex-col gap-24">
          {TYPE_SCALE.map(([cls, label]) => (
            <li key={cls} className="flex flex-col gap-4">
              <span className="font-mono text-text-muted text-body-xs">
                .{cls} — {label}
              </span>
              <span className={cls}>Nous imaginons les solutions numériques de demain.</span>
            </li>
          ))}
          <li className="flex flex-col gap-4">
            <span className="font-mono text-text-muted text-body-xs">
              --font-mono — JetBrains Mono 400 / 500
            </span>
            <span className="font-mono text-body-l">01 &lt;/&gt; {"{ziiiilo}"} #%+=*</span>
          </li>
        </ul>
      </Block>

      <Block title="Espacements">
        <ul className="flex flex-col gap-8">
          {SPACES.map((s) => (
            <li key={s} className="flex items-center gap-16">
              <code className="w-1/4 shrink-0 text-text-secondary text-body-xs">--space-{s}</code>
              <span
                className="block h-12 rounded-xs bg-primary-brand"
                style={{ width: `var(--space-${s})` }}
              />
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Rayons, ombres, dégradés">
        <ul className="grid grid-cols-2 gap-24 tablet:grid-cols-4 desktop:grid-cols-7">
          {RADII.map((r) => (
            <li key={r} className="flex flex-col gap-8">
              <span
                className="block h-80 border border-border-strong bg-primary-subtle"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <code className="text-text-secondary text-body-xs">--radius-{r}</code>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-24 tablet:grid-cols-3 desktop:grid-cols-6">
          {SHADOWS.map((s) => (
            <li key={s} className="flex flex-col gap-12">
              <span
                className="block h-80 rounded-lg bg-surface-default"
                style={{ boxShadow: `var(--${s})` }}
              />
              <code className="text-text-secondary text-body-xs">--{s}</code>
            </li>
          ))}
        </ul>
        <ul className="grid gap-24 tablet:grid-cols-2 desktop:grid-cols-4">
          {GRADIENTS.map((g) => (
            <li key={g} className="flex flex-col gap-8">
              <span className="block h-96 rounded-lg" style={{ background: `var(--${g})` }} />
              <code className="text-text-secondary text-body-xs">--{g}</code>
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}
