import {
    createEpisode,
    getAllEpisodes,
    getEpisodesBySeasonId,
    getEpisodeById,
    updateEpisode,
    deleteEpisode
} from "../repositories/episodes.repository.js";

export const createEpisodeService = async (
    seasonId,
    episodeNumber,
    title,
    releaseDate,
    sourceUrl
) => {
    return createEpisode(
        seasonId,
        episodeNumber,
        title,
        releaseDate,
        sourceUrl
    );
};

export const getAllEpisodesService = async () => {
    return getAllEpisodes();
};

export const getEpisodesBySeasonIdService = async (seasonId) => {
    return getEpisodesBySeasonId(seasonId);
};

export const getEpisodeByIdService = async (id) => {
    return getEpisodeById(id);
};

export const updateEpisodeService = async (
    id,
    seasonId,
    episodeNumber,
    title,
    releaseDate,
    sourceUrl
) => {
    return updateEpisode(
        id,
        seasonId,
        episodeNumber,
        title,
        releaseDate,
        sourceUrl
    );
};

export const deleteEpisodeService = async (id) => {
    return deleteEpisode(id);
};