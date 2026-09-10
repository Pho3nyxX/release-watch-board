import {
    markMovieAsWatchedService,
    unmarkMovieAsWatchedService,
    getMovieWatchStatusService,
    markEpisodeAsWatchedService,
    unmarkEpisodeAsWatchedService,
    getEpisodeWatchStatusService
} from "../services/watch-status.service.js";

export const markMovieAsWatched = async (req, res, next) => {
    try {
        const watchStatus = await markMovieAsWatchedService(
            req.params.id
        );

        res.status(200).json({
            status: "ok",
            message: "Movie marked as watched",
            watchedAt: watchStatus.watched_at
        });
    } catch (error) {
        next(error);
    }
};

export const unmarkMovieAsWatched = async (req, res, next) => {
    try {
        const watchStatus = await unmarkMovieAsWatchedService(
            req.params.id
        );

        if (!watchStatus) {
            return res.status(404).json({
                status: "error",
                message: "Movie is not marked as watched"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Movie marked as unwatched"
        });
    } catch (error) {
        next(error);
    }
};

export const getMovieWatchStatus = async (req, res, next) => {
    try {
        const watchStatus = await getMovieWatchStatusService(
            req.params.id
        );

        res.status(200).json({
            watched: Boolean(watchStatus),
            watchedAt: watchStatus?.watched_at ?? null
        });
    } catch (error) {
        next(error);
    }
};

export const markEpisodeAsWatched = async (req, res, next) => {
    try {
        const watchStatus = await markEpisodeAsWatchedService(
            req.params.id
        );

        res.status(200).json({
            status: "ok",
            message: "Episode marked as watched",
            watchedAt: watchStatus.watched_at
        });
    } catch (error) {
        next(error);
    }
};

export const unmarkEpisodeAsWatched = async (req, res, next) => {
    try {
        const watchStatus = await unmarkEpisodeAsWatchedService(
            req.params.id
        );

        if (!watchStatus) {
            return res.status(404).json({
                status: "error",
                message: "Episode is not marked as watched"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Episode marked as unwatched"
        });
    } catch (error) {
        next(error);
    }
};

export const getEpisodeWatchStatus = async (req, res, next) => {
    try {
        const watchStatus = await getEpisodeWatchStatusService(
            req.params.id
        );

        res.status(200).json({
            watched: Boolean(watchStatus),
            watchedAt: watchStatus?.watched_at ?? null
        });
    } catch (error) {
        next(error);
    }
};