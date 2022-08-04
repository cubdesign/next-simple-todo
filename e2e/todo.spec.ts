import { test, expect } from "@playwright/test";

test("login to register", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.click("text=新規登録");
  await expect(page).toHaveURL("http://localhost:3000/register");
  await expect(page.locator("h1")).toContainText("新規登録");
});
