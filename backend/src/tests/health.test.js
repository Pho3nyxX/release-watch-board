import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /api/health returns a successful response", async () => {
    const response = await request(app)
        .get("/api/health");

    assert.equal(response.status, 200);

    assert.deepEqual(response.body, {
        status: "ok",
        message: "Release Watch Board API is running"
    });
});