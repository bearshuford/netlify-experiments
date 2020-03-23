import { useEffect, useState } from 'react'
import { processSeriesDetails } from '../utils';

const useSeriesDetails = (id) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `.netlify/functions/seriesdetails?id=${id}&stream=true`
  
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
  }, [id])

  return { results, loading, error }
}

export default useSeriesDetails;