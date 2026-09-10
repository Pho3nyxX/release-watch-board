import express from "express";
import healthRoutes from "./routes/health.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import seriesRoutes from "./routes/series.routes.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/series", seriesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;