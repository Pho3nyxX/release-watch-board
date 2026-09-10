import { Router } from "express";
import {
    markMovieAsWatched,
    unmarkMovieAsWatched,
    getMovieWatchStatus,
    markEpisodeAsWatched,
    unmarkEpisodeAsWatched,
    getEpisodeWatchStatus
} from "../controllers/watch-status.controller.js";

const router = Router();

router.post("/movies/:id/watched", markMovieAsWatched);
router.delete("/movies/:id/watched", unmarkMovieAsWatched);
router.get("/movies/:id/watched", getMovieWatchStatus);

router.post("/episodes/:id/watched", markEpisodeAsWatched);
router.delete("/episodes/:id/watched", unmarkEpisodeAsWatched);
router.get("/episodes/:id/watched", getEpisodeWatchStatus);

export default router;