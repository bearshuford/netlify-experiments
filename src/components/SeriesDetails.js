import React from 'react';
import { ErrorBlock } from '.'
import { useSeriesDetails } from '../hooks';

const SeriesDetails = ({ id }) => {
  const { results, loading, error } = useSeriesDetails(id);
  const {
    name,
    seasons,
    overview,
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
        const href = `${streamUrlPrefix}${id}&type=series&season=${season_number}&episode=${(j+1)}`;
        return <li>
          <a key={seasonId + '-' + j} href={href}>
            {'Episode ' + (j + 1)}
          </a>
        </li>;
      });

      return <div key={seasonId + name}>
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