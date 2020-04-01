import React from 'react';
import { Link } from 'react-router-dom';

const LinkOrAnchor = ({ type, children, to, onClick, ...props }) => {
  if (type === 'movie')
    return <a href='# ' onClick={onClick} {...props}>
      {children}
    </a>;
  else 
    return <Link {...props} to={to}>{children}</Link>
}

const TvMovieCard = ({
  id,
  name,
  poster,
  overview,
  stream,
  type
}) => {
  return <LinkOrAnchor
    tabIndex='0'
    to={`/series/${id}`}
    className={'movie-item search-result ' + (!!stream && 'stream')}
    onClick={() => { window.location = stream; }}
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