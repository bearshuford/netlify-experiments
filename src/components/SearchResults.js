import React from 'react';
import { useMultisearch } from '../hooks';

const TvMovieItem = ({
  name,
  poster,
  overview,
  stream
}) =>
  <div
    className={'movie-item search-result ' + !!stream && 'stream'}
    onClick={ () => {!!stream && (window.location = stream)}}
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
      <p>{overview}</p>
      {!!stream && <a href={stream}>watch stream</a>}
    </div>
  </div>;

const ErrorBlock = ({ error }) => <>
  <h4>error:</h4>
  <pre>{!!error && error.toString()}</pre>
</>;

const ResultsSection = ({ type, results }) =>
  !!results[type] && results[type].length > 0 &&
  <>
    <h3>{type}</h3>
    {results[type].map(({ id, ...props }) =>
      <TvMovieItem {...props} key={id} />
    )}
  </>;


const SearchResults = ({ query }) => {
  const { results, loading, error } = useMultisearch(query);

  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />
  if (!results) return null;

  return <>
    {['movie', 'tv'].map(type =>
      <ResultsSection
        type={type}
        results={results}
        key={type}
      />)}
  </>;
}

export default SearchResults;