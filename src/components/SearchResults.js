import React from "react";

import { TvMovieCard, ErrorBlock } from ".";
import { useMovieSearch, useTvSearch } from "../hooks";

const ResultsSection = ({ type, results, loading, error }) => {
  if (!!error) return <ErrorBlock {...error} />;
  if (!!loading) return <h4>{`loading ${type}...`}</h4>;

  if (!!results && results.length > 0)
    return (
      <>
        <h3>{type}</h3>
        {results.map((props) => (
          <TvMovieCard {...props} key={props.id} type={type} />
        ))}
      </>
    );
  return null;
};
const SearchResults = ({ query }) => {
  const { tv, status: tvStatus } = useTvSearch(query);
  const { movies, status: movieStatus } = useMovieSearch(query);

  if (!!movieStatus.loading && !!tvStatus.loading)
    return <h4>loading movies and tv shows...</h4>;

  return (
    <>
      <ResultsSection type="tv" results={tv} {...tvStatus} />
      <ResultsSection type="movies" results={movies} {...movieStatus} />
    </>
  );
};

export default SearchResults;
