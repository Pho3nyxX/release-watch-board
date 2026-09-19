import { test, expect } from "@playwright/test";

test("Release Watch Board displays release data", async ({ page }) => {
    await page.goto("/");

    await expect(
        page.getByRole("heading", {
            name: "Release Watch Board"
        })
    ).toBeVisible();

    const releaseSections = page.locator(".release-section");

    await expect(releaseSections).toHaveCount(3);

    await expect(
        releaseSections.nth(0).locator("h2")
    ).toContainText("Released");

    await expect(
        releaseSections.nth(1).locator("h2")
    ).toContainText("Releasing Soon");

    await expect(
        releaseSections.nth(2).locator("h2")
    ).toContainText("Upcoming");

    await expect(
        releaseSections.nth(0).locator(".movie-list")
    ).toBeVisible();
});