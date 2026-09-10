import { Router } from "express";
import {
    getUpcomingMovies,
    getUpcomingEpisodes
} from "../controllers/releases.controller.js";

const router = Router();

router.get("/movies", getUpcomingMovies);
router.get("/episodes", getUpcomingEpisodes);

export default router;