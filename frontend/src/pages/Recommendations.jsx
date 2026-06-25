import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";
import BadgeToast from "../components/BadgeToast";

const MOOD_LABELS = {
  happy: "Mutlu 😄", sad: "Üzgün 😢", tired: "Yorgun 😴",
  excited: "Heyecanlı 🤩", romantic: "Romantik 💕", thoughtful: "Düşünceli 🤔",
};

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mood = location.state?.mood;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBadges, setNewBadges] = useState([]);

  const fetchRecs = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/recommendations", { mood });
      setItems(data.recommendations);
    } catch (err) {
      setError(err.response?.data?.message || "Öneriler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mood) {
      navigate("/mood");
      return;
    }
    fetchRecs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  const saveItem = async (item, status) => {
    const { data } = await api.post("/watch", { ...item, status });
    if (data.newBadges?.length) setNewBadges(data.newBadges);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {mood && MOOD_LABELS[mood]} ruh haline göre önerilerin 🎯
        </h1>
        <button onClick={fetchRecs} className="btn-secondary text-sm">
          🔄 Yeni öneriler getir
        </button>
      </div>

      {loading && (
        <div className="text-center py-20 text-lg animate-pulse">🍿 Sana özel öneriler hazırlanıyor...</div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MovieCard
              key={`${item.mediaType}-${item.tmdbId}`}
              item={item}
              onFavorite={(i) => saveItem(i, "favorite")}
              onWatchlist={(i) => saveItem(i, "watchlist")}
              onWatched={(i) => saveItem(i, "watched")}
            />
          ))}
        </div>
      )}

      <BadgeToast badges={newBadges} onClose={() => setNewBadges([])} />
    </div>
  );
};

export default Recommendations;
