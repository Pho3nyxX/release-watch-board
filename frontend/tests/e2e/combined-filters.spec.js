import { test, expect } from "@playwright/test";

test("User can combine release filters", async ({ page }) => {
    await page.goto("/");

    const movieCards = page.locator(
        ".movie-card:not(.series-card)"
    );

    const seriesCards = page.locator(".series-card");

    const firstMovie = movieCards.first();

    const watchedButton = firstMovie.getByRole("button");

    await expect(watchedButton).toBeVisible();

    const buttonText = await watchedButton.textContent();

    if (!buttonText?.includes("✓ Watched")) {
        await watchedButton.click();

        await expect(watchedButton).toHaveText(
            "✓ Watched"
        );
    }

    await page.getByRole("button", {
        name: "Movies",
        exact: true
    }).click();

    await page.getByRole("button", {
        name: "Watched",
        exact: true
    }).click();

    await expect(movieCards.first()).toBeVisible();

    await expect(seriesCards).toHaveCount(0);

    await expect(
        page.locator(".watched-button.watched").first()
    ).toBeVisible();
});