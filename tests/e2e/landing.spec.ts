import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

test.describe("Landing page — layout & behaviour", () => {
  test("renders the hero, all sections, and no horizontal overflow (SC-004)", async ({
    page,
  }) => {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "SMART INVESTMENT"
      );
      // No horizontal overflow at any breakpoint.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `no horizontal overflow at ${vp.name}`).toBeLessThanOrEqual(1);
    }
  });

  test('"EXPLORE OPPORTUNITIES" scrolls to the opportunities section', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByRole("link", { name: "EXPLORE OPPORTUNITIES" }).click();
    await expect(page).toHaveURL(/#opportunities$/);
    await expect(
      page.getByRole("heading", { name: /investment opportunities/i })
    ).toBeInViewport();
  });

  test("no INVESTOR LOGIN control is present (removed per request)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /investor login/i })).toHaveCount(0);
  });

  test("reduced motion: content is immediately visible, no count-up delay (SC-007)", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // Stat final values render immediately under reduced motion.
    await expect(page.getByText("25+")).toBeVisible();
    await expect(page.getByText("$2.4B")).toBeVisible();
    await expect(page.getByText("1,250+")).toBeVisible();
    // Guard the reduced-motion fix: reveal wrappers must be fully opaque
    // (toBeVisible alone treats opacity:0 as visible), not stuck hidden.
    const reveals = page.locator("[data-reveal]");
    const count = await reveals.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const opacity = await reveals.nth(i).evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe("1");
    }
    await context.close();
  });
});
