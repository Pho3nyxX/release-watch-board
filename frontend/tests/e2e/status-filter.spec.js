import { test, expect } from "@playwright/test";

test("User can filter releases by status", async ({ page }) => {
    await page.goto("/");

    const releaseSections = page.locator(".release-section");

    const releasedButton = page.getByRole("button", {
        name: "Released",
        exact: true
    });

    const releasingSoonButton = page.getByRole("button", {
        name: "Releasing Soon",
        exact: true
    });

    const upcomingButton = page.getByRole("button", {
        name: "Upcoming",
        exact: true
    });

    await releasedButton.click();

    await expect(releaseSections).toHaveCount(1);

    await expect(
        releaseSections.first().locator("h2")
    ).toContainText("Released");

    await releasingSoonButton.click();

    await expect(releaseSections).toHaveCount(1);

    await expect(
        releaseSections.first().locator("h2")
    ).toContainText("Releasing Soon");

    await upcomingButton.click();

    await expect(releaseSections).toHaveCount(1);

    await expect(
        releaseSections.first().locator("h2")
    ).toContainText("Upcoming");
});