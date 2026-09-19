import { test, expect } from "@playwright/test";

test("Release cards display the correct status indicators", async ({ page }) => {
    await page.goto("/");

    const releasedSection = page
        .locator(".release-section")
        .filter({
            has: page.getByRole("heading", {
                name: /Released/
            })
        });

    const releasingSoonSection = page
        .locator(".release-section")
        .filter({
            has: page.getByRole("heading", {
                name: /Releasing Soon/
            })
        });

    const upcomingSection = page
        .locator(".release-section")
        .filter({
            has: page.getByRole("heading", {
                name: /Upcoming/
            })
        });

    const releasedCard = releasedSection
        .locator(".movie-card")
        .first();

    const releasingSoonCard = releasingSoonSection
        .locator(".movie-card")
        .first();

    const upcomingCard = upcomingSection
        .locator(".movie-card")
        .first();

    await expect(releasedCard).toBeVisible();
    await expect(releasingSoonCard).toBeVisible();
    await expect(upcomingCard).toBeVisible();

    await expect(
        releasedCard.locator(".status.green")
    ).toHaveText("Released");

    await expect(
        releasingSoonCard.locator(".status.yellow")
    ).toHaveText("Releasing Soon");

    await expect(
        upcomingCard.locator(".status.red")
    ).toHaveText("Upcoming");
});