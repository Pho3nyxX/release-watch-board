import { param } from "express-validator";

export const watchedIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("ID must be a positive integer")
];