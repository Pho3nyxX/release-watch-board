import { useEffect, useState } from "react";
import {
    getMovieReleases,
    getEpisodeReleases
} from "./api/movies.api.js";
import ReleaseSection from "./components/ReleaseSection.jsx";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadReleases();
    }, []);

    const releases = [
        ...movies.map((movie) => ({
            ...movie,
            type: "movie"
        })),
        ...episodes.map((episode) => ({
            ...episode,
            type: "series"
        }))
    ];

    const filteredReleases = releases.filter((release) => {
        if (
            typeFilter !== "all" &&
            release.type !== typeFilter
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
                                    setStatusFilter("releasing_soon")
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
                                />
                            )}

                            {(statusFilter === "all" ||
                                statusFilter === "releasing_soon") && (
                                <ReleaseSection
                                    title="Releasing Soon"
                                    releases={releasingSoonReleases}
                                    statusColor="yellow"
                                />
                            )}

                            {(statusFilter === "all" ||
                                statusFilter === "upcoming") && (
                                <ReleaseSection
                                    title="Upcoming"
                                    releases={upcomingReleases}
                                    statusColor="red"
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