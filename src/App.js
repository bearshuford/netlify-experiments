import React, { useState, useEffect } from 'react';
import './App.css';

const baseUrl = '.netlify/functions/multisearch'

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}?query=${query}`, { mode: 'cors' })
      .then(response => response.json())
      .then(({ results }) => {
        console.log(results);
        setResults(results);
      })
      .catch(() => { })
  }, [query]);

  return (
    <div className='app'>
      <label>
        search for movies, tv shows, &amp; actors
      </label>
      <input
        alt='search'
        onChange={({ target }) => setQuery(target.value)}
        value={query}
      />
      <ul>
        {!!results && 
          results.map(({ name, id }) => !!name && <li key={id}>{name}</li>)
        }
      </ul>
    </div>
  );
}


export default App;