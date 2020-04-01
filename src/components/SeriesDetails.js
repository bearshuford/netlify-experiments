import React from 'react';
import { useParams } from 'react-router-dom';

import { ErrorBlock } from '.'
import { useSeriesDetails } from '../hooks';

const SeriesDetails = () => {
  const { id } = useParams();
  const { results, loading, error } = useSeriesDetails(id);
  const {
    name,
    seasons,
    backdrop,
    streamUrlPrefix,
  } = results;

  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />
  if (!results) return null;

  return <>
    <img src={backdrop} alt={name + ' backdrop'} />
    <h1> {name} </h1>
    {seasons && seasons.map(({
      episode_count,
      id: seasonId,
      name,
      overview,
      season_number,
    }, i) => {
      const episodes = streamUrlPrefix && [...Array(episode_count).keys()].map(j => {
        const href = `${streamUrlPrefix}${id}&season=${season_number}&episode=${(j+1)}`;
        return <li key={seasonId + '-' + j}>
          <a href={href} tabIndex='0'>
            {'Episode ' + (j + 1)}
          </a>
        </li>;
      });

      return <div>
        <h2>{name}</h2>
        <p> {overview} </p>
        <ul>
          { episodes }
        </ul>
      </div>
    }
    )}
  </>;
}

export default SeriesDetails;