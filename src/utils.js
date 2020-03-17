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
  original_language: language,
  overview,
  popularity,
  release_date: release,
}) => ({
  name,
  id,
  poster: prefixImage(poster_path),
  language,
  overview,
  popularity,
  release
});

const processMovie = ({
  title: name,
  id,
  poster_path,
  original_language: language,
  overview,
  popularity,
  release_date: release,
  stream
}) => ({
  name,
  id,
  poster: prefixImage(poster_path),
  language,
  overview,
  popularity,
  release,
  stream
});

const processResults = results => {
  console.log('results', results);
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

export { processResults };