import { useState } from "react";
import { formatReleaseDate, formatWatchedDate } from "../utils/date.utils.js";
import {
    markMovieWatched,
    markMovieUnwatched
} from "../api/watch-status.api.js";

function MovieCard({ movie, onWatchedChange }) {
    const [watching, setWatching] = useState(false);
    const [error, setError] = useState(null);

    const handleWatchedToggle = async () => {
        setWatching(true);
        setError(null);

        const key = `movie-${movie.id}`;

        try {
            if (movie.watched) {
                await markMovieUnwatched(movie.id);

                onWatchedChange(key, false, null);
            } else {
                const data = await markMovieWatched(movie.id);

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
        <article className="movie-card">
            <div className="movie-card-content">
                <h3>{movie.title}</h3>

                <p className="release-date">
                    {formatReleaseDate(movie.release_date)}
                </p>

                <span
                    className={`status ${movie.statusMetadata.color}`}
                >
                    {movie.statusMetadata.label}
                </span>

                <button
                    className={`watched-button ${
                        movie.watched ? "watched" : ""
                    }`}
                    onClick={handleWatchedToggle}
                    disabled={watching}
                >
                    {watching
                        ? "Updating..."
                        : movie.watched
                          ? "✓ Watched"
                          : "Mark as Watched"}
                </button>

                {movie.watched && movie.watchedAt && (
                    <p className="watched-date">
                        Watched on{" "}
                        {formatWatchedDate(movie.watchedAt)}
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

export default MovieCard;