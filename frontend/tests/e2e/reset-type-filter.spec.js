import { test, expect } from "@playwright/test";

test("User can reset the type filter to show all releases", async ({ page }) => {
    await page.goto("/");

    const movieCards = page.locator(
        ".movie-card:not(.series-card)"
    );

    const seriesCards = page.locator(".series-card");

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards.first()).toBeVisible();

    await page.getByRole("button", {
        name: "Movies",
        exact: true
    }).click();

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards).toHaveCount(0);

    await page.getByRole("button", {
        name: "All",
        exact: true
    }).click();

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards.first()).toBeVisible();
});