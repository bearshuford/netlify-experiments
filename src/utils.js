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
  profile_path: poster,
}) => ({
  name,
  id,
  department,
  poster
});

const processTv = ({
  name,
  id,
  poster_path: poster,
  original_language: language,
  overview,
  popularity,
  release_date: release,
}) => ({
  name,
  id,
  poster,
  language,
  overview,
  popularity,
  release
});

const processMovie = ({
  title: name,
  id,
  poster_path: poster,
  original_language: language,
  overview,
  popularity,
  release_date: release,
}) => ({
  name,
  id,
  poster,
  language,
  overview,
  popularity,
  release
});

const processResults = results => {
  const { tv, movie, person } = groupBy(results, 'media_type')
  return {
    person: person.map(processPerson),
    tv: tv.map(processTv),
    movie: movie.map(processMovie),
  }
}

export { processResults };