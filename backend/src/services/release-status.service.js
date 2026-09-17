import { releaseStatuses } from "../config/release-status.js";

export const getReleaseStatus = (releaseDate) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const releaseDateText =
        releaseDate instanceof Date
            ? releaseDate.toISOString().slice(0, 10)
            : releaseDate.slice(0, 10);

    const [year, month, day] = releaseDateText
        .split("-")
        .map(Number);

    const release = new Date(year, month - 1, day);

    const differenceInMilliseconds = release - today;
    const differenceInDays =
        differenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (differenceInDays <= 0) {
        return "released";
    }

    if (differenceInDays <= 5) {
        return "releasing_soon";
    }

    return "upcoming";
};

export const getReleaseStatusMetadata = (status) => {
    return releaseStatuses[status];
};