const API_URL = "http://localhost:3000/api";

export const getMovieWatchedStatus = async (movieId) => {
    const response = await fetch(
        `${API_URL}/movies/${movieId}/watched`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch movie watched status"
        );
    }

    return response.json();
};

export const markMovieWatched = async (movieId) => {
    const response = await fetch(
        `${API_URL}/movies/${movieId}/watched`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark movie as watched");
    }

    return response.json();
};

export const markMovieUnwatched = async (movieId) => {
    const response = await fetch(
        `${API_URL}/movies/${movieId}/watched`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark movie as unwatched");
    }

    return response.json();
};

export const getEpisodeWatchedStatus = async (episodeId) => {
    const response = await fetch(
        `${API_URL}/episodes/${episodeId}/watched`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch episode watched status"
        );
    }

    return response.json();
};

export const markEpisodeWatched = async (episodeId) => {
    const response = await fetch(
        `${API_URL}/episodes/${episodeId}/watched`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark episode as watched");
    }

    return response.json();
};

export const markEpisodeUnwatched = async (episodeId) => {
    const response = await fetch(
        `${API_URL}/episodes/${episodeId}/watched`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to mark episode as unwatched"
        );
    }

    return response.json();
};