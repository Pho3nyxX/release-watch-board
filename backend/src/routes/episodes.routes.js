import { Router } from "express";
import {
    createEpisode,
    getEpisodes,
    getEpisodesBySeason,
    getEpisode,
    updateEpisode,
    deleteEpisode
} from "../controllers/episodes.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import {
    createEpisodeValidation,
    episodeIdValidation,
    seasonIdParamValidation,
    updateEpisodeValidation
} from "../middleware/episodes.validation.js";

const router = Router();

router.post(
    "/",
    createEpisodeValidation,
    validateRequest,
    createEpisode
);

router.get("/", getEpisodes);

router.get(
    "/season/:seasonId",
    seasonIdParamValidation,
    validateRequest,
    getEpisodesBySeason
);

router.get(
    "/:id",
    episodeIdValidation,
    validateRequest,
    getEpisode
);

router.put(
    "/:id",
    updateEpisodeValidation,
    validateRequest,
    updateEpisode
);

router.delete(
    "/:id",
    episodeIdValidation,
    validateRequest,
    deleteEpisode
);

export default router;