import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Couleurs des images Open Graph, lues dans `src/styles/tokens.css` (primitives du §4) :
 * Satori ne connaît pas les variables CSS, mais aucune valeur n'est recopiée à la main.
 */
const css = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");
const primitives = new Map(
  [...css.matchAll(/--primitive-([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map(([, name, hex]) => [name, hex]),
);

export function primitive(name: string): string {
  const value = primitives.get(name);
  if (!value) throw new Error(`Token --primitive-${name} introuvable dans tokens.css`);
  return value;
}

/** Même couleur avec une opacité (bordures et voiles « verre » sur fond sombre). */
export function alpha(name: string, opacity: number): string {
  const hex = primitive(name).slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
