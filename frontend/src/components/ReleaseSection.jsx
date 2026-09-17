import MovieCard from "./MovieCard.jsx";
import SeriesCard from "./SeriesCard.jsx";

function ReleaseSection({ title, releases, statusColor }) {
    return (
        <section className={`release-section ${statusColor}`}>
            <h2>
                {title} ({releases.length})
            </h2>

            {releases.length === 0 ? (
                <p className="empty-message">
                    No releases in this category.
                </p>
            ) : (
                <div className="movie-list">
                    {releases.map((release) => {
                        if (release.type === "movie") {
                            return (
                                <MovieCard
                                    key={`movie-${release.id}`}
                                    movie={release}
                                />
                            );
                        }

                        return (
                            <SeriesCard
                                key={`series-${release.id}`}
                                episode={release}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ReleaseSection;