export const normalizeReleaseDate = (releaseDateText) => {
    const dateText = releaseDateText
        .replace("Opened ", "")
        .replace("Re-released ", "");

    const releaseDate = new Date(dateText);

    const year = releaseDate.getFullYear();
    const month = String(releaseDate.getMonth() + 1).padStart(2, "0");
    const day = String(releaseDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};