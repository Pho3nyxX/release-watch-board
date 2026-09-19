import { test, expect } from "@playwright/test";

test("User can sort releases while a type filter is active", async ({ page }) => {
    await page.goto("/");

    const sortSelect = page.getByLabel("Sort releases:");

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

    await sortSelect.selectOption("desc");

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards).toHaveCount(0);

    const descendingSections = page.locator(
        ".release-section"
    );

    const descendingSectionCount =
        await descendingSections.count();

    for (let i = 0; i < descendingSectionCount; i++) {
        const dates = await descendingSections
            .nth(i)
            .locator(".release-date")
            .allTextContents();

        const timestamps = dates.map((date) =>
            new Date(date).getTime()
        );

        expect(timestamps).toEqual(
            [...timestamps].sort((a, b) => b - a)
        );
    }

    await sortSelect.selectOption("asc");

    await expect(movieCards.first()).toBeVisible();
    await expect(seriesCards).toHaveCount(0);

    const ascendingSections = page.locator(
        ".release-section"
    );

    const ascendingSectionCount =
        await ascendingSections.count();

    for (let i = 0; i < ascendingSectionCount; i++) {
        const dates = await ascendingSections
            .nth(i)
            .locator(".release-date")
            .allTextContents();

        const timestamps = dates.map((date) =>
            new Date(date).getTime()
        );

        expect(timestamps).toEqual(
            [...timestamps].sort((a, b) => a - b)
        );
    }
});