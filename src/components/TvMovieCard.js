import React from 'react';

const TvMovieCard = ({
  id,
  name,
  poster,
  overview,
  stream,
  setSeries,
  isFocused
}) => {
  return <a
    tabIndex='0'
    href='# '
    className={'movie-item search-result ' + (!!stream && 'stream') + (!!setSeries && ' series')}
    onClick={() => {
      if (!!setSeries) setSeries(id)
      else if (!!stream) window.location = stream;
    }}
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
      <p>{overview}</p>
    </div>
  </a>;
}
export default TvMovieCard;