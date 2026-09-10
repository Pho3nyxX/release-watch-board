import { Router } from "express";
import {
    createEpisode,
    getEpisodes,
    getEpisodesBySeason,
    getEpisode,
    updateEpisode,
    deleteEpisode
} from "../controllers/episodes.controller.js";

const router = Router();

router.post("/", createEpisode);
router.get("/", getEpisodes);
router.get("/season/:seasonId", getEpisodesBySeason);
router.get("/:id", getEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

export default router;