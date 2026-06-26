import { tmdbDiscover, tmdbGetDetails, normalizeMedia } from "../utils/tmdb.js";
import { resolveGenreIds, durationToRuntimeRange } from "../utils/moodMap.js";

// Picks N random unique items from an array
const pickRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

// Shared logic used by both the authenticated and guest recommendation endpoints
const buildRecommendations = async (mood, quiz = {}) => {
  let mediaTypes = ["movie", "tv"];
  if (quiz.preferredType === "movie") mediaTypes = ["movie"];
  if (quiz.preferredType === "tv") mediaTypes = ["tv"];

  const runtimeFilter =
    mediaTypes.includes("movie") ? durationToRuntimeRange(quiz.preferredDuration) : {};

  let pooled = [];

  for (const mediaType of mediaTypes) {
    const genreIds = resolveGenreIds(mediaType, mood, quiz.favoriteGenres);

    const params = {
      sort_by: "popularity.desc",
      "vote_average.gte": 6,
      "vote_count.gte": 100,
      with_genres: genreIds.join("|"),
      page: Math.floor(Math.random() * 5) + 1,
      ...(mediaType === "movie" ? runtimeFilter : {}),
    };

    if (mediaType === "tv" && quiz.likesAnime) {
      params.with_origin_country = "JP";
      params.with_genres = "16";
    }

    const data = await tmdbDiscover(mediaType, params);
    const results = (data.results || []).map((r) => ({ ...r, _mediaType: mediaType }));
    pooled = [...pooled, ...results];
  }

  if (pooled.length === 0) return [];

  const chosen = pickRandom(pooled, 3);

  return Promise.all(
    chosen.map(async (item) => {
      const details = await tmdbGetDetails(item._mediaType, item.id);
      return normalizeMedia(item._mediaType, details);
    })
  );
};

export const getRecommendations = async (req, res) => {
  try {
    const { mood } = req.body;
    const quiz = req.user.quiz || {};

    if (!mood) {
      return res.status(400).json({ message: "Ruh hali belirtilmedi." });
    }

    const detailed = await buildRecommendations(mood, quiz);

    if (detailed.length === 0) {
      return res.status(404).json({ message: "Uygun öneri bulunamadı, lütfen tekrar deneyin." });
    }

    res.json({ mood, recommendations: detailed });
  } catch (error) {
    res.status(500).json({
      message: "Öneriler alınırken hata oluştu. TMDB API anahtarınızı kontrol edin.",
      error: error.message,
    });
  }
};

// Public endpoint - no login required. Used by the "Free Trial / Misafir Modu"
// flow so visitors can try Movia before creating an account.
// Accepts an optional quiz object (genre/type/duration preferences collected
// in the same session) so guest recommendations feel personalized too.
export const getGuestRecommendations = async (req, res) => {
  try {
    const { mood, quiz } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Ruh hali belirtilmedi." });
    }

    const detailed = await buildRecommendations(mood, quiz || {});

    if (detailed.length === 0) {
      return res.status(404).json({ message: "Uygun öneri bulunamadı, lütfen tekrar deneyin." });
    }

    res.json({ mood, recommendations: detailed, guest: true });
  } catch (error) {
    res.status(500).json({
      message: "Öneriler alınırken hata oluştu. TMDB API anahtarınızı kontrol edin.",
      error: error.message,
    });
  }
};
