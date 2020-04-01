import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorBlock, Vid } from '.'
import { useSeriesDetails } from '../hooks';

const SeriesDetails = () => {
  const { id } = useParams();
  const [showStream, setShowStream] = useState('');
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
    <Vid url={showStream} show={!!showStream}>
      <img src={backdrop} alt={name + ' backdrop'} />
    </Vid>
    <h1> {name} </h1>
    <div class='season-list'>
      {seasons && seasons.map(({
        episode_count,
        id: seasonId,
        name,
        overview,
        season_number,
      }, i) => {
        if (name === 'Specials') return null;

        const episodes = streamUrlPrefix && [...Array(episode_count).keys()].map(j => {
          const url = `${streamUrlPrefix}${id}&season=${season_number}&episode=${(j + 1)}`;
          const onClick = e => {
            e.preventDefault();
            setShowStream(url);
            return false;
          };
          return <li key={seasonId + '-' + j}>
            <a href='# ' onClick={onClick} tabIndex='0'>
              {'Episode ' + (j + 1)}
            </a>
          </li>;
        });

        return <div className='season'>
          <h2>{name}</h2>
          <p> {overview} </p>
          <ul>
            {episodes}
          </ul>
        </div>
      })}
    </div>
  </>;
}

export default SeriesDetails;