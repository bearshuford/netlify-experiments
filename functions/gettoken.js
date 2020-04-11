import fetch from "node-fetch";

const loginURL = "https://api.thetvdb.com/login";

exports.handler = async (event) => {
  let res = await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apikey: process.env.tvdbApiKey,
    }),
  });
  
  const response = await res.json();
  if (response.token) return { statusCode: 200, body: JSON.stringify(response.token)};
  return response;
};
