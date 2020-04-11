import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Vid } from '.';

const LinkOrAnchor = ({ type, children, to, onClick, ...props }) => {
  if (type === 'movies')
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
  trailer,
  type,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);
  return <LinkOrAnchor
    to={`/series/${id}`}
    className={'movie-item search-result ' + (!!trailer && 'trailer')}
    onClick={!!trailer ? () => setShowTrailer(true) : null}
    type={type}
  >
    <Vid url={trailer} show={showTrailer && !!trailer}>
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