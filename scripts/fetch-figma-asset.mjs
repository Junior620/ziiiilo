#!/usr/bin/env node
/**
 * Télécharge un asset exporté par le MCP Figma (URL temporaire) et le range dans public/.
 *
 *   node scripts/fetch-figma-asset.mjs <url> <destination> [--width=1600] [--quality=82]
 *
 * - destination en .webp : conversion WebP (sharp), largeur max optionnelle ;
 * - destination en .svg / .png : copie telle quelle (logos, icônes : jamais retouchés).
 * Plusieurs paires peuvent être passées : <url1> <dest1> <url2> <dest2> …
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const opts = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));
const pairs = args.filter((a) => !a.startsWith("--"));
if (pairs.length < 2 || pairs.length % 2) {
  console.error("Usage : fetch-figma-asset.mjs <url> <destination> [<url> <destination> …]");
  process.exit(1);
}

const width = opts.width ? Number(opts.width) : undefined;
const quality = opts.quality ? Number(opts.quality) : 82;

for (let i = 0; i < pairs.length; i += 2) {
  const [url, dest] = [pairs[i], pairs[i + 1]];
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const input = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });

  if (extname(dest) === ".webp") {
    let img = sharp(input);
    if (width) img = img.resize({ width, withoutEnlargement: true });
    const out = await img.webp({ quality, effort: 5 }).toBuffer();
    const meta = await sharp(out).metadata();
    await writeFile(dest, out);
    console.log(`${dest}  ${meta.width}×${meta.height}  ${Math.round(out.length / 1024)} Ko`);
  } else {
    await writeFile(dest, input);
    console.log(`${dest}  ${Math.round(input.length / 1024)} Ko`);
  }
}
