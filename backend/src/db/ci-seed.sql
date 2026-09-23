INSERT INTO movies (title, release_date, source_url)
VALUES
    (
        'UFC 331: Van vs. Pantoja 2',
        CURRENT_DATE,
        'https://example.com/ufc-331'
    ),
    (
        'CI Releasing Soon Movie',
        CURRENT_DATE + INTERVAL '3 days',
        'https://example.com/ci-releasing-soon-movie'
    ),
    (
        'CI Upcoming Movie',
        CURRENT_DATE + INTERVAL '6 days',
        'https://example.com/ci-upcoming-movie'
    );

INSERT INTO series (title, source_url)
VALUES
    (
        'CI Test Series',
        'https://example.com/ci-test-series'
    );

INSERT INTO seasons (series_id, season_number)
SELECT id, 1
FROM series
WHERE title = 'CI Test Series';

INSERT INTO episodes (
    season_id,
    episode_number,
    title,
    release_date,
    source_url
)
SELECT
    id,
    1,
    'CI Released Episode',
    CURRENT_DATE,
    'https://example.com/ci-released-episode'
FROM seasons
WHERE season_number = 1
  AND series_id = (
      SELECT id
      FROM series
      WHERE title = 'CI Test Series'
  );

INSERT INTO episodes (
    season_id,
    episode_number,
    title,
    release_date,
    source_url
)
SELECT
    id,
    2,
    'CI Releasing Soon Episode',
    CURRENT_DATE + INTERVAL '3 days',
    'https://example.com/ci-releasing-soon-episode'
FROM seasons
WHERE season_number = 1
  AND series_id = (
      SELECT id
      FROM series
      WHERE title = 'CI Test Series'
  );

INSERT INTO episodes (
    season_id,
    episode_number,
    title,
    release_date,
    source_url
)
SELECT
    id,
    3,
    'CI Upcoming Episode',
    CURRENT_DATE + INTERVAL '6 days',
    'https://example.com/ci-upcoming-episode'
FROM seasons
WHERE season_number = 1
  AND series_id = (
      SELECT id
      FROM series
      WHERE title = 'CI Test Series'
  );