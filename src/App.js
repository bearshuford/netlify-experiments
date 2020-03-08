import React, { useState, useEffect } from 'react';
import { processResults } from './utils';

import './App.css';

const baseUrl = '.netlify/functions/multisearch';
const imgUrl = 'https://image.tmdb.org/t/p/w154/';


function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch(`${baseUrl}?query=${query}`, { mode: 'cors' })
      .then(response => response.json())
      .then(({ results }) => {
        console.log(results, processResults(results));
        setResults(processResults(results));
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
      {!!results && !!results.tv &&
        <>
          <h3>TV</h3>
          <div>
            {results.tv.map(
              ({ name, id, poster, overview }) =>
                <div key={id}>
                  {!!poster &&
                    <img alt={name + 'poster'} src={imgUrl + poster} />
                  }
                  <h4>{name}</h4>
                  <p>{overview}</p>
                </div>
            )}
          </div>
        </>
      }
      {!!results && !!results.movie &&
        <>
          <h3>Movies</h3>
          <div>
            {results.movie.map(
              ({ name, id, poster, overview }) =>
                <div key={id}>
                  {!!poster &&
                    <img alt={name + 'poster'} src={imgUrl + poster} />
                  }
                  <h4>{name}</h4>
                  <p>{overview}</p>
                </div>
            )}
          </div>
        </>
      }
      {!!results && !!results.person &&
        <>
          <h3>People</h3>
          <div>
            {results.person.map(
              ({ name, id, poster, department }) =>
                <div key={id}>
                  {!!poster &&
                    <img alt={name + 'poster'} src={imgUrl + poster} />
                  }
                  <h4>{name}</h4>
                  {!!department && <p>({department})</p>}
                </div>
            )}
          </div>
        </>
      }
    </div>
  );
}

export default App;