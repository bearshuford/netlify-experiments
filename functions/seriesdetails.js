import fetch from "node-fetch";
import { endpoints } from "../api";

let imagePrefix = "https://artworks.thetvdb.com/banners";

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { token } = event.headers;
  const { id, special } = event.queryStringParameters;
  const prefix = process.env.imdbUrlPrefix;
  const userKeys = process.env.userKeys?.split(",") || [];

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    let seriesResponse = await fetch(endpoints.tvdb.series(id), { headers });
    let { data: series } = await seriesResponse.json();

    let summaryResponse = await fetch(endpoints.tvdb.summary(id), { headers });
    let { data: summary } = await summaryResponse.json();

    let episodesResponse = await fetch(endpoints.tvdb.episodes(id), {
      headers,
    });
    let { data: episodes } = await episodesResponse.json();

    if (!!episodes && episodes.length > 0)
      episodes = episodes.map((episode) => ({
        season: episode.airedSeason,
        number: episode.airedEpisodeNumber,
        name: episode.episodeName,
        id: episode.id,
        aired: episode.firstAired,
        imdbId: episode.imdbId,
        overview: episode.overview,
        thumb: episode.thumbAdded,
        trailer: userKeys.includes(special)
          ? `${prefix}${series.imdbId}&season=${episode.airedSeason}&episode=${episode.airedEpisodeNumber}`
          : null,
      }));

    series = {
      episodes: !!episodes && groupBy(episodes, "season"),
      status: series.status,
      id: series.id,
      name: series.seriesName,
      overview: series.overview,
      banner: series.banner ? `${imagePrefix}/${series.banner}` : null,
      imdbId: series.imdbId,
      airsDayOfWeek: series.airsDayOfWeek,
      airsTime: series.airsTime,
      aired: series.firstAired,
      genre: series.genre,
      network: series.network,
      networkId: series.networkId,
      rating: series.rating,
      runtime: series.runtime,
      seriesId: series.seriesId,
      siteRating: series.siteRating,
      siteRatingCount: series.siteRatingCount,
      episodeCount: summary.airedEpisodes,
      seasonCount: summary.airedSeasons,
    };

    return { statusCode: 200, body: JSON.stringify(series) };
  } catch (error) {
    console.log(error);
    return error;
  }
};
