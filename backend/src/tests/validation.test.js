import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("POST /api/movies rejects an invalid release date", async () => {
    const response = await request(app)
        .post("/api/movies")
        .send({
            title: "Test Movie",
            releaseDate: "not-a-date"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/movies rejects an invalid source URL", async () => {
    const response = await request(app)
        .post("/api/movies")
        .send({
            title: "Test Movie",
            releaseDate: "2026-09-18",
            sourceUrl: "not-a-url"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/series rejects an invalid source URL", async () => {
    const response = await request(app)
        .post("/api/series")
        .send({
            title: "Test Series",
            sourceUrl: "not-a-url"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/seasons rejects an invalid series ID", async () => {
    const response = await request(app)
        .post("/api/seasons")
        .send({
            seriesId: "abc",
            seasonNumber: 1
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/seasons rejects an invalid season number", async () => {
    const response = await request(app)
        .post("/api/seasons")
        .send({
            seriesId: 1,
            seasonNumber: 0
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/episodes rejects an invalid episode number", async () => {
    const response = await request(app)
        .post("/api/episodes")
        .send({
            seasonId: 1,
            episodeNumber: 0,
            releaseDate: "2026-09-18"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/episodes rejects an invalid release date", async () => {
    const response = await request(app)
        .post("/api/episodes")
        .send({
            seasonId: 1,
            episodeNumber: 1,
            releaseDate: "not-a-date"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/releases/movies rejects zero days", async () => {
    const response = await request(app)
        .get("/api/releases/movies?days=0");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET an unknown API route returns a 404 response", async () => {
    const response = await request(app)
        .get("/api/does-not-exist");

    assert.equal(response.status, 404);

    assert.deepEqual(response.body, {
        status: "error",
        message: "Route not found"
    });
});