import { body, param } from "express-validator";

export const createEpisodeValidation = [
    body("seasonId")
        .isInt({ min: 1 })
        .withMessage("Season ID must be a positive integer"),

    body("episodeNumber")
        .isInt({ min: 1 })
        .withMessage("Episode number must be a positive integer"),

    body("title")
        .optional({ values: "falsy" })
        .trim(),

    body("releaseDate")
        .isISO8601()
        .withMessage("Release date must be a valid date"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];

export const episodeIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Episode ID must be a positive integer")
];

export const seasonIdParamValidation = [
    param("seasonId")
        .isInt({ min: 1 })
        .withMessage("Season ID must be a positive integer")
];

export const updateEpisodeValidation = [
    ...episodeIdValidation,

    body("seasonId")
        .isInt({ min: 1 })
        .withMessage("Season ID must be a positive integer"),

    body("episodeNumber")
        .isInt({ min: 1 })
        .withMessage("Episode number must be a positive integer"),

    body("title")
        .optional({ values: "falsy" })
        .trim(),

    body("releaseDate")
        .isISO8601()
        .withMessage("Release date must be a valid date"),

    body("sourceUrl")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("Source URL must be a valid URL")
];