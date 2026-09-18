import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/series returns a successful response", async () => {
    const response = await request(app)
        .get("/api/series");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("POST /api/series rejects invalid series data", async () => {
    const response = await request(app)
        .post("/api/series")
        .send({
            source_url: "https://example.com/series"
        });

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/series/:id rejects an invalid series ID", async () => {
    const response = await request(app)
        .get("/api/series/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/series/:id returns 404 when the series does not exist", async () => {
    const response = await request(app)
        .get("/api/series/999999");

    assert.equal(response.status, 404);
});