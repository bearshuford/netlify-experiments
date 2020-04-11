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
  poster: poster_path,
  backdrop: backdrop_path,
  popularity,
  homepage,
  streamUrlPrefix,
});


export { processSeriesDetails };
