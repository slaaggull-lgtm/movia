import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MOODS = [
  { key: "happy", label: "Mutlu", emoji: "😄" },
  { key: "sad", label: "Üzgün", emoji: "😢" },
  { key: "tired", label: "Yorgun", emoji: "😴" },
  { key: "excited", label: "Heyecanlı", emoji: "🤩" },
  { key: "romantic", label: "Romantik", emoji: "💕" },
  { key: "thoughtful", label: "Düşünceli", emoji: "🤔" },
];

const Mood = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();

  const handleSelect = async (moodKey) => {
    setSelected(moodKey);
    setLoading(true);
    try {
      if (isGuest) {
        // Misafir modu: kişiselleştirme/kayıt yok, direkt önerilere git.
        navigate("/recommendations", { state: { mood: moodKey } });
        return;
      }

      await api.post("/users/mood", { mood: moodKey });
      if (!user?.quiz?.completedAt) {
        navigate("/quiz", { state: { mood: moodKey } });
      } else {
        navigate("/recommendations", { state: { mood: moodKey } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      {isGuest && (
        <div className="bg-movia-purple/10 text-movia-purple dark:bg-movia-purple/20 dark:text-purple-300 text-sm rounded-xl px-4 py-2 mb-6 inline-block">
          🧪 Misafir modundasın — kişiselleştirme ve kaydetme için sonradan ücretsiz hesap oluşturabilirsin.
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">Bugün kendini nasıl hissediyorsun? 🎭</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        Ruh haline en uygun film ve dizi önerilerini hazırlayalım.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {MOODS.map((m) => (
          <button
            key={m.key}
            disabled={loading}
            onClick={() => handleSelect(m.key)}
            className={`flex flex-col items-center gap-2 p-6 rounded-2xl card-shadow bg-white dark:bg-movia-card hover:-translate-y-1 transition-all duration-200 ${
              selected === m.key ? "ring-4 ring-movia-purple" : ""
            }`}
          >
            <span className="text-4xl">{m.emoji}</span>
            <span className="font-semibold">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Mood;
