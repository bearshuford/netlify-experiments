import React, { useState } from 'react';
import { SearchResults } from './components';

import './App.css';

function App() {
  const [query, setQuery] = useState('');

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
      {query && query.length > 0 &&
        <SearchResults query={query} />
      }
    </div>
  );
}

export default App;