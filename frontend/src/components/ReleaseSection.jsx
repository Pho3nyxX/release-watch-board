import MovieCard from "./MovieCard.jsx";

function ReleaseSection({ title, movies, statusColor }) {
    return (
        <section className={`release-section ${statusColor}`}>
            <h2>{title}</h2>

            {movies.length === 0 ? (
                <p className="empty-message">
                    No releases in this category.
                </p>
            ) : (
                <div className="movie-list">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ReleaseSection;