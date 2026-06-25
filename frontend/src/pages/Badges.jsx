import { useEffect, useState } from "react";
import api from "../api/axios";

const ALL_BADGES = [
  { key: "first_watch", title: "İlk Adım", icon: "🎬" },
  { key: "ten_watched", title: "Sinefil", icon: "🍿" },
  { key: "twentyfive_watched", title: "Film Kurdu", icon: "🎞️" },
  { key: "genre_explorer", title: "Tür Kaşifi", icon: "🧭" },
  { key: "marathoner", title: "Maratoncu", icon: "⏱️" },
  { key: "critic", title: "Eleştirmen", icon: "✍️" },
  { key: "favorite_collector", title: "Koleksiyoncu", icon: "⭐" },
];

const Badges = () => {
  const [earned, setEarned] = useState([]);

  useEffect(() => {
    api.get("/watch/badges").then(({ data }) => setEarned(data));
  }, []);

  const earnedKeys = earned.map((b) => b.key);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">🏆 Rozetlerin</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {ALL_BADGES.map((b) => {
          const isEarned = earnedKeys.includes(b.key);
          return (
            <div
              key={b.key}
              className={`rounded-2xl p-6 text-center card-shadow transition-all ${
                isEarned
                  ? "bg-movia-gradient text-white"
                  : "bg-white dark:bg-movia-card opacity-50"
              }`}
            >
              <div className="text-4xl mb-2">{b.icon}</div>
              <p className="font-bold">{b.title}</p>
              <p className="text-xs mt-1">{isEarned ? "Kazanıldı ✅" : "Henüz kazanılmadı 🔒"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
