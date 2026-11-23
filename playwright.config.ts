import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Parcours et captures aux largeurs de référence du §5 : 390 (mobile), 834 (tablette), 1440 (desktop).
 * Le contrôle de débordement à 360 px est fait dans chaque projet (tests/e2e/*.spec.ts).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    locale: "fr-FR",
    timezoneId: "Africa/Douala",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "mobile-390",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "tablet-834",
      use: { ...devices["Desktop Chrome"], viewport: { width: 834, height: 1194 }, hasTouch: true },
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `pnpm build && pnpm start --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
        env: { ZIIIILO_DEV_PAGES: "1" },
      },
});
