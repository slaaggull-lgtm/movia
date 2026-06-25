import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/mood");
    } catch (err) {
      setError(err.response?.data?.message || "Giriş başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-8 fade-in">
        <h1 className="text-2xl font-bold mb-1 text-center">Tekrar Hoş Geldin 👋</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Movia hesabına giriş yap
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-posta"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-movia-purple font-semibold">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
