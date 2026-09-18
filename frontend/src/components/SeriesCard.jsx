import { useState } from "react";
import { formatReleaseDate, formatWatchedDate } from "../utils/date.utils.js";
import {
    markEpisodeWatched,
    markEpisodeUnwatched
} from "../api/watch-status.api.js";

function SeriesCard({ episode, onWatchedChange }) {
    const [watching, setWatching] = useState(false);
    const [error, setError] = useState(null);

    const handleWatchedToggle = async () => {
        setWatching(true);
        setError(null);

        const key = `series-${episode.id}`;

        try {
            if (episode.watched) {
                await markEpisodeUnwatched(episode.id);

                onWatchedChange(key, false, null);
            } else {
                const data = await markEpisodeWatched(
                    episode.id
                );

                const watchedAt =
                    data.watched_at ??
                    data.watchedAt ??
                    null;

                onWatchedChange(key, true, watchedAt);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setWatching(false);
        }
    };

    return (
        <article className="movie-card series-card">
            <div className="movie-card-content">
                <h3>{episode.series_title}</h3>

                <p className="episode-info">
                    Season {episode.season_number}, Episode{" "}
                    {episode.episode_number}
                </p>

                <p className="episode-title">
                    Episode: {episode.episode_title}
                </p>

                <p className="release-date">
                    {formatReleaseDate(episode.release_date)}
                </p>

                <span
                    className={`status ${episode.statusMetadata.color}`}
                >
                    {episode.statusMetadata.label}
                </span>

                <button
                    className={`watched-button ${
                        episode.watched ? "watched" : ""
                    }`}
                    onClick={handleWatchedToggle}
                    disabled={watching}
                >
                    {watching
                        ? "Updating..."
                        : episode.watched
                          ? "✓ Watched"
                          : "Mark as Watched"}
                </button>

                {episode.watched && episode.watchedAt && (
                    <p className="watched-date">
                        Watched on{" "}
                        {formatWatchedDate(episode.watchedAt)}
                    </p>
                )}

                {error && (
                    <p className="watch-error">
                        {error}
                    </p>
                )}
            </div>
        </article>
    );
}

export default SeriesCard;