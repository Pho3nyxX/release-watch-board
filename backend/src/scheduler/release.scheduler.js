import cron from "node-cron";
import { runScraper } from "../scrapers/scraper-runner.js";

let scraperRunning = false;

export const startReleaseScheduler = () => {
    cron.schedule("0 2 * * *", async () => {
        if (scraperRunning) {
            console.log(
                "Scraper is already running. Skipping scheduled run."
            );
            return;
        }

        scraperRunning = true;

        console.log("Release scheduler is running...");

        try {
            await runScraper();
            console.log("Release scraper completed successfully.");
        } catch (error) {
            console.error(
                "Release scraper failed:",
                error.message
            );
        } finally {
            scraperRunning = false;
        }
    });
};