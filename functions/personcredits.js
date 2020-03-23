import fetch from 'node-fetch';

const movieDbApiRootUrl = 'https://api.themoviedb.org/3'
const streamUrlPrefix = process.env.streamUrlPrefix;

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { id, stream } = event.queryStringParameters;
  const endpoint = `${movieDbApiRootUrl}/person/${id}/combined_credits?api_key=${process.env.movieDbApiKey}`;
  const response = await fetch(endpoint, { 'content-type': 'application/json' })
  const movieData = await response.text();
  const movieDataArr = await JSON.parse(movieData);

  if (!!stream) {
    movieDataArr.streamUrlPrefix = streamUrlPrefix;
  }

  return { statusCode: 200, body: JSON.stringify(movieDataArr) };
};