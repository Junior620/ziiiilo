#!/usr/bin/env node
/**
 * Ajoute des dimensions de composant (`--size-N`) aux tokens et leur alias Tailwind
 * (`--spacing-N`), pour les cotes Figma qui ne sont pas sur l'échelle d'espacement.
 *
 *   node scripts/add-sizes.mjs 30 76 224
 */
import { readFileSync, writeFileSync } from "node:fs";

const tokensPath = "src/styles/tokens.css";
const globalsPath = "src/app/globals.css";
const sizes = process.argv
  .slice(2)
  .map(Number)
  .filter((n) => Number.isFinite(n) && n > 0);

let tokens = readFileSync(tokensPath, "utf8");
let globals = readFileSync(globalsPath, "utf8");

const existing = new Set([...tokens.matchAll(/--size-(\d+):/g)].map((m) => Number(m[1])));
const all = [...new Set([...existing, ...sizes])].sort((a, b) => a - b);
const added = sizes.filter((n) => !existing.has(n));
if (!added.length) {
  console.log("Rien à ajouter.");
  process.exit(0);
}

tokens = tokens.replace(/(  --size-\d+: \d+px;\n)+/, all.map((n) => `  --size-${n}: ${n}px;\n`).join(""));
globals = globals.replace(
  /(  --spacing-\d+: var\(--size-\d+\);\n)+/,
  all.map((n) => `  --spacing-${n}: var(--size-${n});\n`).join(""),
);

writeFileSync(tokensPath, tokens);
writeFileSync(globalsPath, globals);
console.log(`Ajouté : ${added.join(", ")}`);
