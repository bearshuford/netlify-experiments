import { useEffect, useState, useContext } from 'react'
import { processResults } from '../utils';

import {AuthContext} from '../AuthContext';

const useMultisearch = query => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth, setAuth } = useContext(AuthContext)
  
  // TODO: handle empty string

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const { origin } = window.location;
    const apiUrl = `${origin}/.netlify/functions/multisearch?query=${query}&auth=${auth}`;
    
    fetch(apiUrl, { mode: 'cors' })
    .then(res => res.json())
    .then(({ results, userKey }) => {
      setLoading(false)
      if(!!userKey && userKey.length > 1) {
          window.localStorage.setItem('userKey', userKey);
          setAuth(userKey)
        }
        setResults(processResults(results));
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [query, auth])

  return { results, loading, error }
}

export default useMultisearch;