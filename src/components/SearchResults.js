import React from 'react';
import { useMultisearch } from '../hooks';

const TvMovieItem = ({
  name,
  poster,
  overview,
}) =>
  <div>
    <div className='image-wrapper'>
      {!!poster &&
        <img alt={name + ' poster'} src={poster} />
      }
    </div>
    <div>
      <h4>{name}</h4>
      <p>{overview}</p>
    </div>
  </div>;


const PersonItem = ({
  name,
  poster,
  department,
}) =>
  <div>
    <div className='image-wrapper'>
      {!!poster &&
        <img alt={name + ' poster'} src={poster} />
      }
    </div>
    <div>
      <h4>{name}</h4>
      {!!department && <p>({department})</p>}
    </div>
  </div>


const SearchResults = ({ query }) => {
  const { results, loading, error } = useMultisearch(query);

  if (loading) return <h4>'loading...'</h4>;

  if (!!error) {
    console.log('error', error);
    return <>
      <h4>error:</h4>
      {/* <pre>{error}</pre> */}
    </>;
  }

  return <>
    {!!results.tv && results.tv.length > 0 &&
      <>
        <h3>TV</h3>
        {results.tv.map(
          ({ id, ...props }) => <TvMovieItem {...props} key={id} />
        )}
      </>
    }
    {!!results.movie && results.movie.length > 0 &&
      <>
        <h3>Movies</h3>
        {results.movie.map(
          ({ id, ...props }) => <TvMovieItem {...props} key={id} />
        )}
      </>
    }
    {!!results.person && results.person.length > 0 &&
      <>
        <h3>People</h3>
        {results.person.map(
          ({ id, ...props }) => <PersonItem {...props} key={id} />
        )}
      </>
    }
  </>;
}

export default SearchResults;