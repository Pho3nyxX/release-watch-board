export const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};