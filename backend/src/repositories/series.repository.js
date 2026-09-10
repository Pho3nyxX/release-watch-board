import pool from "../db/database.js";

export const createSeries = async (title, sourceUrl) => {
    const result = await pool.query(
        `
        INSERT INTO series (title, source_url)
        VALUES ($1, $2)
        RETURNING *
        `,
        [title, sourceUrl]
    );

    return result.rows[0];
};

export const getAllSeries = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM series
        ORDER BY title ASC
        `
    );

    return result.rows;
};

export const getSeriesById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM series
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const updateSeries = async (id, title, sourceUrl) => {
    const result = await pool.query(
        `
        UPDATE series
        SET
            title = $1,
            source_url = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
        [title, sourceUrl, id]
    );

    return result.rows[0];
};

export const deleteSeries = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM series
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};