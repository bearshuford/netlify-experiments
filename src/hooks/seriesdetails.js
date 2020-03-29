import { useEffect, useState, useContext } from 'react'
import { processSeriesDetails } from '../utils';

import { AuthContext } from '../AuthContext';

const useSeriesDetails = (id) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext)
  
  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `.netlify/functions/seriesdetails?id=${id}&auth=${auth}`
  
    fetch(apiUrl, { mode: 'cors' })
      .then(res => res.json())
      .then(results => {
        setLoading(false)
        setResults(processSeriesDetails(results));
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [id, auth])

  return { results, loading, error }
}

export default useSeriesDetails;