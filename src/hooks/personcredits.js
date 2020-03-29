import { useEffect, useState, useContext } from 'react'
import { processCredits } from '../utils';

import { AuthContext } from '../AuthContext';

const useSeriesDetails = id => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext)
  
  // TODO: handle empty string

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `.netlify/functions/personcredits?id=${id}&auth=${auth}`
  
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
  }, [id, auth])

  return { results, loading, error }
}

export default useSeriesDetails;