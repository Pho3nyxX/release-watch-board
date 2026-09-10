import { Router } from "express";
import {
    markMovieAsWatched,
    unmarkMovieAsWatched,
    getMovieWatchStatus,
    markEpisodeAsWatched,
    unmarkEpisodeAsWatched,
    getEpisodeWatchStatus
} from "../controllers/watch-status.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import { watchedIdValidation } from "../middleware/watch-status.validation.js";

const router = Router();

router.post(
    "/movies/:id/watched",
    watchedIdValidation,
    validateRequest,
    markMovieAsWatched
);

router.delete(
    "/movies/:id/watched",
    watchedIdValidation,
    validateRequest,
    unmarkMovieAsWatched
);

router.get(
    "/movies/:id/watched",
    watchedIdValidation,
    validateRequest,
    getMovieWatchStatus
);

router.post(
    "/episodes/:id/watched",
    watchedIdValidation,
    validateRequest,
    markEpisodeAsWatched
);

router.delete(
    "/episodes/:id/watched",
    watchedIdValidation,
    validateRequest,
    unmarkEpisodeAsWatched
);

router.get(
    "/episodes/:id/watched",
    watchedIdValidation,
    validateRequest,
    getEpisodeWatchStatus
);

export default router;