# ZIIIILO — site vitrine (ziiiilo.tech)

@AGENTS.md

**Source de vérité : [docs/DESIGN.md](docs/DESIGN.md)** (guide de design, à relire en entier avant de coder ; en cas de doute, il fait foi). Maquettes : Figma `G9fhCfbvi9MiIgojXaZ54w` (desktop page 02, mobile 03, tablette 03b, design system 01, animations 08), lues via le MCP Figma avec les nodeId du guide.

## Règles non négociables

- Aucune donnée inventée (clients, chiffres, témoignages, captures, coordonnées). Les valeurs « À configurer » restent vides dans `src/config/site.ts` et leur bloc est masqué.
- Logo jamais redessiné ni recoloré : SVG de `public/brand/` (§11).
- Aucune couleur, taille ou espacement codé en dur : tokens de `src/styles/tokens.css` uniquement (`pnpm check:tokens`).
- Textes FR repris de Figma dans `src/content/fr.json` ; `en.json` est une traduction à relire, `/en` reste masqué (`features.showEnglish`).
- CocoaTrack : publication soumise à STE-SCPB (`publication.cocoatrack`), aucun lien externe.
- Aucun cookie de mesure avant consentement. Accessibilité WCAG 2.2 AA (§10). Mobile d'abord, aucun débordement à 360 px.
- Ne pas coder : cadres « Archive », « Design review », page 07, annotations internes.

## Pile

Next.js 16 (App Router, Cache Components, `src/proxy.ts`), TypeScript strict, pnpm, Tailwind CSS v4 (thème = tokens, valeurs par défaut retirées), next-intl (`next/root-params`, FR à la racine, `/en` traduit), motion, lucide-react, react-hook-form + zod, Resend.

Classes utiles : `bg-primary-default`, `text-text-secondary`, `p-24` (= `--space-24`), `rounded-lg`, `shadow-md`, `font-display`, `text-h2`, `container`, préfixes `tablet:` (≥ 768) et `desktop:` (≥ 1200).

## Commandes

- `pnpm dev` — serveur local · `pnpm build` / `pnpm start`
- `pnpm lint` (ESLint + check:tokens) · `pnpm typecheck` · `pnpm format`
- `pnpm test:e2e` — Playwright 390 / 834 / 1440 px, captures dans `tests/screenshots/`

## Arborescence

`src/app/[locale]/…` (dossiers = chemins FR, routes dans `src/i18n/routing.ts`) · `src/components/{ui,layout,cards,motion,brand,sections}` · `src/config/site.ts` · `src/content/{fr,en}.json` · `src/data/` (réalisations, services) · `src/styles/tokens.css`.
