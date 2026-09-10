import pool from "../db/database.js";

export const getUpcomingMovies = async (days) => {
    const result = await pool.query(
        `
        SELECT
            id,
            title,
            release_date,
            source_url
        FROM movies
        WHERE release_date BETWEEN CURRENT_DATE
            AND CURRENT_DATE + ($1 * INTERVAL '1 day')
        ORDER BY release_date ASC, title ASC
        `,
        [days]
    );

    return result.rows;
};

export const getUpcomingEpisodes = async (days) => {
    const result = await pool.query(
        `
        SELECT
            episodes.id,
            series.title AS series_title,
            seasons.season_number,
            episodes.episode_number,
            episodes.title AS episode_title,
            episodes.release_date,
            episodes.source_url
        FROM episodes
        INNER JOIN seasons
            ON episodes.season_id = seasons.id
        INNER JOIN series
            ON seasons.series_id = series.id
        WHERE episodes.release_date BETWEEN CURRENT_DATE
            AND CURRENT_DATE + ($1 * INTERVAL '1 day')
        ORDER BY
            episodes.release_date ASC,
            series.title ASC,
            seasons.season_number ASC,
            episodes.episode_number ASC
        `,
        [days]
    );

    return result.rows;
};