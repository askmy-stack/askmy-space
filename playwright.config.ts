import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  // Platform-agnostic snapshot names (CI runs Linux; local may be darwin).
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}{-projectName}{ext}",
  use: {
    baseURL: "http://127.0.0.1:3000",
    colorScheme: "dark",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
});
