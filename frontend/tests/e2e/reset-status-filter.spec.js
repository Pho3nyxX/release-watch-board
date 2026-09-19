import { test, expect } from "@playwright/test";

test("User can reset the release status filter", async ({ page }) => {
    await page.goto("/");

    const releaseSections = page.locator(".release-section");

    await expect(releaseSections).toHaveCount(3);

    await page.getByRole("button", {
        name: "Released",
        exact: true
    }).click();

    await expect(releaseSections).toHaveCount(1);

    await expect(
        releaseSections.first().locator("h2")
    ).toContainText("Released");

    await page.getByRole("button", {
        name: "All Statuses",
        exact: true
    }).click();

    await expect(releaseSections).toHaveCount(3);

    await expect(
        releaseSections.nth(0).locator("h2")
    ).toContainText("Released");

    await expect(
        releaseSections.nth(1).locator("h2")
    ).toContainText("Releasing Soon");

    await expect(
        releaseSections.nth(2).locator("h2")
    ).toContainText("Upcoming");
});