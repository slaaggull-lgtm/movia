import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia6",
];

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: AVATAR_OPTIONS[0],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/quiz");
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt başarısız oldu.");
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
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="Ad"
              className="input-field"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Soyad"
              className="input-field"
              onChange={handleChange}
              required
            />
          </div>
          <input
            name="username"
            placeholder="Kullanıcı adı"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            className="input-field"
            onChange={handleChange}
            required
            minLength={6}
          />

          <div>
            <p className="text-sm font-medium mb-2">Profil fotoğrafı seç:</p>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_OPTIONS.map((url) => (
                <img
                  key={url}
                  src={url}
                  onClick={() => setForm({ ...form, avatar: url })}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                    form.avatar === url ? "border-movia-purple scale-110" : "border-transparent"
                  } transition-all`}
                  alt="avatar option"
                />
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
