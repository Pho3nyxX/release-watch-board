import {
    createMovie,
    updateMovie,
    findMovieBySourceUrl
} from "../repositories/movies.repository.js";
import {
    createSeries,
    updateSeries,
    findSeriesBySourceUrl
} from "../repositories/series.repository.js";

import {
    createSeason,
    updateSeason,
    findSeasonBySeriesAndNumber
} from "../repositories/seasons.repository.js";

import {
    createEpisode,
    updateEpisode,
    findEpisodeBySeasonAndNumber
} from "../repositories/episodes.repository.js";

export const saveMovie = async (movie) => {
    const existingMovie = await findMovieBySourceUrl(
        movie.sourceUrl
    );

    if (existingMovie) {
        return updateMovie(
            existingMovie.id,
            movie.title,
            movie.releaseDate,
            movie.sourceUrl
        );
    }

    return createMovie(
        movie.title,
        movie.releaseDate,
        movie.sourceUrl
    );
};

export const saveSeason = async (seasonData) => {
    const existingSeries = await findSeriesBySourceUrl(
        seasonData.series.sourceUrl
    );

    let series;

    if (existingSeries) {
        series = await updateSeries(
            existingSeries.id,
            seasonData.series.title,
            seasonData.series.sourceUrl
        );
    } else {
        series = await createSeries(
            seasonData.series.title,
            seasonData.series.sourceUrl
        );
    }

    const existingSeason = await findSeasonBySeriesAndNumber(
        series.id,
        seasonData.season.seasonNumber
    );

    let season;

    if (existingSeason) {
        season = await updateSeason(
            existingSeason.id,
            series.id,
            seasonData.season.seasonNumber
        );
    } else {
        season = await createSeason(
            series.id,
            seasonData.season.seasonNumber
        );
    }

    for (const episode of seasonData.episodes) {
        const existingEpisode = await findEpisodeBySeasonAndNumber(
            season.id,
            episode.episodeNumber
        );

        if (existingEpisode) {
            await updateEpisode(
                existingEpisode.id,
                season.id,
                episode.episodeNumber,
                episode.title,
                episode.releaseDate,
                episode.sourceUrl
            );
        } else {
            await createEpisode(
                season.id,
                episode.episodeNumber,
                episode.title,
                episode.releaseDate,
                episode.sourceUrl
            );
        }
    }

    return {
        series,
        season
    };
};