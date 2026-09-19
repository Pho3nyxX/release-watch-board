import { test, expect } from "@playwright/test";

test("User can mark an episode as watched and unwatched", async ({ page }) => {
    await page.goto("/");

    const seriesCard = page
        .locator(".series-card")
        .first();

    const watchedButton = seriesCard.getByRole("button");

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
        seriesCard.locator(".watched-date")
    ).toBeVisible();

    await watchedButton.click();

    await expect(watchedButton).toHaveText(
        "Mark as Watched"
    );

    await expect(
        seriesCard.locator(".watched-date")
    ).not.toBeVisible();
});