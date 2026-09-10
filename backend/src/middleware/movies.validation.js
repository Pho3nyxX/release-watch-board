import { body, param } from "express-validator";

export const createMovieValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("releaseDate")
        .isISO8601()
        .withMessage("Release date must be a valid date"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];

export const movieIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Movie ID must be a positive integer")
];

export const updateMovieValidation = [
    ...movieIdValidation,

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("releaseDate")
        .isISO8601()
        .withMessage("Release date must be a valid date"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];