import pool from "../db/database.js";

export const createSeason = async (seriesId, seasonNumber) => {
    const result = await pool.query(
        `
        INSERT INTO seasons (series_id, season_number)
        VALUES ($1, $2)
        RETURNING *
        `,
        [seriesId, seasonNumber]
    );

    return result.rows[0];
};

export const getAllSeasons = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM seasons
        ORDER BY series_id ASC, season_number ASC
        `
    );

    return result.rows;
};

export const getSeasonsBySeriesId = async (seriesId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM seasons
        WHERE series_id = $1
        ORDER BY season_number ASC
        `,
        [seriesId]
    );

    return result.rows;
};

export const getSeasonById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM seasons
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const updateSeason = async (id, seriesId, seasonNumber) => {
    const result = await pool.query(
        `
        UPDATE seasons
        SET
            series_id = $1,
            season_number = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
        [seriesId, seasonNumber, id]
    );

    return result.rows[0];
};

export const deleteSeason = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM seasons
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};