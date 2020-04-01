import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Vid } from '.';

const LinkOrAnchor = ({ type, children, to, onClick, ...props }) => {
  if (type === 'movie')
    return <a
      tabIndex='0'
      onClick={onClick}
      disabled={!onClick}
      {...props}
    >
      {children}
    </a>;
  else
    return <Link tabIndex='0' {...props} to={to}>
      {children}
    </Link>
}

const TvMovieCard = ({
  id,
  name,
  poster,
  overview,
  stream,
  type,
}) => {
  const [showStream, setShowStream] = useState(false);

  return <LinkOrAnchor
    to={`/series/${id}`}
    className={'movie-item search-result ' + (!!stream && 'stream')}
    onClick={!!stream ? () => setShowStream(true) : null}
    type={type}
  >
    <Vid url={stream} show={showStream && !!stream}>
      <div className='image-wrapper'>
        {!!poster && <img alt={name + ' poster'} src={poster} />}
      </div>
      <div>
        <h4>{name}</h4>
        <p>{overview}</p>
      </div>
    </Vid>
  </LinkOrAnchor>;
}
export default TvMovieCard;