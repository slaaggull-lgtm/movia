import fetch from "node-fetch";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const buildUrl = (path, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "tr-TR"); // Turkish metadata where available
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

export const tmdbDiscover = async (mediaType, params) => {
  const url = buildUrl(`/discover/${mediaType}`, params);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB discover error: ${res.status}`);
  return res.json();
};

export const tmdbGetDetails = async (mediaType, id) => {
  const url = buildUrl(`/${mediaType}/${id}`, {
    append_to_response: "credits",
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB details error: ${res.status}`);
  return res.json();
};

export const tmdbSearch = async (mediaType, query) => {
  const url = buildUrl(`/search/${mediaType}`, { query });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB search error: ${res.status}`);
  return res.json();
};

// Normalizes a TMDB movie/tv details (with credits) object into our app's shape
export const normalizeMedia = (mediaType, details) => {
  const director =
    mediaType === "movie"
      ? details.credits?.crew?.find((c) => c.job === "Director")?.name || ""
      : (details.created_by && details.created_by[0]?.name) ||
        details.credits?.crew?.find((c) => c.job === "Director")?.name ||
        "";

  const cast = (details.credits?.cast || []).slice(0, 5).map((c) => c.name);

  const runtime =
    mediaType === "movie"
      ? details.runtime || 0
      : (details.episode_run_time && details.episode_run_time[0]) || 0;

  return {
    tmdbId: details.id,
    mediaType,
    title: mediaType === "movie" ? details.title : details.name,
    posterPath: details.poster_path
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : null,
    genres: (details.genres || []).map((g) => g.name),
    runtime,
    voteAverage: details.vote_average || 0,
    director,
    cast,
    overview: details.overview || "",
    releaseDate:
      mediaType === "movie" ? details.release_date : details.first_air_date,
  };
};
