export const transformEpisode = (episode) => {
    return {
        episodeNumber: episode.episodeNumber,
        title: episode.title ? episode.title.trim() : null,
        releaseDate: episode.releaseDate,
        sourceUrl: episode.sourceUrl
    };
};