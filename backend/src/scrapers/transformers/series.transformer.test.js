import test from "node:test";
import assert from "node:assert/strict";
import { transformSeries } from "./series.transformer.js";

test("transforms a series-season listing", () => {
    const seriesListing = {
        title: "Slow Horses: Season 6",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06"
    };

    const result = transformSeries(seriesListing);

    assert.deepEqual(result, {
        title: "Slow Horses",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06",
        seasonNumber: 6
    });
});