import { Router } from "express";
import {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
} from "../controllers/movies.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import {
    createMovieValidation,
    movieIdValidation,
    updateMovieValidation
} from "../middleware/movies.validation.js";

const router = Router();

router.post(
    "/",
    createMovieValidation,
    validateRequest,
    createMovie
);

router.get("/", getMovies);

router.get(
    "/:id",
    movieIdValidation,
    validateRequest,
    getMovie
);

router.put(
    "/:id",
    updateMovieValidation,
    validateRequest,
    updateMovie
);

router.delete(
    "/:id",
    movieIdValidation,
    validateRequest,
    deleteMovie
);

export default router;