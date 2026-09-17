import { useState } from "react";
import { formatReleaseDate } from "../utils/date.utils.js";

function MovieCard({ movie }) {
    const [watched, setWatched] = useState(false);

    return (
        <article className="movie-card">
            <div className="movie-card-content">
                <h3>{movie.title}</h3>

                <p className="release-date">
                    {formatReleaseDate(movie.release_date)}
                </p>

                <span className={`status ${movie.statusMetadata.color}`}>
                    {movie.statusMetadata.label}
                </span>

                <button
                    className={`watched-button ${watched ? "watched" : ""}`}
                    onClick={() => setWatched(!watched)}
                >
                    {watched ? "✓ Watched" : "Mark as Watched"}
                </button>
            </div>
        </article>
    );
}

export default MovieCard;