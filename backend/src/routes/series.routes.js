import { Router } from "express";
import {
    createSeries,
    getSeries,
    getSeriesById,
    updateSeries,
    deleteSeries
} from "../controllers/series.controller.js";

const router = Router();

router.post("/", createSeries);
router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

export default router;