import React from 'react';
import { TvMovieCard, PersonCard, ErrorBlock } from '.';
import { useMultisearch } from '../hooks';

const ResultsSection = ({
  type,
  results,
  setSeries,
  setCredits,
}) =>
  !!results[type] && results[type].length > 0 &&
  <>
    <h3>{type}</h3>
    {type !== 'person'
      ?
      results[type].map(props =>
        <TvMovieCard
          {...props}
          key={props.id}
          setSeries={type === 'tv' && setSeries}
        />
      )
      :
      results[type].map(props =>
        <PersonCard
          {...props}
          key={props.id}
          setCredits={setCredits}
        />
      )
    }
  </>;


const SearchResults = ({ query, setSeries, setCredits, auth, setAuth }) => {
  const { results, loading, error } = useMultisearch(query, auth, setAuth);

  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />
  if (!results) return null;

  return <>
    {['movie', 'tv', 'person'].map((type, i, arr) =>
      <ResultsSection
        type={type}
        results={results}
        key={type}
        setSeries={setSeries}
        setCredits={setCredits}
      />)}
  </>;
}

export default SearchResults;