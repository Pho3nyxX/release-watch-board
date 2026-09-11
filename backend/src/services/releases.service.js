import {
    getUpcomingMovies,
    getUpcomingEpisodes
} from "../repositories/releases.repository.js";
import { getReleaseStatus } from "./release-status.service.js";

export const getUpcomingMoviesService = async (days) => {
    const movies = await getUpcomingMovies(days);

    return movies.map((movie) => ({
        ...movie,
        status: getReleaseStatus(movie.release_date)
    }));
};

export const getUpcomingEpisodesService = async (days) => {
    return getUpcomingEpisodes(days);
};