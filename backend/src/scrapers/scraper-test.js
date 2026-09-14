import { createBrowser } from "./browser.js";
import { scrapeMovies } from "./movie.scraper.js";
import { scrapeSeries, scrapeSeason } from "./series.scraper.js";

const browser = await createBrowser();

try {
    const page = await browser.newPage();

    const movieResult = await scrapeMovies(page);

    console.log("Movie scraper:", movieResult);

    const seriesResult = await scrapeSeries(page);

    console.log("Series scraper:", seriesResult);

    const seasonResult = await scrapeSeason(
        page,
        "https://www.rottentomatoes.com/tv/slow_horses/s06"
    );

    console.log("Season scraper:", seasonResult);
} finally {
    await browser.close();
}