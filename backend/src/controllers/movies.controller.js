import {
    createMovieService,
    getAllMoviesService,
    getMovieByIdService,
    updateMovieService,
    deleteMovieService
} from "../services/movies.service.js";

export const createMovie = async (req, res, next) => {
    try {
        const { title, releaseDate, sourceUrl } = req.body;

        const movie = await createMovieService(
            title,
            releaseDate,
            sourceUrl
        );

        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

export const getMovies = async (req, res, next) => {
    try {
        const movies = await getAllMoviesService();

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

export const getMovie = async (req, res, next) => {
    try {
        const movie = await getMovieByIdService(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found"
            });
        }

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async (req, res, next) => {
    try {
        const { title, releaseDate, sourceUrl } = req.body;

        const movie = await updateMovieService(
            req.params.id,
            title,
            releaseDate,
            sourceUrl
        );

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found"
            });
        }

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await deleteMovieService(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: "error",
                message: "Movie not found"
            });
        }

        res.status(200).json({
            status: "ok",
            message: "Movie deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};