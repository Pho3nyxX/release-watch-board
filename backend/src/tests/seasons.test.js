import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/seasons returns a successful response", async () => {
    const response = await request(app)
        .get("/api/seasons");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/seasons/series/:seriesId returns a successful response", async () => {
    const response = await request(app)
        .get("/api/seasons/series/999999");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/seasons/:id rejects an invalid season ID", async () => {
    const response = await request(app)
        .get("/api/seasons/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/seasons/series/:seriesId rejects an invalid series ID", async () => {
    const response = await request(app)
        .get("/api/seasons/series/abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/seasons/:id returns 404 when the season does not exist", async () => {
    const response = await request(app)
        .get("/api/seasons/999999");

    assert.equal(response.status, 404);
});