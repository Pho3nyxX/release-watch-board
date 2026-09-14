export const transformSeries = (seriesListing) => {
    const seasonMatch = seriesListing.title.match(
        /: Season (\d+)$/
    );

    const seasonNumber = seasonMatch
        ? Number(seasonMatch[1])
        : null;

    const seriesTitle = seriesListing.title.replace(
        /: Season \d+$/,
        ""
    );

    return {
        title: seriesTitle.trim(),
        sourceUrl: seriesListing.sourceUrl,
        seasonNumber
    };
};