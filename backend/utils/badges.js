// Simple rule-based achievement system.
// Each rule receives the user's WatchItem stats and returns true/false.

export const BADGE_DEFINITIONS = [
  {
    key: "first_watch",
    title: "İlk Adım",
    description: "İlk yapımını izledi olarak işaretledin!",
    icon: "🎬",
    check: (stats) => stats.watchedCount >= 1,
  },
  {
    key: "ten_watched",
    title: "Sinefil",
    description: "10 film/dizi izledin!",
    icon: "🍿",
    check: (stats) => stats.watchedCount >= 10,
  },
  {
    key: "twentyfive_watched",
    title: "Film Kurdu",
    description: "25 film/dizi izledin!",
    icon: "🎞️",
    check: (stats) => stats.watchedCount >= 25,
  },
  {
    key: "genre_explorer",
    title: "Tür Kaşifi",
    description: "5 farklı türde yapım izledin!",
    icon: "🧭",
    check: (stats) => stats.uniqueGenres >= 5,
  },
  {
    key: "marathoner",
    title: "Maratoncu",
    description: "Toplam 24 saatten fazla izleme süresine ulaştın!",
    icon: "⏱️",
    check: (stats) => stats.totalMinutes >= 24 * 60,
  },
  {
    key: "critic",
    title: "Eleştirmen",
    description: "10 yapıma kendi puanını verdin!",
    icon: "✍️",
    check: (stats) => stats.ratedCount >= 10,
  },
  {
    key: "favorite_collector",
    title: "Koleksiyoncu",
    description: "Favorilerine 10 yapım ekledin!",
    icon: "⭐",
    check: (stats) => stats.favoriteCount >= 10,
  },
];

export const calculateNewBadges = (stats, existingBadgeKeys = []) => {
  return BADGE_DEFINITIONS.filter(
    (badge) => !existingBadgeKeys.includes(badge.key) && badge.check(stats)
  ).map((badge) => ({
    key: badge.key,
    title: badge.title,
    description: badge.description,
    icon: badge.icon,
  }));
};
