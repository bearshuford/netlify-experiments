import React, { useContext } from 'react';

import { TvMovieCard, PersonCard, ErrorBlock } from '.';
import { useMultisearch } from '../hooks';
import {AuthContext} from '../AuthContext';

const ResultsSection = ({
  type,
  results,
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
          type={type}
        />
      )
      :
      results[type].map(props =>  <PersonCard {...props} key={props.id} />)
    }
  </>;

const SearchResults = ({ query }) => {
  const { auth, setAuth } = useContext(AuthContext)
  const { results, loading, error } = useMultisearch(query, auth, setAuth);

  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />
  if (!results) return null;

  return <>
    {['movie', 'tv', 'person'].map(type =>
      <ResultsSection
        type={type}
        results={results}
        key={type}
      />)}
  </>;
}

export default SearchResults;