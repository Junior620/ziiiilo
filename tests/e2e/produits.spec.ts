import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Pages produit FleetRent (15:2676 / 24:2440) et DocCloud (90:11552 / 92:9403) : rendu, un seul H1,
 * débordement à 360 px, axe, et règles de contenu du §7 (statuts, données fictives, aucun montant).
 */

const PRODUCTS = [
  ["fleetrent", "/solutions/fleetrent"],
  ["doccloud", "/solutions/doccloud"],
] as const;

async function overflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

/** Badges de statut visibles dans une section (les badges sont dupliqués mobile / desktop). */
function visibleBadges(page: Page, sectionTitleId: string, label: string) {
  return page
    .locator(`section[aria-labelledby="${sectionTitleId}"]`)
    .getByText(label, { exact: true })
    .filter({ visible: true });
}

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => sessionStorage.setItem("ziiiilo-splash-vu", "1"));
});

for (const [name, path] of PRODUCTS) {
  test(`${name} : rendu, un seul H1, aucun débordement, aucune violation axe grave`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1:visible")).toHaveCount(1);
    expect(await overflow(page), "débordement horizontal (px)").toBeLessThanOrEqual(0);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      // Les animations de révélation peuvent fausser le contraste mesuré en cours de transition.
      .disableRules(["color-contrast"])
      .analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });

  test(`${name} : aucun débordement à 360 px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(path);
    expect(await overflow(page), "débordement horizontal (px)").toBeLessThanOrEqual(0);
  });
}

test("FleetRent : 6 « En développement », 2 « Prévu », rien de « Disponible »", async ({ page }) => {
  await page.goto("/solutions/fleetrent");
  await expect(visibleBadges(page, "fonctionnalites-title", "En développement")).toHaveCount(6);
  await expect(visibleBadges(page, "fonctionnalites-title", "Prévu")).toHaveCount(2);
  await expect(page.getByText("Disponible", { exact: true }).filter({ visible: true })).toHaveCount(0);
  // Le lien vers le site officiel reste masqué tant que l'URL n'est pas configurée.
  await expect(page.getByRole("link", { name: /Visiter le site FleetRent/ })).toHaveCount(0);
});

test("FleetRent : aperçu de l'interface sur desktop uniquement, données d'illustration", async ({
  page,
}, testInfo) => {
  await page.goto("/solutions/fleetrent");
  const preview = page.locator('section[aria-labelledby="apercu-title"]');
  if (testInfo.project.name === "desktop-1440") {
    await expect(preview).toBeVisible();
    await expect(preview.getByText(/données d’illustration/)).toBeVisible();
    await expect(preview.getByRole("img")).toHaveAttribute("alt", /Données d’illustration/);
  } else {
    await expect(preview).toBeHidden();
  }
});

test("DocCloud : « En développement » visible, piliers « En conception », aucun montant ni certification", async ({
  page,
}) => {
  await page.goto("/solutions/doccloud");
  await expect(page.locator("[data-hero]").getByText("En développement", { exact: true })).toBeVisible();
  await expect(visibleBadges(page, "piliers-title", "En conception")).toHaveCount(6);
  await expect(page.getByText("Disponible", { exact: true }).filter({ visible: true })).toHaveCount(0);
  // Les 7 statuts du dossier, de la déclaration à la restitution.
  await expect(
    page.locator('section[aria-labelledby="fonctionnement-title"] ol').last().locator("li"),
  ).toHaveCount(7);
  // Aucun montant affiché (frais, récompense).
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/\d[\d\s.,]*\s?(F\s?CFA|FCFA|XAF|€|\$)/i);
  // « Aucune certification… n’est revendiquée » (desktop) ou « pas une certification : … » (mobile).
  await expect(
    page.getByText(/certification.*réglementaire n’est revendiquée/).filter({ visible: true }),
  ).toHaveCount(1);
  // Visuels : documents fictifs étiquetés.
  await expect(page.locator('[data-hero] img[alt*="fictifs"]').filter({ visible: true })).toHaveCount(1);
});

test("DocCloud : « Voir le fonctionnement » défile jusqu'à la section 4", async ({ page }) => {
  await page.goto("/solutions/doccloud");
  const banner = page.getByRole("button", { name: "Tout refuser" });
  if (await banner.isVisible()) await banner.click();
  await page.getByRole("link", { name: "Voir le fonctionnement" }).click();
  await expect(page).toHaveURL(/#fonctionnement$/);
  await expect(page.locator("#fonctionnement-title")).toBeInViewport();
});
