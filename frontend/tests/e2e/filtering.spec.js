import { test, expect } from "@playwright/test";

test("User can filter releases by type", async ({ page }) => {
    await page.goto("/");

    const movieCards = page.locator(
        ".movie-card:not(.series-card)"
    );

    const seriesCards = page.locator(".series-card");

    const moviesButton = page.getByRole("button", {
        name: "Movies",
        exact: true
    });

    const seriesButton = page.getByRole("button", {
        name: "Series",
        exact: true
    });

    await expect(moviesButton).toBeVisible();
    await expect(seriesButton).toBeVisible();

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards.first()).toBeVisible();

    await moviesButton.click();

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards).toHaveCount(0);

    await seriesButton.click();

    await expect(seriesCards.first()).toBeVisible();
    await expect(movieCards).toHaveCount(0);
});