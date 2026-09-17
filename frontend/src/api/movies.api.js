const API_URL = "http://localhost:3000/api";

export const getMovies = async () => {
    const response = await fetch(`${API_URL}/movies`);

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    return response.json();
};

export const getMovieReleases = async () => {
    const response = await fetch(`${API_URL}/releases/movies`);

    if (!response.ok) {
        throw new Error("Failed to fetch movie releases");
    }

    return response.json();
};