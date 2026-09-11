export const getReleaseStatus = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);

    today.setHours(0, 0, 0, 0);
    release.setHours(0, 0, 0, 0);

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