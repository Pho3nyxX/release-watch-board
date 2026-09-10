import { body, param } from "express-validator";

export const createSeasonValidation = [
    body("seriesId")
        .isInt({ min: 1 })
        .withMessage("Series ID must be a positive integer"),

    body("seasonNumber")
        .isInt({ min: 1 })
        .withMessage("Season number must be a positive integer")
];

export const seasonIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Season ID must be a positive integer")
];

export const seriesIdParamValidation = [
    param("seriesId")
        .isInt({ min: 1 })
        .withMessage("Series ID must be a positive integer")
];

export const updateSeasonValidation = [
    ...seasonIdValidation,

    body("seriesId")
        .isInt({ min: 1 })
        .withMessage("Series ID must be a positive integer"),

    body("seasonNumber")
        .isInt({ min: 1 })
        .withMessage("Season number must be a positive integer")
];