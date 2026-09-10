import {
    createEpisodeService,
    getAllEpisodesService,
    getEpisodesBySeasonIdService,
    getEpisodeByIdService,
    updateEpisodeService,
    deleteEpisodeService
} from "../services/episodes.service.js";

export const createEpisode = async (req, res, next) => {
    try {
        const {
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl
        } = req.body;

        const episode = await createEpisodeService(
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl
        );

        res.status(201).json(episode);
    } catch (error) {
        next(error);
    }
};

export const getEpisodes = async (req, res, next) => {
    try {
        const episodes = await getAllEpisodesService();

        res.status(200).json(episodes);
    } catch (error) {
        next(error);
    }
};

export const getEpisodesBySeason = async (req, res, next) => {
    try {
        const episodes = await getEpisodesBySeasonIdService(
            req.params.seasonId
        );

        res.status(200).json(episodes);
    } catch (error) {
        next(error);
    }
};

export const getEpisode = async (req, res, next) => {
    try {
        const episode = await getEpisodeByIdService(req.params.id);

        if (!episode) {
            return res.status(404).json({
                status: "error",
                message: "Episode not found"
            });
        }

        res.status(200).json(episode);
    } catch (error) {
        next(error);
    }
};

export const updateEpisode = async (req, res, next) => {
    try {
        const {
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl
        } = req.body;

        const episode = await updateEpisodeService(
            req.params.id,
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl
        );

        if (!episode) {
            return res.status(404).json({
                status: "error",
                message: "Episode not found"
            });
        }

        res.status(200).json(episode);
    } catch (error) {
        next(error);
    }
};

export const deleteEpisode = async (req, res, next) => {
    try {
        const episode = await deleteEpisodeService(req.params.id);

        if (!episode) {
            return res.status(404).json({
                status: "error",
                message: "Episode not found"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Episode deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};