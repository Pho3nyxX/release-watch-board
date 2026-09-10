import { Router } from "express";
import {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
} from "../controllers/movies.controller.js";

const router = Router();

router.post("/", createMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;