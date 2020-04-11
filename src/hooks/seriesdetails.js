import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../AuthContext";

const useSeriesDetails = (id) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { special, token } = useContext(AuthContext);

  useEffect(() => {
    const { origin } = window.location;
    let fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const apiUrl = `${origin}/.netlify/functions/seriesdetails?id=${id}&special=${special}`;
      const headers = {
        token: token,
        "Content-Type": "application/json",
      };

      try {
        let res = await fetch(apiUrl, { headers, mode: "cors" });
        let results = await res.json();
        setLoading(false);
        setDetails(results);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    if (!!token) fetchDetails();
  }, [id, special, token]);

  return { details, status: { loading, error } };
};

export default useSeriesDetails;
