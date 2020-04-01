import React from 'react';
import { useParams } from 'react-router-dom';

import { TvMovieCard, ErrorBlock } from '.';
import { useCredits } from '../hooks';

const Credits = ({ setSeries, auth }) => {
  const { id } = useParams();
  const { results, loading, error } = useCredits(id);

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
          />)}
      </>
    )}
  </>
}

export default Credits;