import { test, expect } from "@playwright/test";

test("User can combine search and status filters", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    const releasedSection = page
        .locator(".release-section")
        .filter({
            has: page.getByRole("heading", {
                name: /Released/
            })
        });

    await expect(releasedSection).toBeVisible();

    const firstRelease = releasedSection
        .locator(".movie-card")
        .first();

    await expect(firstRelease).toBeVisible();

    const releaseTitle = (
        await firstRelease.locator("h3").textContent()
    )?.trim();

    expect(releaseTitle).toBeTruthy();

    await searchInput.fill(releaseTitle);

    await expect(firstRelease).toBeVisible();

    await page.getByRole("button", {
        name: "Released",
        exact: true
    }).click();

    await expect(
        page.locator(".release-section")
    ).toHaveCount(1);

    await expect(
        page.locator(".release-section h2")
    ).toContainText("Released");

    await expect(
        page.getByRole("heading", {
            name: releaseTitle,
            exact: true
        })
    ).toBeVisible();
});