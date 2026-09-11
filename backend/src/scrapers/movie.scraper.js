import { normalizeReleaseDate } from "./release-date.utils.js";

const ROTTEN_TOMATOES_BASE_URL = "https://www.rottentomatoes.com";

export const scrapeMovies = async (page) => {
    await page.goto("https://www.rottentomatoes.com/browse/movies_in_theaters", {
        waitUntil: "domcontentloaded"
    });

    const movieLinks = await page.locator('a[href^="/m/"]').all();

    const releaseMovies = [];

    for (const movieLink of movieLinks) {
        const releaseDateElement = movieLink.locator(
            '[data-qa="discovery-media-list-item-start-date"]'
        );

        if (!(await releaseDateElement.count())) {
            continue;
        }

        const title = await movieLink
            .locator('[data-qa="discovery-media-list-item-title"]')
            .innerText();

        const releaseDateText = await releaseDateElement.innerText();

        const moviePath = await movieLink.getAttribute("href");

        const sourceUrl = `${ROTTEN_TOMATOES_BASE_URL}${moviePath}`;

        const releaseDate = normalizeReleaseDate(
            releaseDateText.trim()
        );

        releaseMovies.push({
            title: title.trim(),
            releaseDate,
            sourceUrl
        });
    }

    return releaseMovies;
};