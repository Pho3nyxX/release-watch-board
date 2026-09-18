import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/episodes returns a successful response", async () => {
    const response = await request(app)
        .get("/api/episodes");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/episodes/season/:seasonId returns a successful response", async () => {
    const response = await request(app)
        .get("/api/episodes/season/999999");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/episodes/:id rejects an invalid episode ID", async () => {
    const response = await request(app)
        .get("/api/episodes/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/episodes/season/:seasonId rejects an invalid season ID", async () => {
    const response = await request(app)
        .get("/api/episodes/season/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/episodes/:id returns 404 when the episode does not exist", async () => {
    const response = await request(app)
        .get("/api/episodes/999999");

    assert.equal(response.status, 404);
});