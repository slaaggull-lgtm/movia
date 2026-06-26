import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../utils/avatars";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: DEFAULT_AVATAR,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/quiz");
    } catch (err) {
      if (!err.response) {
        // Sunucuya hiç ulaşılamadı: backend çalışmıyor, yanlış VITE_API_URL,
        // veya CORS engeli olabilir.
        setError(
          "Sunucuya bağlanılamadı. Backend'in çalıştığından ve frontend'deki VITE_API_URL adresinin doğru olduğundan emin ol."
        );
      } else {
        setError(err.response?.data?.message || "Kayıt başarısız oldu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-8 fade-in">
        <h1 className="text-2xl font-bold mb-1 text-center">Movia'ya Katıl 🎉</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Profilini oluştur, önerilerini keşfet
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4 fade-in">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="Ad"
              className="input-field"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Soyad"
              className="input-field"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            name="username"
            placeholder="Kullanıcı adı"
            className="input-field"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            className="input-field"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre (en az 6 karakter)"
            className="input-field"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <div>
            <p className="text-sm font-medium mb-2">Profil avatarını seç:</p>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.emoji}
                  onClick={() => setForm({ ...form, avatar: opt.emoji })}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all ${
                    form.avatar === opt.emoji
                      ? "ring-3 ring-offset-2 ring-movia-purple scale-110"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ background: opt.bg }}
                  title={opt.emoji}
                >
                  {opt.emoji}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
          Zaten hesabın var mı?{" "}
          <Link to="/login" className="text-movia-purple font-semibold">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
