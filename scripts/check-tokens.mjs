#!/usr/bin/env node
/**
 * Garde-fou « aucune valeur codée en dur » (docs/DESIGN.md §1, §4).
 * Refuse dans src/app et src/components (.ts, .tsx, .css hors tokens) :
 *  - les couleurs hex, rgb(), hsl(), oklch() ;
 *  - les classes Tailwind arbitraires de couleur (bg-[…], text-[#…]…) ;
 *  - les espacements arbitraires en px (p-[13px], gap-[10px], mt-[…px]…).
 * Exceptions : ajouter le commentaire `tokens-ok` sur la ligne, avec une justification.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src/app", "src/components"];
const ALLOWED_FILES = new Set(["src/app/globals.css", "src/app/icon.svg"]);
const EXT = /\.(tsx?|css)$/;

const RULES = [
  { name: "couleur hex", re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g },
  { name: "fonction couleur", re: /\b(?:rgba?|hsla?|oklch|oklab)\(/g },
  {
    name: "couleur arbitraire",
    re: /\b(?:bg|text|border|fill|stroke|from|via|to|ring|outline|shadow|decoration)-\[(?:#|rgb|hsl|color:)/g,
  },
  {
    name: "espacement arbitraire",
    re: /(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|top|right|bottom|left|start|end|scroll-p|scroll-m)-\[\d[\d.]*px\]/g,
  },
];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : EXT.test(name) ? [path] : [];
  });

let errors = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = relative(process.cwd(), file).replaceAll("\\", "/");
    if (ALLOWED_FILES.has(rel)) continue;
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (line.includes("tokens-ok")) return;
        for (const { name, re } of RULES) {
          for (const m of line.matchAll(re)) {
            errors++;
            console.error(`${rel}:${i + 1}  ${name} : ${m[0]}`);
          }
        }
      });
  }
}

if (errors) {
  console.error(`\n${errors} valeur(s) codée(s) en dur. Utiliser les tokens de src/styles/tokens.css.`);
  process.exit(1);
}
console.log("check:tokens — aucune valeur codée en dur.");
