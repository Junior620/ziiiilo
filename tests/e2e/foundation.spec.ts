import { expect, test, type Page } from "@playwright/test";

/** Étape 1 — fondations : rendu, langue, 404 de /en, polices, débordement, captures. */

const SHOTS = "tests/screenshots/etape-1";

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, "débordement horizontal (px)").toBeLessThanOrEqual(0);
}

test.describe("fondations", () => {
  test("accueil : rendu, langue, polices, lien d'évitement", async ({ page }, testInfo) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("img", { name: "ZIIIILO" })).toBeVisible();

    // Polices auto-hébergées par next/font et chargées
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return ["Sora", "Inter"].map((f) => document.fonts.check(`16px ${f}`));
    });
    expect(fonts).toEqual([true, true]);

    // Premier élément focalisable : « Aller au contenu »
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();

    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: `${SHOTS}/accueil-${testInfo.project.name}.png`, fullPage: true });
  });

  test("planche des tokens", async ({ page }, testInfo) => {
    const response = await page.goto("/design-tokens");
    expect(response?.status()).toBe(200);
    // Les tokens sémantiques résolvent vers les primitives du §4
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-primary-default").trim(),
    );
    expect(primary.toLowerCase()).toBe("#0e74b0"); // = --primitive-blue-600
    const bg = await page.evaluate(() => {
      const el = document.createElement("div");
      el.style.background = "var(--color-primary-default)";
      document.body.append(el);
      return getComputedStyle(el).backgroundColor;
    });
    expect(bg).toBe("rgb(14, 116, 176)");

    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: `${SHOTS}/tokens-${testInfo.project.name}.png`, fullPage: true });
  });

  test("aucun débordement horizontal à 360 px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    for (const path of ["/", "/design-tokens"]) {
      await page.goto(path);
      await expectNoHorizontalOverflow(page);
    }
  });

  test("anglais non publié : /en et /en/work renvoient 404", async ({ page }) => {
    for (const path of ["/en", "/en/work", "/en/about"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(404);
    }
  });

  test("adresse inconnue : 404 localisée", async ({ page }) => {
    const response = await page.goto("/page-qui-n-existe-pas");
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByText("404")).toBeVisible();
  });

  test("aucun cookie déposé à la première visite", async ({ page, context }) => {
    await page.goto("/");
    expect(await context.cookies()).toEqual([]);
  });
});
