import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const GENRE_OPTIONS = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "History", "Horror", "Music",
  "Mystery", "Romance", "Science Fiction", "Thriller", "War", "Western",
];

const GENRE_LABELS_TR = {
  Action: "Aksiyon", Adventure: "Macera", Animation: "Animasyon", Comedy: "Komedi",
  Crime: "Suç", Documentary: "Belgesel", Drama: "Drama", Family: "Aile",
  Fantasy: "Fantastik", History: "Tarih", Horror: "Korku", Music: "Müzik",
  Mystery: "Gizem", Romance: "Romantik", "Science Fiction": "Bilim Kurgu",
  Thriller: "Gerilim", War: "Savaş", Western: "Vahşi Batı",
};

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [preferredType, setPreferredType] = useState("both");
  const [likesAnimation, setLikesAnimation] = useState(false);
  const [likesAnime, setLikesAnime] = useState(false);
  const [preferredDuration, setPreferredDuration] = useState("any");
  const [bingeStyle, setBingeStyle] = useState("casual");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuth();
  const totalSteps = 5;

  const toggleGenre = (g) => {
    setFavoriteGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/users/quiz", {
        favoriteGenres,
        preferredType,
        likesAnimation,
        likesAnime,
        preferredDuration,
        bingeStyle,
      });
      updateUser({ quiz: data.quiz });
      navigate("/recommendations", { state: { mood: location.state?.mood || "happy" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-8 fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kişilik Testi 🧪</h1>
          <span className="text-sm text-gray-500">{step}/{totalSteps}</span>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
          <div
            className="h-2 bg-movia-gradient rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <Step title="En sevdiğin türler hangileri? 🎨" subtitle="Birden fazla seçebilirsin">
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    favoriteGenres.includes(g)
                      ? "bg-movia-gradient text-white border-transparent"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  {GENRE_LABELS_TR[g]}
                </button>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Film mi dizi mi tercih edersin? 🎬📺">
            <RadioGroup
              value={preferredType}
              onChange={setPreferredType}
              options={[
                { value: "movie", label: "Film" },
                { value: "tv", label: "Dizi" },
                { value: "both", label: "İkisi de" },
              ]}
            />
          </Step>
        )}

        {step === 3 && (
          <Step title="Animasyon ve anime ilgin var mı? 🌸">
            <div className="flex flex-col gap-3">
              <Checkbox
                checked={likesAnimation}
                onChange={setLikesAnimation}
                label="Animasyon filmlerini severim"
              />
              <Checkbox
                checked={likesAnime}
                onChange={setLikesAnime}
                label="Anime izlemeyi severim"
              />
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="Tercih ettiğin süre aralığı ne kadar? ⏱️">
            <RadioGroup
              value={preferredDuration}
              onChange={setPreferredDuration}
              options={[
                { value: "short", label: "Kısa (90 dk altı)" },
                { value: "medium", label: "Orta (90-150 dk)" },
                { value: "long", label: "Uzun (150 dk üzeri)" },
                { value: "any", label: "Farketmez" },
              ]}
            />
          </Step>
        )}

        {step === 5 && (
          <Step title="İzleme alışkanlığın nasıl? 📅">
            <RadioGroup
              value={bingeStyle}
              onChange={setBingeStyle}
              options={[
                { value: "binge", label: "Marathon yaparım, art arda izlerim" },
                { value: "casual", label: "Ara sıra, canım istediğinde izlerim" },
                { value: "weekend", label: "Genelde hafta sonları izlerim" },
              ]}
            />
          </Step>
        )}

        <div className="flex justify-between mt-8">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="btn-secondary disabled:opacity-40"
          >
            ← Geri
          </button>
          {step < totalSteps ? (
            <button onClick={() => setStep((s) => s + 1)} className="btn-primary">
              İleri →
            </button>
          ) : (
            <button disabled={loading} onClick={handleFinish} className="btn-primary">
              {loading ? "Kaydediliyor..." : "Tamamla ve Önerileri Gör 🎉"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Step = ({ title, subtitle, children }) => (
  <div>
    <h2 className="text-lg font-semibold mb-1">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
    <div className="mt-4">{children}</div>
  </div>
);

const RadioGroup = ({ value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    {options.map((o) => (
      <button
        key={o.value}
        onClick={() => onChange(o.value)}
        className={`text-left px-4 py-3 rounded-xl border transition-all ${
          value === o.value
            ? "bg-movia-gradient text-white border-transparent"
            : "border-gray-300 dark:border-gray-700"
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const Checkbox = ({ checked, onChange, label }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`text-left px-4 py-3 rounded-xl border flex items-center gap-3 transition-all ${
      checked ? "bg-movia-gradient text-white border-transparent" : "border-gray-300 dark:border-gray-700"
    }`}
  >
    <span>{checked ? "✅" : "⬜"}</span> {label}
  </button>
);

export default Quiz;
