import React, { useState } from 'react';
import { SearchResults, SeriesDetails, Credits } from './components';

import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [series, setSeries] = useState('');
  const [credits, setCredits] = useState('');
  const [title, setTitle] = useState('');

  return <div className='app'>
    {!!title && <h1>{title}</h1>}
    {
      !!series ?
        <SeriesDetails
          id={series}
          closeDetails={() => setSeries('')}
        />
        : !!credits ?
          <Credits
            id={credits}
            setSeries
            closeDetails={() => { setCredits(''); setTitle(''); }}
            setSeries={id => setSeries(id)}
          />
          :
          <>
            <label>
              search for movies and tv shows
          </label>
            <input
              autoFocus
              onChange={({ target }) => setQuery(target.value)}
              value={query}
            />
            {query && query.length > 0 &&
              <SearchResults
                query={query}
                setSeries={id => setSeries(id)}
                setCredits={(id, title) => { setCredits(id); setTitle(title); }}
              />
            }
          </>
    }
  </div>
};

export default App;