import { test, expect } from "@playwright/test";

test("User can search releases by series or episode title", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    await expect(searchInput).toBeVisible();

    const seriesCard = page.locator(".series-card").first();

    await expect(seriesCard).toBeVisible();

    const seriesTitle = (
        await seriesCard.locator("h3").textContent()
    )?.trim();

    expect(seriesTitle).toBeTruthy();

    await searchInput.fill(seriesTitle);

    await expect(seriesCard).toBeVisible();

    await searchInput.fill(
        "This Series Or Episode Does Not Exist"
    );

    await expect(seriesCard).not.toBeVisible();
});