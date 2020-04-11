const movieDbApiRootUrl = "https://api.themoviedb.org/3";
const tvdbApiRootUrl = "https://api.thetvdb.com";

const endpoints = {
  tmdb: {
    search: (query) =>
      `${movieDbApiRootUrl}/search/movie?api_key=${process.env.movieDbApiKey}&query=${query}`,
  },
  tvdb: {
    login: `${tvdbApiRootUrl}/login`,
    search: (query) => `${tvdbApiRootUrl}/search/series?name=${query}`,
    series: (id) => `${tvdbApiRootUrl}/series/${id}`,
    episodes: (id) => `${tvdbApiRootUrl}/series/${id}/episodes`,
    summary: (id) => `${tvdbApiRootUrl}/series/${id}/episodes/summary`,
  },
};

export { endpoints };
