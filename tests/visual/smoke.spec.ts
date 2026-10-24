import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "home", expectText: /Full Stack AI Engineer|Featured work|Work/i },
  { path: "/work/cortex", name: "work-cortex", expectText: /Cortex/i },
  { path: "/work/tool-semantics", name: "work-tool-semantics", expectText: /Tool-semantics|Behavioral/i },
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

test("home hero orb stage has layers and no prism remnants", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/reliable/i);
  await expect(page.getByRole("radiogroup", { name: /engineering layers/i })).toBeVisible();
  await expect(page.getByRole("radio", { name: /context engineering/i })).toBeVisible();
  await expect(page.getByRole("radio", { name: /agent systems/i })).toBeVisible();
  await expect(page.getByRole("radio", { name: /cloud & platform/i })).toBeVisible();
  await expect(page.getByRole("radio", { name: /evaluation/i })).toBeVisible();

  await expect(page.locator("body")).not.toContainText(/NeuralLattice|ScrollScene/i);
  await expect(page.locator("[data-prism], .neural-lattice")).toHaveCount(0);
});

test("home hero layer cards are keyboard selectable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const first = page.getByRole("radio", { name: /context engineering/i });
  await first.focus();
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("ArrowRight");
  const agents = page.getByRole("radio", { name: /agent systems/i });
  await expect(agents).toBeFocused();
  await expect(agents).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText(/Useful action/i).first()).toBeVisible();
});
