export const transformMovie = (movie) => {
    return {
        title: movie.title.trim(),
        releaseDate: movie.releaseDate,
        sourceUrl: movie.sourceUrl
    };
};