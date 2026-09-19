import { test, expect } from "@playwright/test";

test("User can filter releases by watched status", async ({ page }) => {
    await page.goto("/");

    const movieCards = page.locator(
        ".movie-card:not(.series-card)"
    );

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
        name: "Watched",
        exact: true
    }).click();

    await expect(
        page.locator(".watched-button.watched").first()
    ).toBeVisible();

    await page.getByRole("button", {
        name: "Unwatched",
        exact: true
    }).click();

    await expect(
        page.locator(".watched-button:not(.watched)").first()
    ).toBeVisible();
});