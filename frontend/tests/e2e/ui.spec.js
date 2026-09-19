import { test, expect } from "@playwright/test";

test("Release Watch Board displays the main UI", async ({ page }) => {
    await page.goto("/");

    await expect(
        page.getByRole("heading", {
            name: "Release Watch Board"
        })
    ).toBeVisible();

    await expect(
        page.getByLabel("Search releases:")
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "All",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Movies",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Series",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "All Statuses",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Released",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Releasing Soon",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Upcoming",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "All Watch Status",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Watched",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Unwatched",
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByLabel("Sort releases:")
    ).toBeVisible();
});