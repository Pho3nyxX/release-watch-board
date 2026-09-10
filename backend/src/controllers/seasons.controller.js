import {
    createSeasonService,
    getAllSeasonsService,
    getSeasonsBySeriesIdService,
    getSeasonByIdService,
    updateSeasonService,
    deleteSeasonService
} from "../services/seasons.service.js";

export const createSeason = async (req, res, next) => {
    try {
        const { seriesId, seasonNumber } = req.body;

        const season = await createSeasonService(
            seriesId,
            seasonNumber
        );

        res.status(201).json(season);
    } catch (error) {
        next(error);
    }
};

export const getSeasons = async (req, res, next) => {
    try {
        const seasons = await getAllSeasonsService();

        res.status(200).json(seasons);
    } catch (error) {
        next(error);
    }
};

export const getSeasonsBySeries = async (req, res, next) => {
    try {
        const seasons = await getSeasonsBySeriesIdService(
            req.params.seriesId
        );

        res.status(200).json(seasons);
    } catch (error) {
        next(error);
    }
};

export const getSeason = async (req, res, next) => {
    try {
        const season = await getSeasonByIdService(req.params.id);

        if (!season) {
            return res.status(404).json({
                status: "error",
                message: "Season not found"
            });
        }

        res.status(200).json(season);
    } catch (error) {
        next(error);
    }
};

export const updateSeason = async (req, res, next) => {
    try {
        const { seriesId, seasonNumber } = req.body;

        const season = await updateSeasonService(
            req.params.id,
            seriesId,
            seasonNumber
        );

        if (!season) {
            return res.status(404).json({
                status: "error",
                message: "Season not found"
            });
        }

        res.status(200).json(season);
    } catch (error) {
        next(error);
    }
};

export const deleteSeason = async (req, res, next) => {
    try {
        const season = await deleteSeasonService(req.params.id);

        if (!season) {
            return res.status(404).json({
                status: "error",
                message: "Season not found"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Season deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};