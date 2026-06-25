import { tmdbDiscover, tmdbGetDetails, normalizeMedia } from "../utils/tmdb.js";
import { resolveGenreIds, durationToRuntimeRange } from "../utils/moodMap.js";

// Picks N random unique items from an array
const pickRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const getRecommendations = async (req, res) => {
  try {
    const { mood } = req.body;
    const quiz = req.user.quiz || {};

    if (!mood) {
      return res.status(400).json({ message: "Ruh hali belirtilmedi." });
    }

    // Decide which media types to query based on quiz.preferredType
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
        with_genres: genreIds.join("|"), // OR logic - any matching genre
        page: Math.floor(Math.random() * 5) + 1, // some randomness across pages
        ...(mediaType === "movie" ? runtimeFilter : {}),
      };

      // Anime preference: bias towards Japanese animation for TV
      if (mediaType === "tv" && quiz.likesAnime) {
        params.with_origin_country = "JP";
        params.with_genres = "16"; // Animation
      } else if (mediaType === "movie" && quiz.likesAnimation) {
        // keep animation in the mix but don't force it exclusively
      }

      const data = await tmdbDiscover(mediaType, params);
      const results = (data.results || []).map((r) => ({ ...r, _mediaType: mediaType }));
      pooled = [...pooled, ...results];
    }

    if (pooled.length === 0) {
      return res.status(404).json({ message: "Uygun öneri bulunamadı, lütfen tekrar deneyin." });
    }

    const chosen = pickRandom(pooled, 3);

    const detailed = await Promise.all(
      chosen.map(async (item) => {
        const details = await tmdbGetDetails(item._mediaType, item.id);
        return normalizeMedia(item._mediaType, details);
      })
    );

    res.json({ mood, recommendations: detailed });
  } catch (error) {
    res.status(500).json({
      message: "Öneriler alınırken hata oluştu. TMDB API anahtarınızı kontrol edin.",
      error: error.message,
    });
  }
};
