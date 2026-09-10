import { Router } from "express";
import {
    getUpcomingMovies,
    getUpcomingEpisodes
} from "../controllers/releases.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import { releaseDaysValidation } from "../middleware/releases.validation.js";

const router = Router();

router.get(
    "/movies",
    releaseDaysValidation,
    validateRequest,
    getUpcomingMovies
);

router.get(
    "/episodes",
    releaseDaysValidation,
    validateRequest,
    getUpcomingEpisodes
);

export default router;