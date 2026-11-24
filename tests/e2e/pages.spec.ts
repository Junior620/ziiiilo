import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Pages principales : rendu, débordement, accessibilité, formulaire, filtres, captures. */

const SHOTS = "tests/screenshots/pages";

const PAGES = [
  ["accueil", "/"],
  ["services", "/services"],
  ["service-applications-mobiles", "/services/applications-mobiles"],
  ["solutions", "/solutions"],
  ["a-propos", "/a-propos"],
  ["realisations", "/realisations"],
  ["contact", "/contact"],
  ["faq", "/faq"],
  ["mentions-legales", "/mentions-legales"],
  ["confidentialite", "/confidentialite"],
  ["politique-cookies", "/politique-cookies"],
  ["conditions-utilisation", "/conditions-utilisation"],
  ["produit-fleetrent", "/solutions/fleetrent"],
  ["produit-doccloud", "/solutions/doccloud"],
  ["etude-scpb-commercial", "/realisations/scpb-commercial"],
  ["etude-staftrack", "/realisations/staftrack"],
  ["etude-previsions-cacao-robusta", "/realisations/previsions-cacao-robusta"],
  ["etude-scpb-survey", "/realisations/scpb-survey"],
  ["etude-ste-scpb", "/realisations/ste-scpb"],
  ["etude-golden-beans", "/realisations/golden-beans"],
  ["etude-ninety-one-foot-academy", "/realisations/ninety-one-foot-academy"],
  ["etude-agora-film-invest", "/realisations/agora-film-invest"],
  ["etude-cocoatrack", "/realisations/cocoatrack"],
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, "débordement horizontal (px)").toBeLessThanOrEqual(0);
}

/** Le bandeau cookies couvre le bas de l'écran en mobile : on refuse, comme un visiteur. */
async function refuseCookies(page: Page) {
  await page.getByRole("button", { name: "Tout refuser" }).click();
}

// Splash déjà vu (le splash a ses propres vérifications) ; consentement non donné.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => sessionStorage.setItem("ziiiilo-splash-vu", "1"));
});

for (const [name, path] of PAGES) {
  test(`${name} : rendu, un seul H1, aucune violation axe grave`, async ({ page }, testInfo) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1:visible")).toHaveCount(1);
    await expectNoHorizontalOverflow(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      // Les animations de révélation peuvent fausser le contraste mesuré en cours de transition.
      .disableRules(["color-contrast"])
      .analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);

    await page.screenshot({ path: `${SHOTS}/${name}-${testInfo.project.name}.png`, fullPage: true });
  });
}

test("aucun débordement horizontal à 360 px", async ({ page }) => {
  test.setTimeout(360_000);
  await page.setViewportSize({ width: 360, height: 780 });
  for (const [, path] of PAGES) {
    await page.goto(path);
    await expectNoHorizontalOverflow(page);
  }
});

test.describe("contact", () => {
  test("erreurs, focus, envoi simulé et confirmation", async ({ page }) => {
    await page.goto("/contact?service=applications-mobiles");
    await refuseCookies(page);
    const mobile = page.getByRole("checkbox", { name: "Application mobile" });
    await expect(mobile).toBeChecked();
    await mobile.uncheck({ force: true });

    await page.getByRole("button", { name: "Envoyer ma demande" }).click();
    await expect(page.getByRole("alert").first()).toContainText("Certains champs sont à compléter");
    await expect(page.getByLabel("Nom et prénom")).toBeFocused();

    await page.getByLabel("Nom et prénom").fill("Test Playwright");
    await page.getByLabel("Adresse e-mail").fill("test@example.com");
    await page.getByRole("checkbox", { name: "Site web" }).check({ force: true });
    await page
      .getByLabel("Description du besoin")
      .fill("Projet de test automatisé, assez long pour la validation.");
    await page.getByRole("checkbox", { name: /J’accepte/ }).check();
    await page.getByRole("button", { name: "Envoyer ma demande" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Merci, votre demande est bien envoyée" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByLabel("Nom et prénom")).toHaveValue("");
  });

  test("API : champ piège et validation", async ({ request }) => {
    const trap = await request.post("/api/contact", { data: { website: "robot", name: "x" } });
    expect(trap.status()).toBe(200);
    const invalid = await request.post("/api/contact", { data: { name: "x" } });
    expect(invalid.status()).toBe(400);
    expect((await invalid.json()).fields).toContain("email");
  });
});

test("réalisations : filtre dans l'URL", async ({ page }) => {
  await page.goto("/realisations?categorie=creativetech");
  await refuseCookies(page);
  await expect(page.getByRole("status").first()).toContainText("1");
  await page.getByRole("button", { name: /^Tous/ }).click();
  await expect(page).toHaveURL(/\/realisations$/);
});

test("FAQ : accordéon et JSON-LD", async ({ page }) => {
  await page.goto("/faq");
  const first = page.getByRole("button", { name: "Comment démarrer un projet avec ZIIIILO ?" });
  await expect(first).toHaveAttribute("aria-expanded", "true");
  const second = page.getByRole("button", { name: "Comment se déroule le développement ?" });
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.some((s) => s.includes('"FAQPage"'))).toBe(true);
});

test("pages juridiques : « À configurer » et bouton des préférences cookies", async ({ page }) => {
  await page.goto("/mentions-legales");
  await expect(page.getByText("À configurer").first()).toBeVisible();
  await page.goto("/politique-cookies");
  await refuseCookies(page);
  await page.getByRole("main").getByRole("button", { name: "Gestion des cookies" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("étude inconnue : 404", async ({ page }) => {
  const response = await page.goto("/realisations/inconnue");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Cette page est introuvable" })).toBeVisible();
});

test("SEO : canonique, sitemap, robots", async ({ page, request }) => {
  await page.goto("/contact");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/contact$/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/realisations/staftrack");
  expect(sitemap).not.toContain("/en/");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
});

test("partage : Open Graph, carte X et image de la page", async ({ page, request }) => {
  await page.goto("/realisations/golden-beans");
  const meta = (key: string) => page.locator(`meta[property="${key}"], meta[name="${key}"]`).first();
  await expect(meta("og:url")).toHaveAttribute("content", /^https:\/\/.+\/realisations\/golden-beans$/);
  await expect(meta("og:type")).toHaveAttribute("content", "website");
  await expect(meta("og:image:width")).toHaveAttribute("content", "1200");
  await expect(meta("og:image:alt")).toHaveAttribute("content", /Golden Beans/);
  await expect(meta("twitter:card")).toHaveAttribute("content", "summary_large_image");
  const imageUrl = await meta("og:image").getAttribute("content");
  expect(imageUrl).toMatch(/^https:\/\/.+\/og\/fr\/etude-golden-beans\.jpg$/);
  const image = await request.get(new URL(imageUrl!).pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toBe("image/jpeg");
  expect((await image.body()).length).toBeLessThan(300_000);
  expect((await request.get("/og/fr/inconnue.jpg")).status()).toBe(404);
});
