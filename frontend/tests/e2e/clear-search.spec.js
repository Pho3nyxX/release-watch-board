import { test, expect } from "@playwright/test";

test("User can clear the search and restore releases", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    const releaseSections = page.locator(".release-section");

    await expect(searchInput).toBeVisible();
    await expect(releaseSections).toHaveCount(3);

    await searchInput.fill("This Release Does Not Exist");

    await expect(
        page.locator(".movie-card")
    ).toHaveCount(0);

    await searchInput.fill("");

    await expect(
        page.locator(".movie-card").first()
    ).toBeVisible();

    await expect(releaseSections).toHaveCount(3);
});