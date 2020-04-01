import React from 'react';
import { Link } from 'react-router-dom';

const LinkOrAnchor = ({ type, children, to, href, ...props }) => {
  if (type === 'movie')
    return <a
      tabIndex='0'
      href={href}
      disabled={!href}
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
  return <LinkOrAnchor
    to={`/series/${id}`}
    className={'movie-item search-result ' + (!!stream && 'stream')}
    href={stream}
    type={type}
  >
    <div className='image-wrapper'>
      {!!poster && <img alt={name + ' poster'} src={poster} />}
    </div>
    <div>
      <h4>{name}</h4>
      <p>{overview}</p>
    </div>
  </LinkOrAnchor>;
}
export default TvMovieCard;