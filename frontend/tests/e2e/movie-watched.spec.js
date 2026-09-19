import { test, expect } from "@playwright/test";

test("User can mark a movie as watched and unwatched", async ({ page }) => {
    await page.goto("/");

    const movieCard = page
        .locator(".movie-card:not(.series-card)")
        .first();

    const watchedButton = movieCard.getByRole("button");

    await expect(watchedButton).toBeVisible();

    const buttonText = await watchedButton.textContent();

    if (buttonText?.includes("✓ Watched")) {
        await watchedButton.click();

        await expect(watchedButton).toHaveText(
            "Mark as Watched"
        );
    }

    await watchedButton.click();

    await expect(watchedButton).toHaveText(
        "✓ Watched"
    );

    await expect(
        movieCard.locator(".watched-date")
    ).toBeVisible();

    await watchedButton.click();

    await expect(watchedButton).toHaveText(
        "Mark as Watched"
    );

    await expect(
        movieCard.locator(".watched-date")
    ).not.toBeVisible();
});