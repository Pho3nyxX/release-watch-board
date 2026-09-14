import test from "node:test";
import assert from "node:assert/strict";
import { transformEpisode } from "./episode.transformer.js";

test("transforms an episode with a title", () => {
    const episode = {
        episodeNumber: 1,
        title: "  Circle of Life  ",
        releaseDate: "2026-09-16",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e01"
    };

    const result = transformEpisode(episode);

    assert.deepEqual(result, {
        episodeNumber: 1,
        title: "Circle of Life",
        releaseDate: "2026-09-16",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e01"
    });
});

test("preserves a missing episode title as null", () => {
    const episode = {
        episodeNumber: 2,
        title: null,
        releaseDate: "2026-09-23",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e02"
    };

    const result = transformEpisode(episode);

    assert.deepEqual(result, {
        episodeNumber: 2,
        title: null,
        releaseDate: "2026-09-23",
        sourceUrl: "https://www.rottentomatoes.com/tv/slow_horses/s06/e02"
    });
});