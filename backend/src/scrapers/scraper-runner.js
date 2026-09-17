import { createBrowser } from "./browser.js";
import { scrapeMovies } from "./movie.scraper.js";
import { scrapeSeries, scrapeSeason } from "./series.scraper.js";
import { transformMovie } from "./transformers/movie.transformer.js";
import { transformSeason } from "./transformers/season.transformer.js";
import { saveMovie, saveSeason } from "../services/scraper-save.service.js";

export const runScraper = async () => {
    const browser = await createBrowser();

    try {
        const page = await browser.newPage();

        const movieResult = await scrapeMovies(page);

        for (const movie of movieResult) {
            const transformedMovie = transformMovie(movie);

            await saveMovie(transformedMovie);
        }

        console.log("Movies saved:", movieResult.length);

        const seriesResult = await scrapeSeries(page);

        console.log("Series scraper:", seriesResult);

        for (const seriesListing of seriesResult) {
            const seasonResult = await scrapeSeason(
                page,
                seriesListing.sourceUrl
            );

            const seasonData = transformSeason(
                seriesListing,
                seasonResult
            );

            await saveSeason(seasonData);

            console.log(
                `Season saved: ${seasonData.series.title} S${seasonData.season.seasonNumber}`
            );
        }
    } finally {
        await browser.close();
    }
};