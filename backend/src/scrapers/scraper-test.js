import { createBrowser } from "./browser.js";
import { scrapeMovies } from "./movie.scraper.js";
import { scrapeSeries } from "./series.scraper.js";

const browser = await createBrowser();

try {
    const page = await browser.newPage();

    const movieResult = await scrapeMovies(page);

    console.log("Movie scraper:", movieResult);

    const seriesResult = await scrapeSeries(page);

    console.log("Series scraper:", seriesResult);
} finally {
    await browser.close();
}