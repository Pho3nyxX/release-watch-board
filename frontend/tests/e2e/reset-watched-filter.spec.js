import { test, expect } from "@playwright/test";

test("User can reset the watch status filter", async ({ page }) => {
    await page.goto("/");

    const firstMovie = page
        .locator(".movie-card:not(.series-card)")
        .first();

    await expect(firstMovie).toBeVisible();

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
        name: "Watched",
        exact: true
    }).click();

    await expect(
        page.locator(".watched-button.watched").first()
    ).toBeVisible();

    await page.getByRole("button", {
        name: "All Watch Status",
        exact: true
    }).click();

    await expect(
        page.locator(".movie-card").first()
    ).toBeVisible();

    await expect(
        page.locator(".watched-button.watched").first()
    ).toBeVisible();

    await expect(
        page.locator(".watched-button:not(.watched)").first()
    ).toBeVisible();
});