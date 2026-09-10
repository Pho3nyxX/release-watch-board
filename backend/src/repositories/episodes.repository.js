import pool from "../db/database.js";

export const createEpisode = async (
    seasonId,
    episodeNumber,
    title,
    releaseDate,
    sourceUrl
) => {
    const result = await pool.query(
        `
        INSERT INTO episodes (
            season_id,
            episode_number,
            title,
            release_date,
            source_url
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl
        ]
    );

    return result.rows[0];
};

export const getAllEpisodes = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM episodes
        ORDER BY release_date ASC
        `
    );

    return result.rows;
};

export const getEpisodesBySeasonId = async (seasonId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM episodes
        WHERE season_id = $1
        ORDER BY episode_number ASC
        `,
        [seasonId]
    );

    return result.rows;
};

export const getEpisodeById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM episodes
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const updateEpisode = async (
    id,
    seasonId,
    episodeNumber,
    title,
    releaseDate,
    sourceUrl
) => {
    const result = await pool.query(
        `
        UPDATE episodes
        SET
            season_id = $1,
            episode_number = $2,
            title = $3,
            release_date = $4,
            source_url = $5,
            updated_at = NOW()
        WHERE id = $6
        RETURNING *
        `,
        [
            seasonId,
            episodeNumber,
            title,
            releaseDate,
            sourceUrl,
            id
        ]
    );

    return result.rows[0];
};

export const deleteEpisode = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM episodes
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};