import { query } from "express-validator";

export const releaseDaysValidation = [
    query("days")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Days must be a positive integer")
];