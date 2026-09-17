import { formatReleaseDate } from "../utils/date.utils.js";

function MovieCard({ movie }) {
    return (
        <article className="movie-card">
            <h3>{movie.title}</h3>

            <p>
                Release date: {formatReleaseDate(movie.release_date)}
            </p>

            <span className={`status ${movie.statusMetadata.color}`}>
                {movie.statusMetadata.label}
            </span>
        </article>
    );
}

export default MovieCard;