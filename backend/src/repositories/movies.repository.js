import pool from "../db/database.js";

export const createMovie = async (title, releaseDate, sourceUrl) => {
    const result = await pool.query(
        `
        INSERT INTO movies (title, release_date, source_url)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [title, releaseDate, sourceUrl]
    );

    return result.rows[0];
};

export const getAllMovies = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM movies
        ORDER BY release_date ASC
        `
    );

    return result.rows;
};

export const getMovieById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM movies
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const updateMovie = async (id, title, releaseDate, sourceUrl) => {
    const result = await pool.query(
        `
        UPDATE movies
        SET
            title = $1,
            release_date = $2,
            source_url = $3,
            updated_at = NOW()
        WHERE id = $4
        RETURNING *
        `,
        [title, releaseDate, sourceUrl, id]
    );

    return result.rows[0];
};

export const deleteMovie = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM movies
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

export const findMovieBySourceUrl = async (sourceUrl) => {
    const result = await pool.query(
        `
        SELECT *
        FROM movies
        WHERE source_url = $1
        LIMIT 1
        `,
        [sourceUrl]
    );

    return result.rows[0] ?? null;
};