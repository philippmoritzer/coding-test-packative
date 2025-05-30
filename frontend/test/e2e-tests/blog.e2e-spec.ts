import { test, expect } from "@playwright/test";

test.describe("Blog E2E", () => {
  test("login, create a blog post and see if it appears", async ({ page }) => {
    const USERNAME = process.env.E2E_USERNAME || "admin";
    const PASSWORD = process.env.E2E_PASSWORD || "admin";
    const BASEURL = process.env.E2E_BASE_URL || "http://localhost:3000";

    await page.goto(`${BASEURL}/login`);

    await page.fill('input[id="username"]', USERNAME);
    await page.fill('input[id="password"]', PASSWORD);
    await page.click('button[type="submit"]');

    await page.waitForURL("**/blog");

    await expect(page.locator('input[name="title"]')).toBeVisible();
    await page.fill('input[name="title"]', "Playwright Test Post");
    await page.fill(
      'textarea[name="content"]',
      "This is a test post created by Playwright."
    );
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Playwright Test Post").first()
    ).toBeVisible();
    await expect(
      page.locator("text=This is a test post created by Playwright.").first()
    ).toBeVisible();
  });
});
