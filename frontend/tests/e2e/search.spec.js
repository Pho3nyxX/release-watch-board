import { test, expect } from "@playwright/test";

test("User can search releases by title", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search releases:");

    await expect(searchInput).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "UFC 331: Van vs. Pantoja 2"
        })
    ).toBeVisible();

    await searchInput.fill("UFC 331");

    await expect(
        page.getByRole("heading", {
            name: "UFC 331: Van vs. Pantoja 2"
        })
    ).toBeVisible();

    await searchInput.fill("This Release Does Not Exist");

    await expect(
        page.getByRole("heading", {
            name: "UFC 331: Van vs. Pantoja 2"
        })
    ).not.toBeVisible();
});