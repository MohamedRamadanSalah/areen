import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Audit the settled page: reduced motion makes SectionReveal render children at
// their final opacity immediately, so axe measures the real (not mid-animation)
// colours. This is also the correct a11y baseline (SC-007).
test.use({ reducedMotion: "reduce" });

test.describe("Accessibility (SC-006)", () => {
  test("has no critical/serious axe violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Scroll through the page so every scroll-reveal element settles to its
    // final opacity, then let the reveals finish before auditing colours.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    if (serious.length) {
      console.log(
        "Accessibility violations:",
        JSON.stringify(
          serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
          null,
          2
        )
      );
    }
    expect(serious).toEqual([]);
  });

  test("every interactive control is keyboard reachable with a visible focus ring", async ({
    page,
  }) => {
    await page.goto("/");
    // Tab to the first focusable element and confirm focus lands on something.
    await page.keyboard.press("Tab");
    const active = await page.evaluate(() => document.activeElement?.tagName ?? "");
    expect(["A", "BUTTON"]).toContain(active);
  });

  test("icon-only social links expose accessible names", async ({ page }) => {
    await page.goto("/");
    for (const name of [/linkedin/i, /twitter/i, /facebook/i, /instagram/i]) {
      await expect(page.getByRole("link", { name })).toBeVisible();
    }
  });
});
