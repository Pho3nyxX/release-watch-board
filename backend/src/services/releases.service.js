import {
    getUpcomingMovies,
    getUpcomingEpisodes
} from "../repositories/releases.repository.js";

export const getUpcomingMoviesService = async (days) => {
    return getUpcomingMovies(days);
};

export const getUpcomingEpisodesService = async (days) => {
    return getUpcomingEpisodes(days);
};