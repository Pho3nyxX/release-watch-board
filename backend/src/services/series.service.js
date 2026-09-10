import {
    createSeries,
    getAllSeries,
    getSeriesById,
    updateSeries,
    deleteSeries
} from "../repositories/series.repository.js";

export const createSeriesService = async (title, sourceUrl) => {
    return createSeries(title, sourceUrl);
};

export const getAllSeriesService = async () => {
    return getAllSeries();
};

export const getSeriesByIdService = async (id) => {
    return getSeriesById(id);
};

export const updateSeriesService = async (id, title, sourceUrl) => {
    return updateSeries(id, title, sourceUrl);
};

export const deleteSeriesService = async (id) => {
    return deleteSeries(id);
};