import { test, expect } from "@playwright/test";

test("Release Watch Board loads successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Release Watch Board/i);
});