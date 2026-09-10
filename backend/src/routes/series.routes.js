import { Router } from "express";
import {
    createSeries,
    getSeries,
    getSeriesById,
    updateSeries,
    deleteSeries
} from "../controllers/series.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import {
    createSeriesValidation,
    seriesIdValidation,
    updateSeriesValidation
} from "../middleware/series.validation.js";

const router = Router();

router.post(
    "/",
    createSeriesValidation,
    validateRequest,
    createSeries
);

router.get("/", getSeries);

router.get(
    "/:id",
    seriesIdValidation,
    validateRequest,
    getSeriesById
);

router.put(
    "/:id",
    updateSeriesValidation,
    validateRequest,
    updateSeries
);

router.delete(
    "/:id",
    seriesIdValidation,
    validateRequest,
    deleteSeries
);

export default router;