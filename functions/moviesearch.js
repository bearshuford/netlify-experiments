import fetch from "node-fetch";

import { endpoints } from "../api";

const userKeys = process.env.userKeys?.split(",") || [];
const streamUrlPrefix = process.env.streamUrlPrefix;
const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

const prefixImage = (path) => (!path ? null : imgUrlPrefix + path);

const processMovie = (movie, isTrailer) => ({
  name: movie.title,
  id: movie.id,
  poster: prefixImage(movie.poster_path),
  language: movie.original_language,
  overview: movie.overview,
  popularity: movie.popularity,
  release: movie["release_date"],
  character: movie.character,
  trailer: isTrailer && `${streamUrlPrefix}${movie.id.toString()}`,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { query, special } = event.queryStringParameters;

  try {
    const response = await fetch(endpoints.tmdb.search(query), {
      "content-type": "application/json",
    });
    const movieData = await response.text();
    const movieArr = await JSON.parse(movieData);
    let isTrailer = false;
    let userKey = null;
    if (userKeys.includes(query) || userKeys.includes(special)) {
      isTrailer = true;
      if (userKeys.includes(query)) userKey = query;
    } else if (!!special && special.length > 0) {
      userKey = "";
    }
    const movies = movieArr.results.map((movie, i) => {
      return processMovie(movie, isTrailer);
    });

    let src = null;
    try {
      src = await fetch(`${streamUrlPrefix}${movies[0].id.toString()}`);
    } catch (error) {}
    return { statusCode: 200, body: JSON.stringify({ movies, userKey, src }) };
  } catch (error) {
    return error;
  }
};
