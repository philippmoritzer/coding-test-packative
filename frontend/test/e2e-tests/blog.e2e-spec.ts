import { test, expect } from "@playwright/test";

test.describe("Blog E2E", () => {
  test("login, create a blog post and see if it appears", async ({ page }) => {
    //TODO: load from env
    await page.goto("http://localhost:3000/login");

    //TODO: load from env
    await page.fill('input[id="username"]', "admin");
    await page.fill('input[id="password"]', "admin");
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
