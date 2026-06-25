// Maps app-level mood & quiz preferences to TMDB genre IDs

// TMDB Movie genre IDs
export const MOVIE_GENRES = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

// TMDB TV genre IDs
export const TV_GENRES = {
  "Action & Adventure": 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Kids: 10762,
  Mystery: 9648,
  "Sci-Fi & Fantasy": 10765,
  War: 10768,
  Western: 37,
};

// mood -> list of preferred genre names (mixed movie/tv naming, resolved later)
export const MOOD_GENRE_MAP = {
  happy: ["Comedy", "Family", "Adventure", "Animation"],
  sad: ["Drama", "Romance"],
  tired: ["Animation", "Comedy", "Family"],
  excited: ["Action", "Adventure", "Science Fiction", "Thriller"],
  romantic: ["Romance", "Drama"],
  thoughtful: ["Documentary", "Drama", "Mystery", "History"],
};

export const MOODS = [
  { key: "happy", label: "Mutlu", emoji: "😄" },
  { key: "sad", label: "Üzgün", emoji: "😢" },
  { key: "tired", label: "Yorgun", emoji: "😴" },
  { key: "excited", label: "Heyecanlı", emoji: "🤩" },
  { key: "romantic", label: "Romantik", emoji: "💕" },
  { key: "thoughtful", label: "Düşünceli", emoji: "🤔" },
];

const genreNameToId = (mediaType, name) => {
  const table = mediaType === "movie" ? MOVIE_GENRES : TV_GENRES;
  if (table[name]) return table[name];
  if (name === "Action" && mediaType === "tv") return TV_GENRES["Action & Adventure"];
  if (name === "Science Fiction" && mediaType === "tv") return TV_GENRES["Sci-Fi & Fantasy"];
  return null;
};

// Combines mood genres + user's favorite genres from quiz into a weighted, deduped list
export const resolveGenreIds = (mediaType, mood, quizFavoriteGenres = []) => {
  const moodGenres = MOOD_GENRE_MAP[mood] || [];
  const combined = [...moodGenres, ...quizFavoriteGenres];
  const ids = combined
    .map((name) => genreNameToId(mediaType, name))
    .filter((id) => id !== null);
  return [...new Set(ids)];
};

// Converts a "preferredDuration" enum into TMDB with_runtime filters
export const durationToRuntimeRange = (preferredDuration) => {
  switch (preferredDuration) {
    case "short":
      return { "with_runtime.gte": 0, "with_runtime.lte": 90 };
    case "medium":
      return { "with_runtime.gte": 90, "with_runtime.lte": 150 };
    case "long":
      return { "with_runtime.gte": 150 };
    default:
      return {};
  }
};
