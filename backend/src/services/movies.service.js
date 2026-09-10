import {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../repositories/movies.repository.js";

export const createMovieService = async (title, releaseDate, sourceUrl) => {
    return createMovie(title, releaseDate, sourceUrl);
};

export const getAllMoviesService = async () => {
    return getAllMovies();
};

export const getMovieByIdService = async (id) => {
    return getMovieById(id);
};

export const updateMovieService = async (
    id,
    title,
    releaseDate,
    sourceUrl
) => {
    return updateMovie(id, title, releaseDate, sourceUrl);
};

export const deleteMovieService = async (id) => {
    return deleteMovie(id);
};