import { useState } from "react";

const MovieCard = ({ item, onFavorite, onWatchlist, onWatched, compact = false }) => {
  const [busy, setBusy] = useState(null);

  const handle = async (type, fn) => {
    setBusy(type);
    try {
      await fn(item);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="bg-white dark:bg-movia-card rounded-2xl overflow-hidden card-shadow hover:-translate-y-1 transition-transform duration-300 fade-in flex flex-col">
      <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-800">
        {item.posterPath ? (
          <img src={item.posterPath} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🎞️</div>
        )}
        <span className="absolute top-2 right-2 bg-movia-gradient text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
          ⭐ {item.voteAverage?.toFixed(1) ?? "—"}
        </span>
        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
          {item.mediaType === "movie" ? "🎬 Film" : "📺 Dizi"}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>

        <div className="flex flex-wrap gap-1 text-xs text-gray-500 dark:text-gray-400">
          {(item.genres || []).slice(0, 3).map((g) => (
            <span
              key={g}
              className="bg-movia-purple/10 text-movia-purple dark:bg-movia-purple/20 dark:text-purple-300 px-2 py-0.5 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          ⏱️ {item.runtime ? `${item.runtime} dk` : "—"} &nbsp;|&nbsp; 🎬{" "}
          {item.director || "Bilinmiyor"}
        </p>

        {!compact && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{item.overview}</p>
        )}

        {item.cast?.length > 0 && !compact && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🎭 {item.cast.slice(0, 3).join(", ")}
          </p>
        )}

        {(onFavorite || onWatchlist || onWatched) && (
          <div className="flex gap-2 mt-auto pt-2">
            {onFavorite && (
              <button
                disabled={busy === "favorite"}
                onClick={() => handle("favorite", onFavorite)}
                className="flex-1 text-xs btn-secondary !px-2 !py-1.5"
                title="Favorilere ekle"
              >
                ⭐ {busy === "favorite" ? "..." : "Favori"}
              </button>
            )}
            {onWatchlist && (
              <button
                disabled={busy === "watchlist"}
                onClick={() => handle("watchlist", onWatchlist)}
                className="flex-1 text-xs btn-secondary !px-2 !py-1.5"
                title="Sonra izle listesine ekle"
              >
                🔖 {busy === "watchlist" ? "..." : "Sonra"}
              </button>
            )}
            {onWatched && (
              <button
                disabled={busy === "watched"}
                onClick={() => handle("watched", onWatched)}
                className="flex-1 text-xs btn-primary !px-2 !py-1.5"
                title="İzledim olarak işaretle"
              >
                ✅ {busy === "watched" ? "..." : "İzledim"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
