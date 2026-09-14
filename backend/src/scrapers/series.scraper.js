import { normalizeReleaseDate } from "./release-date.utils.js";

const ROTTEN_TOMATOES_BASE_URL = "https://www.rottentomatoes.com";

export const scrapeSeries = async (page) => {
    await page.goto("https://www.rottentomatoes.com/browse/tv_series_browse", {
        waitUntil: "domcontentloaded"
    });

    const seriesLinks = await page.locator(
        'a[data-qa="list-item-link"]'
    ).all();

    const seriesListings = [];

    for (const seriesLink of seriesLinks) {
        const title = await seriesLink
            .locator(":scope > span")
            .innerText();

        const seriesPath = await seriesLink.getAttribute("href");

        const sourceUrl = `${ROTTEN_TOMATOES_BASE_URL}${seriesPath}`;

        seriesListings.push({
            title: title.trim(),
            sourceUrl
        });
    }

    return seriesListings;
};

export const scrapeSeason = async (page, seasonUrl) => {
    await page.goto(seasonUrl, {
        waitUntil: "domcontentloaded"
    });

    const seasonPath = new URL(seasonUrl).pathname;

    const episodeLinks = await page.locator(
        `a[href^="${seasonPath}/e"]`
    ).all();

    const episodeUrls = new Set();

    for (const episodeLink of episodeLinks) {
        const episodePath = await episodeLink.getAttribute("href");

        episodeUrls.add(
            `${ROTTEN_TOMATOES_BASE_URL}${episodePath}`
        );
    }

    const episodes = [];

    for (const episodeUrl of episodeUrls) {
        await page.goto(episodeUrl, {
            waitUntil: "domcontentloaded"
        });

        const episodeTitleElement = page.locator(
            '[slot="episode-title"]'
        );

        let episodeTitle = null;

        if (await episodeTitleElement.count()) {
            const titleText = await episodeTitleElement.innerText();

            if (titleText.trim()) {
                episodeTitle = titleText.trim();
            }
        }

        const episodeInfo = await page
            .locator('[slot="title"]')
            .filter({
                hasText: "Episode"
            })
            .innerText();

        const episodeNumber = episodeInfo.match(
            /Episode (\d+)/
        )[1];

        const releaseDateText = await page
            .locator('[data-qa="item-value"]')
            .filter({
                hasText: /\w+ \d{1,2}, \d{4}/
            })
            .first()
            .innerText();

        const releaseDate = normalizeReleaseDate(
            releaseDateText.trim()
        );

        episodes.push({
            episodeNumber: Number(episodeNumber),
            title: episodeTitle,
            releaseDate,
            sourceUrl: page.url()
        });
    }

    return episodes;
};