import { useEffect, useState } from 'react'
import { processResults } from '../utils';

const useMultisearch = (query) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // TODO: handle empty string

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `.netlify/functions/multisearch?query=${query}&stream=true`
  
    fetch(apiUrl, { mode: 'cors' })
      .then(res => res.json())
      .then(({ results }) => {
        setLoading(false)
        setResults(processResults(results));
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [query])

  return { results, loading, error }
}

export default useMultisearch;