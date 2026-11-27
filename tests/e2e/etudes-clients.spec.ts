import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Études clients B4 : Ninety One Foot Academy (278:25463 / 281:20482), Agora Film Invest
 * (297:27498 / 300:22316) et CocoaTrack (319:1014 / 325:1796) : rendu, un seul H1, légendes des
 * captures et maquettes, lien « Visiter le site » (nouvel onglet, seulement si `siteUrl`), aucun
 * lien externe pour CocoaTrack, accessibilité, débordement à 360 px, animations réduites, captures.
 */

const SHOTS = "tests/screenshots/etudes-clients";

const ETUDES = [
  {
    slug: "ninety-one-foot-academy",
    h1: /nouvelle génération de talents du football/i,
    legend: /capture réelle|maquette conceptuelle/i,
    site: { name: /Visiter le site officiel/, href: "https://www.ninetyonefootacademy.com/fr/accueil" },
  },
  {
    slug: "agora-film-invest",
    h1: /ambition cinématographique internationale/i,
    legend: /capture réelle/i,
    site: { name: /Visiter Agora Film Invest/, href: "https://www.agorafilminvest.com/" },
  },
  {
    slug: "cocoatrack",
    h1: /nouvelle dimension de la traçabilité agricole/i,
    legend: /maquette conceptuelle — données fictives/i,
    site: null,
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

for (const { slug, h1, legend, site } of ETUDES) {
  test(`${slug} : rendu, un seul H1, aucune violation axe grave`, async ({ page }, testInfo) => {
    const response = await page.goto(`/realisations/${slug}`);
    expect(response?.status()).toBe(200);
    await page.getByRole("button", { name: "Tout refuser" }).click();

    const title = page.locator("h1:visible");
    await expect(title).toHaveCount(1);
    await expect(title).toHaveText(h1);
    await expect(page.locator("main").getByText(legend).filter({ visible: true }).first()).toBeVisible();
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

  test(`${slug} : lien vers le site du client`, async ({ page }) => {
    await page.goto(`/realisations/${slug}`);
    const main = page.locator("main");
    if (!site) {
      // CocoaTrack : solution interne, aucun lien sortant dans le contenu de l'étude.
      await expect(main.locator('a[href^="http"]')).toHaveCount(0);
      return;
    }
    const links = main.getByRole("link", { name: site.name });
    await expect(links.first()).toBeAttached();
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", site.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
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

test("cocoatrack : onde d'alerte sur les parcelles fictives", async ({ page }) => {
  await page.goto("/realisations/cocoatrack");
  const map = page.locator("#cartographie");
  await map.scrollIntoViewIfNeeded();
  const wave = map.locator("span.border-accent-orange").filter({ visible: true }).first();
  await expect(wave).toBeAttached();
  // Animation lancée à l'écran, en pause hors écran.
  await expect
    .poll(() =>
      wave.evaluate((el) =>
        el
          .getAnimations()
          .map((a) => a.playState)
          .join(),
      ),
    )
    .toBe("running");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      wave.evaluate((el) =>
        el
          .getAnimations()
          .map((a) => a.playState)
          .join(),
      ),
    )
    .toBe("paused");
});
