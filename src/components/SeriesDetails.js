import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { ErrorBlock, Vid } from ".";
import { useSeriesDetails } from "../hooks";

const SeriesDetails = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState("");

  const {details, status} = useSeriesDetails(id);
  const { error, loading } = status;

  const { name, episodes, banner } = details || {};
  if (!!loading) return <h4>'loading...'</h4>;
  if (!!error) return <ErrorBlock {...error} />;
  if (!details) return <div> no details rn </div>;

  return (
    <>
      <Vid url={trailer} show={!!trailer}>
        {!!banner && <img src={banner} alt={name + " banner"} />}
      </Vid>
      <h1> {name} </h1>
      {!!episodes &&
        Object.keys(episodes) &&
        Object.keys(episodes).length > 0 &&
        Object.keys(episodes).map((season) => {
          if(season !== "0") return (
            <div className="season-list" key={`season-${season}`}>
              <h1> Season {season}</h1>
              {episodes[season].map(
                ({ id, name, trailer, overview, number }) => (
                  <div onClick={() => setTrailer(trailer)} key={id}>
                    {number}: {name}
                    <p>{overview}</p>
                  </div>
                )
              )}
            </div>
          );
          return null;
        })}
    </>
  );
};

export default SeriesDetails;
