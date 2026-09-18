export const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

export const formatWatchedDate = (watchedDate) => {
    const date = new Date(watchedDate);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};