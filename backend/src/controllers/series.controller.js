import {
    createSeriesService,
    getAllSeriesService,
    getSeriesByIdService,
    updateSeriesService,
    deleteSeriesService
} from "../services/series.service.js";

export const createSeries = async (req, res, next) => {
    try {
        const { title, sourceUrl } = req.body;

        const series = await createSeriesService(
            title,
            sourceUrl
        );

        res.status(201).json(series);
    } catch (error) {
        next(error);
    }
};

export const getSeries = async (req, res, next) => {
    try {
        const series = await getAllSeriesService();

        res.status(200).json(series);
    } catch (error) {
        next(error);
    }
};

export const getSeriesById = async (req, res, next) => {
    try {
        const series = await getSeriesByIdService(req.params.id);

        if (!series) {
            return res.status(404).json({
                status: "error",
                message: "Series not found"
            });
        }

        res.status(200).json(series);
    } catch (error) {
        next(error);
    }
};

export const updateSeries = async (req, res, next) => {
    try {
        const { title, sourceUrl } = req.body;

        const series = await updateSeriesService(
            req.params.id,
            title,
            sourceUrl
        );

        if (!series) {
            return res.status(404).json({
                status: "error",
                message: "Series not found"
            });
        }

        res.status(200).json(series);
    } catch (error) {
        next(error);
    }
};

export const deleteSeries = async (req, res, next) => {
    try {
        const series = await deleteSeriesService(req.params.id);

        if (!series) {
            return res.status(404).json({
                status: "error",
                message: "Series not found"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Series deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};