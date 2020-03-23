import { useEffect, useState } from 'react'
import { processCredits } from '../utils';

const useSeriesDetails = (id) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // TODO: handle empty string

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `.netlify/functions/personcredits?id=${id}&stream=true`
  
    fetch(apiUrl, { mode: 'cors' })
      .then(res => res.json())
      .then(results => {
        setLoading(false)
        setResults(processCredits(results));
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [id])

  return { results, loading, error }
}

export default useSeriesDetails;