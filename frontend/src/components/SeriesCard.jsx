import { useState } from "react";
import { formatReleaseDate } from "../utils/date.utils.js";

function SeriesCard({ episode }) {
    const [watched, setWatched] = useState(false);

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
                    className={`watched-button ${watched ? "watched" : ""}`}
                    onClick={() => setWatched(!watched)}
                >
                    {watched ? "✓ Watched" : "Mark as Watched"}
                </button>
            </div>
        </article>
    );
}

export default SeriesCard;