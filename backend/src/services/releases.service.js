import {
    getUpcomingMovies,
    getUpcomingEpisodes
} from "../repositories/releases.repository.js";
import {
    getReleaseStatus,
    getReleaseStatusMetadata
} from "./release-status.service.js";

export const getUpcomingMoviesService = async (days) => {
    const movies = await getUpcomingMovies(days);

    return movies.map((movie) => {
        const status = getReleaseStatus(movie.release_date);

        return {
            ...movie,
            status,
            statusMetadata: getReleaseStatusMetadata(status)
        };
    });
};

export const getUpcomingEpisodesService = async (days) => {
    const episodes = await getUpcomingEpisodes(days);

    return episodes.map((episode) => {
        const status = getReleaseStatus(episode.release_date);

        return {
            ...episode,
            status,
            statusMetadata: getReleaseStatusMetadata(status)
        };
    });
};