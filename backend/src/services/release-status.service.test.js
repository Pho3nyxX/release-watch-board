import test from "node:test";
import assert from "node:assert/strict";
import {
    getReleaseStatus,
    getReleaseStatusMetadata
} from "./release-status.service.js";

const getDateWithOffset = (daysFromToday) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + daysFromToday);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

test("returns released for a past release date", () => {
    const releaseDate = getDateWithOffset(-1);

    assert.equal(
        getReleaseStatus(releaseDate),
        "released"
    );
});

test("returns released for today's release date", () => {
    const releaseDate = getDateWithOffset(0);

    assert.equal(
        getReleaseStatus(releaseDate),
        "released"
    );
});

test("returns releasing_soon for tomorrow", () => {
    const releaseDate = getDateWithOffset(1);

    assert.equal(
        getReleaseStatus(releaseDate),
        "releasing_soon"
    );
});

test("returns releasing_soon exactly 5 days before release", () => {
    const releaseDate = getDateWithOffset(5);

    assert.equal(
        getReleaseStatus(releaseDate),
        "releasing_soon"
    );
});

test("returns upcoming more than 5 days before release", () => {
    const releaseDate = getDateWithOffset(6);

    assert.equal(
        getReleaseStatus(releaseDate),
        "upcoming"
    );
});

test("returns metadata for released status", () => {
    assert.deepEqual(
        getReleaseStatusMetadata("released"),
        {
            label: "Released",
            color: "green"
        }
    );
});

test("returns metadata for releasing soon status", () => {
    assert.deepEqual(
        getReleaseStatusMetadata("releasing_soon"),
        {
            label: "Releasing Soon",
            color: "yellow"
        }
    );
});

test("returns metadata for upcoming status", () => {
    assert.deepEqual(
        getReleaseStatusMetadata("upcoming"),
        {
            label: "Upcoming",
            color: "red"
        }
    );
});