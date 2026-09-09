CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    source_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE series (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    source_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE seasons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    series_id BIGINT NOT NULL,
    season_number INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_seasons_series
        FOREIGN KEY (series_id)
        REFERENCES series(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_series_season
        UNIQUE (series_id, season_number),

    CONSTRAINT positive_season_number
        CHECK (season_number > 0)
);

CREATE TABLE episodes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    season_id BIGINT NOT NULL,
    episode_number INTEGER NOT NULL,
    title VARCHAR(255),
    release_date DATE NOT NULL,
    source_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_episodes_season
        FOREIGN KEY (season_id)
        REFERENCES seasons(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_season_episode
        UNIQUE (season_id, episode_number),

    CONSTRAINT positive_episode_number
        CHECK (episode_number > 0)
);

CREATE TABLE movie_watch_status (
    movie_id BIGINT PRIMARY KEY,
    watched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_movie_watch_status_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE CASCADE
);

CREATE TABLE episode_watch_status (
    episode_id BIGINT PRIMARY KEY,
    watched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_episode_watch_status_episode
        FOREIGN KEY (episode_id)
        REFERENCES episodes(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_movies_release_date
ON movies(release_date);

CREATE INDEX idx_episodes_release_date
ON episodes(release_date);

CREATE INDEX idx_seasons_series_id
ON seasons(series_id);

CREATE INDEX idx_episodes_season_id
ON episodes(season_id);