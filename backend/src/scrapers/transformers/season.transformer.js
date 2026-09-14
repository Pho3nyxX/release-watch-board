import { transformEpisode } from "./episode.transformer.js";

export const transformSeason = (seriesListing, episodes) => {
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
        series: {
            title: seriesTitle.trim(),
            sourceUrl: seriesListing.sourceUrl
        },

        season: {
            seasonNumber
        },

        episodes: episodes.map(transformEpisode)
    };
};