import { test, expect } from "@playwright/test";

test("User can sort releases by release date", async ({ page }) => {
    await page.goto("/");

    const sortSelect = page.getByLabel("Sort releases:");

    await expect(sortSelect).toBeVisible();

    await sortSelect.selectOption("asc");

    const sectionsAscending = page.locator(".release-section");

    const ascendingCount = await sectionsAscending.count();

    for (let i = 0; i < ascendingCount; i++) {
        const dates = await sectionsAscending
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

    await sortSelect.selectOption("desc");

    const sectionsDescending = page.locator(".release-section");

    const descendingCount = await sectionsDescending.count();

    for (let i = 0; i < descendingCount; i++) {
        const dates = await sectionsDescending
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

    await sortSelect.selectOption("alphabetical");

    const sectionsAlphabetical = page.locator(
        ".release-section"
    );

    const alphabeticalCount = await sectionsAlphabetical.count();

    for (let i = 0; i < alphabeticalCount; i++) {
        const titles = await sectionsAlphabetical
            .nth(i)
            .locator(".movie-card h3")
            .allTextContents();

        const normalizedTitles = titles.map((title) =>
            title.trim().toLowerCase()
        );

        expect(normalizedTitles).toEqual(
            [...normalizedTitles].sort((a, b) =>
                a.localeCompare(b)
            )
        );
    }
});