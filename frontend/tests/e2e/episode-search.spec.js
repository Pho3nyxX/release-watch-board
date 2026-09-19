import { test, expect } from "@playwright/test";

test("User can search releases by episode title", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    await expect(searchInput).toBeVisible();

    const seriesCard = page.locator(".series-card").first();

    await expect(seriesCard).toBeVisible();

    const episodeTitle = (
        await seriesCard
            .locator(".episode-title")
            .textContent()
    )?.replace(/^Episode:\s*/, "").trim();

    expect(episodeTitle).toBeTruthy();

    await searchInput.fill(episodeTitle);

    await expect(seriesCard).toBeVisible();

    await searchInput.fill(
        "This Episode Title Does Not Exist"
    );

    await expect(seriesCard).not.toBeVisible();
});