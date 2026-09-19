import { test, expect } from "@playwright/test";

test("User can filter releases to show only unwatched items", async ({ page }) => {
    await page.goto("/");

    const firstMovie = page
        .locator(".movie-card:not(.series-card)")
        .first();

    await expect(firstMovie).toBeVisible();

    const movieTitle = (
        await firstMovie.locator("h3").textContent()
    )?.trim();

    expect(movieTitle).toBeTruthy();

    const initialButton = firstMovie.getByRole("button");

    await expect(initialButton).toBeVisible();

    const initialButtonText = await initialButton.textContent();

    if (!initialButtonText?.includes("✓ Watched")) {
        await initialButton.click();

        await expect(initialButton).toHaveText(
            "✓ Watched"
        );
    }

    await page.getByRole("button", {
        name: "Unwatched",
        exact: true
    }).click();

    await expect(
        page.locator(".watched-button.watched")
    ).toHaveCount(0);

    await expect(
        page.locator(".watched-button:not(.watched)").first()
    ).toBeVisible();

    await page.getByRole("button", {
        name: "All Watch Status",
        exact: true
    }).click();

    const originalMovie = page
        .locator(".movie-card:not(.series-card)")
        .filter({
            has: page.getByRole("heading", {
                name: movieTitle,
                exact: true
            })
        });

    await expect(originalMovie).toBeVisible();

    const currentWatchedButton =
        originalMovie.getByRole("button");

    await expect(currentWatchedButton).toHaveText(
        "✓ Watched"
    );

    await currentWatchedButton.click();

    await expect(currentWatchedButton).toHaveText(
        "Mark as Watched"
    );
});