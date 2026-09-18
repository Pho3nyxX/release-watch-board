import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/movies returns a successful response", async () => {
    const response = await request(app)
        .get("/api/movies");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("POST /api/movies rejects invalid movie data", async () => {
    const response = await request(app)
        .post("/api/movies")
        .send({
            release_date: "2026-09-18",
            source_url: "https://example.com/movie"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/movies/:id rejects an invalid movie ID", async () => {
    const response = await request(app)
        .get("/api/movies/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/movies/:id returns 404 when the movie does not exist", async () => {
    const response = await request(app)
        .get("/api/movies/999999");

    assert.equal(response.status, 404);
});