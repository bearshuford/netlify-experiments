import fetch from 'node-fetch';

const movieDbApiRootUrl = 'https://api.themoviedb.org/3'
const baseUrl = `${movieDbApiRootUrl}/search/multi?api_key=${process.env.movieDbApiKey}`
const streamUrlPrefix = process.env.streamUrlPrefix;

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { query, stream } = event.queryStringParameters;
  const response = await fetch(`${baseUrl}&query=${query}`, { 'content-type': 'application/json' })
  const movieData = await response.text();
  const movieDataArr = await JSON.parse(movieData);

  if (!!stream) {
    console.log('stream', stream, movieDataArr);
    if (!!movieDataArr && !!movieDataArr.results) {

      const processedArr = await movieDataArr.results.map(
        item => {
          let stream = null;
          console.log('item', item['media_type'], item['media_type'] === 'movie', `${streamUrlPrefix}${item.id.toString()}` )
          if (item['media_type'] === 'movie') {
            stream = `${streamUrlPrefix}${item.id.toString()}`;
          }
          return { ...item, stream, test: 'test' };
        }
      )

      movieDataArr.results = processedArr;
    }
  }

  return { statusCode: 200, body: JSON.stringify(movieDataArr) };
};