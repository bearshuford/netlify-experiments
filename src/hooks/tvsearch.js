import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../AuthContext";

const useTvSearch = (query) => {
  const [tv, setTv] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchSearch = async () => {
      const endpoints = {
        tvSearch: `${window.location}/.netlify/functions/tvsearch?query=${query}`,
      };

      if (!token) {
        return;
      }

      try {
        const options = {
          headers: {
            token,
          },
          mode: "cors",
        };
        let response = await fetch(endpoints.tvSearch, options);
        let { tv: tvResults } = await response.json();
        setLoading(false);
        setTv(tvResults);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, token]);

  return { tv, status: { loading, error } };
};

export default useTvSearch;
