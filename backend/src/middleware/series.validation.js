import { body, param } from "express-validator";

export const createSeriesValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];

export const seriesIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Series ID must be a positive integer")
];

export const updateSeriesValidation = [
    ...seriesIdValidation,

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];