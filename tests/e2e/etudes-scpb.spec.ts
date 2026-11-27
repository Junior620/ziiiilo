import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Études SCPB commercial, StafTrack et Prévisions Cacao & Robusta (Figma 103:11672, 126:14817,
 * 149:20336 et leurs versions mobiles) : rendu, un seul H1, mentions obligatoires, accessibilité,
 * débordement à 360 px, animations réduites, captures.
 */

const SHOTS = "tests/screenshots/etudes-scpb";

const ETUDES = [
  {
    slug: "scpb-commercial",
    h1: /prospection commerciale internationale/i,
  },
  {
    slug: "staftrack",
    h1: /pointage sur WhatsApp/i,
  },
  {
    slug: "previsions-cacao-robusta",
    h1: /marchés du cacao et du café/i,
  },
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, "débordement horizontal (px)").toBeLessThanOrEqual(0);
}

// Splash déjà vu (il a ses propres vérifications) ; consentement non donné.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => sessionStorage.setItem("ziiiilo-splash-vu", "1"));
});

for (const { slug, h1 } of ETUDES) {
  test(`${slug} : rendu, un seul H1, aucune violation axe grave`, async ({ page }, testInfo) => {
    const response = await page.goto(`/realisations/${slug}`);
    expect(response?.status()).toBe(200);
    await page.getByRole("button", { name: "Tout refuser" }).click();

    const title = page.locator("h1:visible");
    await expect(title).toHaveCount(1);
    await expect(title).toHaveText(h1);
    // Maquettes conceptuelles toujours légendées comme telles : en texte, ou dans le visuel du hero
    // (étiquette intégrée à l'image en desktop, reprise dans son texte alternatif).
    const legend = page
      .getByText(/maquettes? conceptuelles?.{0,4}données fictives/i)
      .or(page.getByRole("img", { name: /maquette conceptuelle.*données fictives/i }))
      .filter({ visible: true });
    await expect(legend.first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      // Les animations de révélation peuvent fausser le contraste mesuré en cours de transition.
      .disableRules(["color-contrast"])
      .analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);

    // Fait défiler la page pour déclencher les révélations avant la capture pleine page.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${SHOTS}/${slug}-${testInfo.project.name}.png`, fullPage: true });
  });
}

test("aucun débordement horizontal à 360 px", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 360, height: 780 });
  for (const { slug } of ETUDES) {
    await page.goto(`/realisations/${slug}`);
    await expectNoHorizontalOverflow(page);
  }
});

test("animations réduites : contenu visible sans défilement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const { slug } of ETUDES) {
    await page.goto(`/realisations/${slug}`);
    // Dernier titre de section (avant le bandeau d'appel) : visible sans attendre une révélation.
    const last = page.locator("main h2").last();
    await last.scrollIntoViewIfNeeded();
    await expect(last).toBeVisible();
    const opacity = await last.evaluate((el) => {
      let node: Element | null = el;
      let min = 1;
      while (node) {
        min = Math.min(min, Number(getComputedStyle(node).opacity));
        node = node.parentElement;
      }
      return min;
    });
    expect(opacity, slug).toBe(1);
  }
});

test.describe("prévisions cacao & robusta : règles du §7", () => {
  test("statut, mentions et liens", async ({ page }) => {
    await page.goto("/realisations/previsions-cacao-robusta");
    const main = page.locator("main");

    await expect(
      main.getByText("Résultats historiques au 20 novembre 2026 — Aucun horizon validé à cette date."),
    ).toBeVisible();
    await expect(main.getByText(/ne garantissent pas l’évolution future des prix/)).toBeAttached();
    await expect(main.getByText(/conseil financier personnalisé/)).toBeAttached();
    // Aucun badge « Validé » ; le MAPE n'est jamais présenté comme une « précision ».
    await expect(main.getByText(/^Validé$/)).toHaveCount(0);
    await expect(main.getByText(/précision du modèle/i)).toHaveCount(0);

    const platform = main.getByRole("link", { name: /Explorer la plateforme/ });
    await expect(platform).toHaveAttribute("href", "https://forecast.ste-scpb.com");
    await expect(platform).toHaveAttribute("target", "_blank");
    await expect(platform).toHaveAttribute("rel", /noopener/);

    await expect(main.getByRole("link", { name: /Discuter d’un projet avec ZIIIILO/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
