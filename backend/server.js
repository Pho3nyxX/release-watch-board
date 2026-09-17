import app from "./src/app.js";
import env from "./src/config/env.js";
import { startReleaseScheduler } from "./src/scheduler/release.scheduler.js";

startReleaseScheduler();

app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
});