#!/usr/bin/env node
/**
 * Télécharge l'export PNG d'un nœud Figma (URL temporaire du MCP) et en découpe une zone,
 * puis l'enregistre en WebP. Sert aux visuels posés dans un composant (ex. visuel de service).
 *
 *   node scripts/crop-figma-export.mjs <url> <dest.webp> <x> <y> <w> <h> [échelle=2]
 * Coordonnées en px Figma (avant échelle).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const [url, dest, x, y, w, h, scaleArg = "2"] = process.argv.slice(2);
const s = Number(scaleArg);
const res = await fetch(url);
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
const input = Buffer.from(await res.arrayBuffer());
await mkdir(dirname(dest), { recursive: true });
const out = await sharp(input)
  .extract({ left: Math.round(+x * s), top: Math.round(+y * s), width: Math.round(+w * s), height: Math.round(+h * s) })
  .webp({ quality: 85, effort: 5 })
  .toBuffer();
await writeFile(dest, out);
console.log(`${dest}  ${Math.round(out.length / 1024)} Ko`);
