import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "home", expectText: /Research|Engineering|Product|Work/i },
  { path: "/signals", name: "signals", expectText: /Signal/i },
  { path: "/ask", name: "ask", expectText: /Ask/i },
] as const;

for (const route of routes) {
  test(`visual smoke ${route.path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#main")).toBeVisible();
    await expect(page.locator("body")).toContainText(route.expectText);

    // Pixel baselines are platform-sensitive. Enable with PW_SNAPSHOTS=1
    // (local: `PW_SNAPSHOTS=1 npm run test:e2e:update`).
    if (process.env.PW_SNAPSHOTS === "1") {
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.03,
      });
    }
  });
}
