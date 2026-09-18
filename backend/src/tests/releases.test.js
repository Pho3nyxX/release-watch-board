import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/releases/movies returns a successful response", async () => {
    const response = await request(app)
        .get("/api/releases/movies?days=30");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/releases/episodes returns a successful response", async () => {
    const response = await request(app)
        .get("/api/releases/episodes?days=30");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /api/releases/movies rejects an invalid days value", async () => {
    const response = await request(app)
        .get("/api/releases/movies?days=abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});

test("GET /api/releases/episodes rejects an invalid days value", async () => {
    const response = await request(app)
        .get("/api/releases/episodes?days=abc");

    assert.equal(response.status, 400);
    assert.ok(Array.isArray(response.body.errors));
});