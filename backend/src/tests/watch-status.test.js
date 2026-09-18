import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("POST /api/movies/:id/watched rejects an invalid movie ID", async () => {
    const response = await request(app)
        .post("/api/movies/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("DELETE /api/movies/:id/watched rejects an invalid movie ID", async () => {
    const response = await request(app)
        .delete("/api/movies/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/movies/:id/watched rejects an invalid movie ID", async () => {
    const response = await request(app)
        .get("/api/movies/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("POST /api/episodes/:id/watched rejects an invalid episode ID", async () => {
    const response = await request(app)
        .post("/api/episodes/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("DELETE /api/episodes/:id/watched rejects an invalid episode ID", async () => {
    const response = await request(app)
        .delete("/api/episodes/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/episodes/:id/watched rejects an invalid episode ID", async () => {
    const response = await request(app)
        .get("/api/episodes/abc/watched");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});