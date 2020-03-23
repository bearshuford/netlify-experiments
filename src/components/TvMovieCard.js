import React from 'react';

const TvMovieCard = ({
  id,
  name,
  poster,
  overview,
  stream,
  setSeries,
}) =>
  <div
    className={'movie-item search-result ' + (!!stream && 'stream') + (!!setSeries && ' series')}
    onClick={() => {
      if (!!setSeries)
        setSeries(id)
      else if (!!stream)
        window.location = stream;
    }}
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

  export default TvMovieCard;