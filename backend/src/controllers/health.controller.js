import { getHealthStatus } from "../services/health.service.js";

export const getHealth = (req, res) => {
    const healthStatus = getHealthStatus();

    res.json(healthStatus);
};