import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
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
  const guestQuiz = location.state?.quiz;
  const { isGuest } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBadges, setNewBadges] = useState([]);

  const fetchRecs = async () => {
    setLoading(true);
    setError("");
    try {
      const endpoint = isGuest ? "/recommendations/guest" : "/recommendations";
      const payload = isGuest ? { mood, quiz: guestQuiz } : { mood };
      const { data } = await api.post(endpoint, payload);
      setItems(data.recommendations);
    } catch (err) {
      if (!err.response) {
        setError(
          "Sunucuya bağlanılamadı. Backend'in çalıştığından ve VITE_API_URL adresinin doğru olduğundan emin ol."
        );
      } else {
        setError(err.response?.data?.message || "Öneriler alınamadı.");
      }
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

  const guestAction = () => {
    const wantsToRegister = window.confirm(
      "Bu özelliği (favori/izleme listesi/izledi) kullanmak için ücretsiz hesap oluşturman gerekiyor. Şimdi kayıt olmak ister misin?"
    );
    if (wantsToRegister) navigate("/register");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {isGuest && (
        <div className="bg-movia-purple/10 text-movia-purple dark:bg-movia-purple/20 dark:text-purple-300 text-sm rounded-xl px-4 py-3 mb-8 flex flex-wrap items-center justify-between gap-2">
          <span>🧪 Misafir modundasın. Favori/izleme listesi/puanlama için ücretsiz hesap oluştur.</span>
          <button onClick={() => navigate("/register")} className="btn-primary !px-3 !py-1.5 text-xs">
            Ücretsiz Kayıt Ol
          </button>
        </div>
      )}

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
              onFavorite={isGuest ? guestAction : (i) => saveItem(i, "favorite")}
              onWatchlist={isGuest ? guestAction : (i) => saveItem(i, "watchlist")}
              onWatched={isGuest ? guestAction : (i) => saveItem(i, "watched")}
            />
          ))}
        </div>
      )}

      <BadgeToast badges={newBadges} onClose={() => setNewBadges([])} />
    </div>
  );
};

export default Recommendations;
