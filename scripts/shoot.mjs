#!/usr/bin/env node
/**
 * Captures pleine page pour comparer aux maquettes Figma (étape de vérification visuelle).
 *
 *   node scripts/shoot.mjs <chemin> [largeurs=1440,390] [dossier=tests/screenshots/pages]
 *
 * Contourne le splash (sessionStorage), accepte le choix cookies « tout refuser » et émule
 * `prefers-reduced-motion` pour obtenir l'état final des animations.
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const [path = "/", widthsArg = "1440,390", outDir = "tests/screenshots/pages"] = process.argv.slice(2);
const base = process.env.BASE_URL ?? "http://localhost:3000";
const widths = widthsArg.split(",").map(Number);
const name =
  path === "/"
    ? "accueil"
    : path
        .replace(/^\//, "")
        .replaceAll("/", "-")
        .replace(/[?#].*/, "");

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    reducedMotion: "reduce",
    isMobile: width < 768,
    hasTouch: width < 1200,
    locale: "fr-FR",
  });
  await context.addInitScript(() => sessionStorage.setItem("ziiiilo-splash-vu", "1"));
  await context.addCookies([
    {
      name: "ziiiilo-consent",
      value: encodeURIComponent(JSON.stringify({ necessary: true, analytics: false, v: 1 })),
      url: base,
    },
  ]);
  const page = await context.newPage();
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const file = `${outDir}/${name}-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${file}${overflow > 0 ? `  ⚠ débordement horizontal de ${overflow}px` : ""}`);
  await context.close();
}
await browser.close();
