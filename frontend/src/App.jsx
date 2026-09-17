import { useEffect, useState } from "react";
import { getMovieReleases } from "./api/movies.api.js";
import ReleaseSection from "./components/ReleaseSection.jsx";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovieReleases();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const releasedMovies = movies.filter(
    (movie) => movie.status === "released"
  );

  const releasingSoonMovies = movies.filter(
    (movie) => movie.status === "releasing_soon"
  );

  const upcomingMovies = movies.filter(
    (movie) => movie.status === "upcoming"
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Release Watch Board</h1>
      </header>

      <main>
        {loading && <p>Loading movies...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="release-board">
            <ReleaseSection
              title="Released"
              movies={releasedMovies}
              statusColor="green"
            />

            <ReleaseSection
              title="Releasing Soon"
              movies={releasingSoonMovies}
              statusColor="yellow"
            />

            <ReleaseSection
              title="Upcoming"
              movies={upcomingMovies}
              statusColor="red"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;