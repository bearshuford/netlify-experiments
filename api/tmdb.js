import moviedb from "moviedb-promise";

const tmdb = new moviedb(process.env.movieDbApiKey);

export default tmdb;