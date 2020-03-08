import fetch from 'node-fetch';

const movieDbApiRootUrl = 'https://api.themoviedb.org/3'
const baseUrl = `${movieDbApiRootUrl}/search/multi?api_key=${process.env.movieDbApiKey}`

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { query } = event.queryStringParameters;
  const response = await fetch(`${baseUrl}&query=${query}`, { 'content-type': 'application/json' })
  const movieData = await response.text();

  return { statusCode: 200, body: movieData };
};