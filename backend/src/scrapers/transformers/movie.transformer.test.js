import test from "node:test";
import assert from "node:assert/strict";
import { transformMovie } from "./movie.transformer.js";

test("transforms a scraped movie", () => {
    const movie = {
        title: "  Hope  ",
        releaseDate: "2026-09-09",
        sourceUrl: "https://www.rottentomatoes.com/m/hope_2026"
    };

    const result = transformMovie(movie);

    assert.deepEqual(result, {
        title: "Hope",
        releaseDate: "2026-09-09",
        sourceUrl: "https://www.rottentomatoes.com/m/hope_2026"
    });
});