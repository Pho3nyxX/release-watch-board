import {
    markMovieAsWatched,
    unmarkMovieAsWatched,
    getMovieWatchStatus,
    markEpisodeAsWatched,
    unmarkEpisodeAsWatched,
    getEpisodeWatchStatus
} from "../repositories/watch-status.repository.js";

export const markMovieAsWatchedService = async (movieId) => {
    return markMovieAsWatched(movieId);
};

export const unmarkMovieAsWatchedService = async (movieId) => {
    return unmarkMovieAsWatched(movieId);
};

export const getMovieWatchStatusService = async (movieId) => {
    return getMovieWatchStatus(movieId);
};

export const markEpisodeAsWatchedService = async (episodeId) => {
    return markEpisodeAsWatched(episodeId);
};

export const unmarkEpisodeAsWatchedService = async (episodeId) => {
    return unmarkEpisodeAsWatched(episodeId);
};

export const getEpisodeWatchStatusService = async (episodeId) => {
    return getEpisodeWatchStatus(episodeId);
};