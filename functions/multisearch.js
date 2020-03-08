// const TMDB = require("../api/tmdb");
import TMDB from '../api/tmdb';
// import querystring from 'querystring';

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // const params = querystring.parse(event.body);
  
  await TMDB.searchMulti({ query: "fargo" })
  .then(function(res) {})
  .catch(function(){});
  
  return {
    statusCode: 200,
    body: `Hello`,
  };

};