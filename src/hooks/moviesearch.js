import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../AuthContext";

const useMovieSearch = (query) => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { special, setSpecial, refreshToken } = useContext(AuthContext);

  // TODO: handle empty string

  useEffect(() => {
    setLoading(true);
    setError(null);
    const searchMovies = async () => {
      const endpoints = {
        movieSearch: `${window.location.origin}/.netlify/functions/moviesearch?query=${query}&special=${special}`,
      };
      // else if() {refresh token}

      try {
        let response = await fetch(endpoints.movieSearch, {
          mode: "cors",
        });
        let { movies: movieResults, userKey } = await response.json();
        setLoading(false);
        if (!!userKey && userKey.length > 1) {
          window.localStorage.setItem("userKey", userKey);
          setSpecial(userKey);
        } else if (userKey === "") {
          window.localStorage.removeItem("userKey");
          setSpecial("");
        }
        setMovies(movieResults);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    searchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, special]);

  return { movies, status: {loading, error} };
};

export default useMovieSearch;
