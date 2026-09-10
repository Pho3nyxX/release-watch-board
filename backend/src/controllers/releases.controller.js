import {
    getUpcomingMoviesService,
    getUpcomingEpisodesService
} from "../services/releases.service.js";

export const getUpcomingMovies = async (req, res, next) => {
    try {
        const days = Number(req.query.days) || 7;

        const movies = await getUpcomingMoviesService(days);

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

export const getUpcomingEpisodes = async (req, res, next) => {
    try {
        const days = Number(req.query.days) || 7;

        const episodes = await getUpcomingEpisodesService(days);

        res.status(200).json(episodes);
    } catch (error) {
        next(error);
    }
};