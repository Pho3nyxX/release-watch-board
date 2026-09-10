import {
    createSeason,
    getAllSeasons,
    getSeasonsBySeriesId,
    getSeasonById,
    updateSeason,
    deleteSeason
} from "../repositories/seasons.repository.js";

export const createSeasonService = async (seriesId, seasonNumber) => {
    return createSeason(seriesId, seasonNumber);
};

export const getAllSeasonsService = async () => {
    return getAllSeasons();
};

export const getSeasonsBySeriesIdService = async (seriesId) => {
    return getSeasonsBySeriesId(seriesId);
};

export const getSeasonByIdService = async (id) => {
    return getSeasonById(id);
};

export const updateSeasonService = async (
    id,
    seriesId,
    seasonNumber
) => {
    return updateSeason(id, seriesId, seasonNumber);
};

export const deleteSeasonService = async (id) => {
    return deleteSeason(id);
};