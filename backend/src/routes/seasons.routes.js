import { Router } from "express";
import {
    createSeason,
    getSeasons,
    getSeasonsBySeries,
    getSeason,
    updateSeason,
    deleteSeason
} from "../controllers/seasons.controller.js";

const router = Router();

router.post("/", createSeason);
router.get("/", getSeasons);
router.get("/series/:seriesId", getSeasonsBySeries);
router.get("/:id", getSeason);
router.put("/:id", updateSeason);
router.delete("/:id", deleteSeason);

export default router;