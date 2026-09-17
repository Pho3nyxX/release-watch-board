import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import seriesRoutes from "./routes/series.routes.js";
import seasonsRoutes from "./routes/seasons.routes.js";
import releasesRoutes from "./routes/releases.routes.js";
import episodesRoutes from "./routes/episodes.routes.js";
import watchStatusRoutes from "./routes/watch-status.routes.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/seasons", seasonsRoutes);
app.use("/api/episodes", episodesRoutes);
app.use("/api/releases", releasesRoutes);
app.use("/api", watchStatusRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;