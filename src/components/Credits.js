import React from 'react';

import { TvMovieCard, ErrorBlock } from '.';
import { useCredits } from '../hooks';

const Credits = ({ id, setSeries, auth }) => {
  const { results, loading, error } = useCredits(id, auth);

  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />
  if (!results) return null;

  return <>
    {['tv', 'movie'].map(type =>
      <>
        <h3>{type}</h3>
        {!!results && results[type] && results[type].map(props =>
          <TvMovieCard
            {...props}
            key={props.id}
            setSeries={id => setSeries(id)}
          />)}
      </>
    )}
  </>
}

export default Credits;