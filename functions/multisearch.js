import fetch from 'node-fetch';

const movieDbApiRootUrl = 'https://api.themoviedb.org/3'
const baseUrl = `${movieDbApiRootUrl}/search/multi?api_key=${process.env.movieDbApiKey}`
const streamUrlPrefix = process.env.streamUrlPrefix;
const userKeys = process.env.userKeys?.split(',') || [];

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
  return { statusCode: 405, body: "Method Not Allowed" };
  
  const { query, auth } = event.queryStringParameters;
  const response = await fetch(`${baseUrl}&query=${query}`, { 'content-type': 'application/json' })
  const movieData = await response.text();
  const movieDataArr = await JSON.parse(movieData);
  
  if (userKeys.includes(auth) || userKeys.includes(query)) {
    if (!!movieDataArr && !!movieDataArr.results) {
      const processedArr = await movieDataArr.results.map(
        item => {
          let stream = null;
          if (item['media_type'] === 'movie') {
            stream = `${streamUrlPrefix}${item.id.toString()}`;
          }
          return { ...item, stream };
        }
      )

      movieDataArr.results = processedArr;
      if (userKeys.includes(query))
        movieDataArr.userKey = query;
    }
  }

  return { statusCode: 200, body: JSON.stringify(movieDataArr) };
};