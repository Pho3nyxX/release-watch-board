import { test, expect } from "@playwright/test";

test("User can combine search and type filters", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    const movieCards = page.locator(
        ".movie-card:not(.series-card)"
    );

    const seriesCards = page.locator(".series-card");

    const firstMovie = movieCards.first();

    await expect(firstMovie).toBeVisible();

    const movieTitle = (
        await firstMovie.locator("h3").textContent()
    )?.trim();

    expect(movieTitle).toBeTruthy();

    await searchInput.fill(movieTitle);

    await expect(firstMovie).toBeVisible();

    await page.getByRole("button", {
        name: "Movies",
        exact: true
    }).click();

    await expect(
        page.locator(".movie-card:not(.series-card)")
    ).toHaveCount(1);

    await expect(seriesCards).toHaveCount(0);

    await expect(
        page.getByRole("heading", {
            name: movieTitle,
            exact: true
        })
    ).toBeVisible();
});