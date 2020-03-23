const imgUrlPrefix = 'https://image.tmdb.org/t/p/original/';

const prefixImage = path => {
  if (!path) return null;
  else return imgUrlPrefix + path;
}

// const formatStream = (id, season, episode) => { 
//   if(!season && !episode) return streamUrlPrefix + id;
//   // else if (!!episode) return '???';
//   else return null;
// }

// https://stackoverflow.com/a/46431916
const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

const processPerson = ({
  name,
  id,
  known_for_department: department,
  profile_path,
}) => ({
  name,
  id,
  department,
  poster: prefixImage(profile_path)
});

const processTv = ({
  name,
  id,
  poster_path,
  backdrop_path,
  original_language: language,
  overview,
  popularity,
  release_date: release,
  character,
  epsode_count,
}) => ({
  name,
  id,
  poster: prefixImage(poster_path),
  backdrop: prefixImage(backdrop_path),
  language,
  overview,
  popularity,
  release,
  character,
  episodeCount: epsode_count,
});

const processMovie = ({
  title: name,
  id,
  poster_path,
  original_language: language,
  overview,
  popularity,
  release_date: release,
  character,
  stream,
}) => ({
  name,
  id,
  poster: prefixImage(poster_path),
  language,
  overview,
  popularity,
  release,
  character,
  stream,
});



const processSeriesDetails = ({
  id,
  name,
  overview,
  seasons = [],
  poster_path,
  backdrop_path,
  popularity,
  homepage,
  streamUrlPrefix,
}) => ({
  id,
  name,
  overview,
  seasons,
  poster: prefixImage(poster_path),
  backdrop: prefixImage(backdrop_path),
  popularity,
  homepage,
  streamUrlPrefix,
});



const processResults = results => {
  const {
    tv = [],
    movie = [],
    person = [],
  } = groupBy(results, 'media_type');

  return {
    person: person.map(processPerson),
    tv: tv.map(processTv),
    movie: movie.map(processMovie),
  }
}


const processCredits = ({ cast, crew, ...other }) => {
  const {
    tv = [],
    movie = [],
  } = groupBy(cast, 'media_type');
  
  return { tv, movie };
}

export { processResults, processSeriesDetails, processCredits };