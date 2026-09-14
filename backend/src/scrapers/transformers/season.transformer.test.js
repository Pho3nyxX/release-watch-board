import test from "node:test";
import assert from "node:assert/strict";
import { transformSeason } from "./season.transformer.js";

test("transforms a season with its episodes", () => {
    const seriesListing = {
        title: "Slow Horses: Season 6",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06"
    };

    const episodes = [
        {
            episodeNumber: 1,
            title: "  Circle of Life  ",
            releaseDate: "2026-09-16",
            sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e01"
        },
        {
            episodeNumber: 2,
            title: null,
            releaseDate: "2026-09-23",
            sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e02"
        }
    ];

    const result = transformSeason(
        seriesListing,
        episodes
    );

    assert.deepEqual(result, {
        series: {
            title: "Slow Horses",
            sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06"
        },

        season: {
            seasonNumber: 6
        },

        episodes: [
            {
                episodeNumber: 1,
                title: "Circle of Life",
                releaseDate: "2026-09-16",
                sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e01"
            },
            {
                episodeNumber: 2,
                title: null,
                releaseDate: "2026-09-23",
                sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e02"
            }
        ]
    });
});