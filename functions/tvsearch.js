import fetch from "node-fetch";
import { endpoints } from "../api";

const maxResults = 8;

let imagePrefix = "https://www.thetvdb.com";

const mapTv = (show) => ({
  id: show.id,
  banner: show.banner && `${imagePrefix}${show.banner}`,
  poster: show.poster && `${imagePrefix}${show.poster}`,
  name: show.seriesName,
  overview: show.overview,
  network: show.network,
  status: show.status,
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { token } = event.headers;
  const { query } = event.queryStringParameters;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    let res = await fetch(endpoints.tvdb.search(query), { headers });
    let json = await res.json();
    if (!json || !json.data) {
      return { statusCode: 404, body: json.error };
    }
    if (json.data.length > maxResults) json.data.length = maxResults;
    const tv = !!json && !!json.data && json.data.map(mapTv);
    return { statusCode: 200, body: JSON.stringify({ tv }) };
  } catch (error) {
    console.log(error);
    return error;
  }
};
