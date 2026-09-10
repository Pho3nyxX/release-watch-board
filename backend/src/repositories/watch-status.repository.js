import pool from "../db/database.js";

export const markMovieAsWatched = async (movieId) => {
    const result = await pool.query(
        `
        INSERT INTO movie_watch_status (movie_id)
        VALUES ($1)
        ON CONFLICT (movie_id)
        DO UPDATE SET watched_at = NOW()
        RETURNING *
        `,
        [movieId]
    );

    return result.rows[0];
};

export const unmarkMovieAsWatched = async (movieId) => {
    const result = await pool.query(
        `
        DELETE FROM movie_watch_status
        WHERE movie_id = $1
        RETURNING *
        `,
        [movieId]
    );

    return result.rows[0];
};

export const getMovieWatchStatus = async (movieId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM movie_watch_status
        WHERE movie_id = $1
        `,
        [movieId]
    );

    return result.rows[0];
};

export const markEpisodeAsWatched = async (episodeId) => {
    const result = await pool.query(
        `
        INSERT INTO episode_watch_status (episode_id)
        VALUES ($1)
        ON CONFLICT (episode_id)
        DO UPDATE SET watched_at = NOW()
        RETURNING *
        `,
        [episodeId]
    );

    return result.rows[0];
};

export const unmarkEpisodeAsWatched = async (episodeId) => {
    const result = await pool.query(
        `
        DELETE FROM episode_watch_status
        WHERE episode_id = $1
        RETURNING *
        `,
        [episodeId]
    );

    return result.rows[0];
};

export const getEpisodeWatchStatus = async (episodeId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM episode_watch_status
        WHERE episode_id = $1
        `,
        [episodeId]
    );

    return result.rows[0];
};