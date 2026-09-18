import { useEffect, useState } from "react";
import {
    getMovieReleases,
    getEpisodeReleases
} from "./api/movies.api.js";
import {
    getMovieWatchedStatus,
    getEpisodeWatchedStatus
} from "./api/watch-status.api.js";
import ReleaseSection from "./components/ReleaseSection.jsx";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [watchedStatuses, setWatchedStatuses] = useState({});
    const [watchedDates, setWatchedDates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [watchedFilter, setWatchedFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadReleases = async () => {
            try {
                const [movieData, episodeData] = await Promise.all([
                    getMovieReleases(),
                    getEpisodeReleases()
                ]);

                setMovies(movieData);
                setEpisodes(episodeData);

                const movieStatuses = await Promise.all(
                    movieData.map(async (movie) => {
                        const data =
                            await getMovieWatchedStatus(movie.id);

                        return {
                            key: `movie-${movie.id}`,
                            watched: data.watched,
                            watchedAt:
                                data.watched_at ??
                                data.watchedAt ??
                                null
                        };
                    })
                );

                const episodeStatuses = await Promise.all(
                    episodeData.map(async (episode) => {
                        const data =
                            await getEpisodeWatchedStatus(
                                episode.id
                            );

                        return {
                            key: `series-${episode.id}`,
                            watched: data.watched,
                            watchedAt:
                                data.watched_at ??
                                data.watchedAt ??
                                null
                        };
                    })
                );

                const statuses = [
                    ...movieStatuses,
                    ...episodeStatuses
                ].reduce((result, item) => {
                    result[item.key] = item.watched;
                    return result;
                }, {});

                const dates = [
                    ...movieStatuses,
                    ...episodeStatuses
                ].reduce((result, item) => {
                    result[item.key] = item.watchedAt;
                    return result;
                }, {});

                setWatchedStatuses(statuses);
                setWatchedDates(dates);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadReleases();
    }, []);

    const handleWatchedChange = (
        key,
        watched,
        watchedAt = null
    ) => {
        setWatchedStatuses((currentStatuses) => ({
            ...currentStatuses,
            [key]: watched
        }));

        setWatchedDates((currentDates) => ({
            ...currentDates,
            [key]: watchedAt
        }));
    };

    const releases = [
        ...movies.map((movie) => ({
            ...movie,
            type: "movie",
            watched:
                watchedStatuses[`movie-${movie.id}`] ?? false,
            watchedAt:
                watchedDates[`movie-${movie.id}`] ?? null
        })),
        ...episodes.map((episode) => ({
            ...episode,
            type: "series",
            watched:
                watchedStatuses[`series-${episode.id}`] ?? false,
            watchedAt:
                watchedDates[`series-${episode.id}`] ?? null
        }))
    ];

    const filteredReleases = releases.filter((release) => {
        if (
            typeFilter !== "all" &&
            release.type !== typeFilter
        ) {
            return false;
        }

        if (
            watchedFilter !== "all" &&
            release.watched !==
                (watchedFilter === "watched")
        ) {
            return false;
        }

        const search = searchTerm.toLowerCase().trim();

        if (!search) {
            return true;
        }

        if (release.type === "movie") {
            return release.title
                .toLowerCase()
                .includes(search);
        }

        return (
            release.series_title
                .toLowerCase()
                .includes(search) ||
            release.episode_title
                ?.toLowerCase()
                .includes(search)
        );
    });

    const sortedReleases = [...filteredReleases].sort(
        (a, b) => {
            return sortOrder === "asc"
                ? new Date(a.release_date) -
                      new Date(b.release_date)
                : new Date(b.release_date) -
                      new Date(a.release_date);
        }
    );

    const releasedReleases = sortedReleases.filter(
        (release) => release.status === "released"
    );

    const releasingSoonReleases = sortedReleases.filter(
        (release) => release.status === "releasing_soon"
    );

    const upcomingReleases = sortedReleases.filter(
        (release) => release.status === "upcoming"
    );

    return (
        <div className="app">
            <header className="app-header">
                <h1>Release Watch Board</h1>
            </header>

            <main>
                {loading && <p>Loading releases...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="search-container">
                            <label htmlFor="release-search">
                                Search releases:
                            </label>

                            <input
                                id="release-search"
                                type="search"
                                placeholder="Search movies or series..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                            />
                        </div>

                        <div className="release-filters">
                            <button
                                className={
                                    typeFilter === "all"
                                        ? "active"
                                        : ""
                                }
                                onClick={() => setTypeFilter("all")}
                            >
                                All
                            </button>

                            <button
                                className={
                                    typeFilter === "movie"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setTypeFilter("movie")
                                }
                            >
                                Movies
                            </button>

                            <button
                                className={
                                    typeFilter === "series"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setTypeFilter("series")
                                }
                            >
                                Series
                            </button>
                        </div>

                        <div className="status-filters">
                            <button
                                className={
                                    statusFilter === "all"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("all")
                                }
                            >
                                All Statuses
                            </button>

                            <button
                                className={
                                    statusFilter === "released"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("released")
                                }
                            >
                                Released
                            </button>

                            <button
                                className={
                                    statusFilter === "releasing_soon"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter(
                                        "releasing_soon"
                                    )
                                }
                            >
                                Releasing Soon
                            </button>

                            <button
                                className={
                                    statusFilter === "upcoming"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("upcoming")
                                }
                            >
                                Upcoming
                            </button>
                        </div>

                        <div className="watched-filters">
                            <button
                                className={
                                    watchedFilter === "all"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setWatchedFilter("all")
                                }
                            >
                                All Watch Status
                            </button>

                            <button
                                className={
                                    watchedFilter === "watched"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setWatchedFilter("watched")
                                }
                            >
                                Watched
                            </button>

                            <button
                                className={
                                    watchedFilter === "unwatched"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setWatchedFilter("unwatched")
                                }
                            >
                                Unwatched
                            </button>
                        </div>

                        <div className="sort-controls">
                            <label htmlFor="sort-order">
                                Sort by release date:
                            </label>

                            <select
                                id="sort-order"
                                value={sortOrder}
                                onChange={(event) =>
                                    setSortOrder(event.target.value)
                                }
                            >
                                <option value="asc">
                                    Earliest first
                                </option>

                                <option value="desc">
                                    Latest first
                                </option>
                            </select>
                        </div>

                        <div className="release-board">
                            {(statusFilter === "all" ||
                                statusFilter === "released") && (
                                <ReleaseSection
                                    title="Released"
                                    releases={releasedReleases}
                                    statusColor="green"
                                    onWatchedChange={
                                        handleWatchedChange
                                    }
                                />
                            )}

                            {(statusFilter === "all" ||
                                statusFilter === "releasing_soon") && (
                                <ReleaseSection
                                    title="Releasing Soon"
                                    releases={releasingSoonReleases}
                                    statusColor="yellow"
                                    onWatchedChange={
                                        handleWatchedChange
                                    }
                                />
                            )}

                            {(statusFilter === "all" ||
                                statusFilter === "upcoming") && (
                                <ReleaseSection
                                    title="Upcoming"
                                    releases={upcomingReleases}
                                    statusColor="red"
                                    onWatchedChange={
                                        handleWatchedChange
                                    }
                                />
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;