import { Router } from "express";
import {
    createSeason,
    getSeasons,
    getSeasonsBySeries,
    getSeason,
    updateSeason,
    deleteSeason
} from "../controllers/seasons.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import {
    createSeasonValidation,
    seasonIdValidation,
    seriesIdParamValidation,
    updateSeasonValidation
} from "../middleware/seasons.validation.js";

const router = Router();

router.post(
    "/",
    createSeasonValidation,
    validateRequest,
    createSeason
);

router.get("/", getSeasons);

router.get(
    "/series/:seriesId",
    seriesIdParamValidation,
    validateRequest,
    getSeasonsBySeries
);

router.get(
    "/:id",
    seasonIdValidation,
    validateRequest,
    getSeason
);

router.put(
    "/:id",
    updateSeasonValidation,
    validateRequest,
    updateSeason
);

router.delete(
    "/:id",
    seasonIdValidation,
    validateRequest,
    deleteSeason
);

export default router;