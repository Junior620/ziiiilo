import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Études SCPB Survey, STE-SCPB et Golden Beans SA (Figma 200:23564, 233:23711, 262:24524 et leurs
 * versions mobiles) : rendu, un seul H1, règles de contenu du §7, liens du §9, accessibilité,
 * débordement à 360 px, animations réduites, captures.
 */

const SHOTS = "tests/screenshots/etudes-b3";

const ETUDES = [
  { slug: "scpb-survey", h1: /collecte terrain du cacao, même sans réseau/i },
  { slug: "ste-scpb", h1: /agriculture camerounaise aux marchés internationaux/i },
  { slug: "golden-beans", h1: /cacao et le café camerounais aux marchés internationaux/i },
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
    await expectNoHorizontalOverflow(page);

    // Liens externes : nouvel onglet, sans accès à la page d'origine (§9).
    const external = page.locator('main a[href^="http"]');
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }

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

test.describe("règles de contenu du §7", () => {
  test("SCPB Survey : statuts par module, alerte obligatoire, aucun lien externe", async ({ page }) => {
    await page.goto("/realisations/scpb-survey");
    const main = page.locator("main");

    await expect(main.getByText("Pilote en préparation").first()).toBeVisible();
    await expect(main.getByText("10 modules")).toBeVisible();
    await expect(main.getByText("3 modules")).toBeVisible();
    await expect(main.getByText("2 modules")).toBeVisible();
    await expect(main.getByText("À venir — non livré")).toBeVisible();
    await expect(main.getByText("Données personnelles et protection de l’enfant")).toBeVisible();
    // Écrans conceptuels légendés comme tels : étiquette du hero (desktop) ou texte alternatif.
    const legend = main
      .getByText(/données fictives/i)
      .or(main.getByRole("img", { name: /données fictives/i }))
      .filter({ visible: true });
    await expect(legend.first()).toBeVisible();
    await expect(main.locator('a[href^="http"]')).toHaveCount(0);

    // Le premier bouton du hero mène au parcours terrain.
    await expect(main.getByRole("link", { name: "Voir le parcours terrain" })).toHaveAttribute(
      "href",
      "#parcours",
    );
  });

  test("STE-SCPB : emplacement mobile, pas de certification EUDR, liens vers les études SCPB", async ({
    page,
  }) => {
    await page.goto("/realisations/ste-scpb");
    const main = page.locator("main");

    // La vue mobile reste un emplacement à compléter, jamais remplacée par une maquette.
    await expect(main.getByText("Capture mobile à insérer")).toBeVisible();
    await expect(main.getByText(/n’est pas lui-même certifié/)).toBeVisible();
    await expect(main.getByText(/Ce sont des cibles, pas des résultats mesurés/)).toBeVisible();
    await expect(main.getByText(/ce n’est pas une capture du back-office Sanity/)).toBeVisible();

    const site = main.getByRole("link", { name: /Visiter le site web/ });
    await expect(site).toHaveAttribute("href", "https://ste-scpb.com");
    await expect(main.getByRole("link", { name: /Voir la réalisation SCPB Commercial/ })).toHaveAttribute(
      "href",
      "/realisations/scpb-commercial",
    );
    await expect(
      main.getByRole("link", { name: /Voir la réalisation Prévisions Cacao & Robusta/ }),
    ).toHaveAttribute("href", "/realisations/previsions-cacao-robusta");
    // CocoaTrack : uniquement un lien interne vers son étude, jamais vers un site externe.
    await expect(main.locator('a[href*="cocoatrack"]:not([href^="/realisations/"])')).toHaveCount(0);
  });

  test("Golden Beans : EUDR documentaire, cours datés, carte de démonstration", async ({ page }) => {
    await page.goto("/realisations/golden-beans");
    const main = page.locator("main");

    await expect(
      main
        .getByText(/préparation documentaire/i)
        .filter({ visible: true })
        .first(),
    ).toBeVisible();
    await expect(
      main.getByText(/Capture réelle du 22\/11\/2026 — cours affichés à cette date/),
    ).toBeVisible();
    await expect(
      main
        .getByText(/données de démonstration/)
        .filter({ visible: true })
        .first(),
    ).toBeVisible();
    await expect(main.getByRole("link", { name: /Visiter Golden Beans/ }).first()).toHaveAttribute(
      "href",
      "https://goldenbeans.cm",
    );
  });
});
