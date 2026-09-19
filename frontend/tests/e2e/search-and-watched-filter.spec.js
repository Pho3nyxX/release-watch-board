import { test, expect } from "@playwright/test";

test("User can combine search and watched filters", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    const firstMovie = page
        .locator(".movie-card:not(.series-card)")
        .first();

    await expect(firstMovie).toBeVisible();

    const movieTitle = (
        await firstMovie.locator("h3").textContent()
    )?.trim();

    expect(movieTitle).toBeTruthy();

    const watchedButton = firstMovie.getByRole("button");

    await expect(watchedButton).toBeVisible();

    const buttonText = await watchedButton.textContent();

    if (!buttonText?.includes("✓ Watched")) {
        await watchedButton.click();

        await expect(watchedButton).toHaveText(
            "✓ Watched"
        );
    }

    await searchInput.fill(movieTitle);

    await expect(
        page.getByRole("heading", {
            name: movieTitle,
            exact: true
        })
    ).toBeVisible();

    await page.getByRole("button", {
        name: "Watched",
        exact: true
    }).click();

    const matchingMovie = page
        .locator(".movie-card:not(.series-card)")
        .filter({
            has: page.getByRole("heading", {
                name: movieTitle,
                exact: true
            })
        });

    await expect(matchingMovie).toBeVisible();

    await expect(
        matchingMovie.getByRole("button")
    ).toHaveText("✓ Watched");
});