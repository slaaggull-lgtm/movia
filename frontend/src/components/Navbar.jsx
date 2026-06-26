import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import AvatarCircle from "./AvatarCircle";

const Navbar = () => {
  const { user, logout, isGuest, endGuestTrial } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEndGuest = () => {
    endGuestTrial();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-movia-dark/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-movia-gradient">
            Movia
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform"
            title="Karanlık modu değiştir"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <Link to="/mood" className="hidden sm:inline text-sm font-medium hover:text-movia-purple">
                😄 Ruh Hali
              </Link>
              <Link to="/profile" className="hidden sm:inline text-sm font-medium hover:text-movia-purple">
                👤 Profil
              </Link>
              <Link to="/stats" className="hidden sm:inline text-sm font-medium hover:text-movia-purple">
                📊 İstatistik
              </Link>
              <AvatarCircle avatar={user.avatar} size={36} className="border-2 border-movia-purple" />
              <button onClick={handleLogout} className="btn-secondary !px-3 !py-1.5 text-sm">
                Çıkış
              </button>
            </>
          ) : isGuest ? (
            <>
              <span className="hidden sm:inline text-xs font-semibold bg-movia-purple/10 text-movia-purple dark:bg-movia-purple/20 dark:text-purple-300 px-3 py-1.5 rounded-full">
                🧪 Misafir Modu
              </span>
              <Link to="/register" className="btn-primary !px-4 !py-1.5 text-sm">
                Ücretsiz Kayıt Ol
              </Link>
              <button onClick={handleEndGuest} className="btn-secondary !px-3 !py-1.5 text-sm">
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary !px-4 !py-1.5 text-sm">
                Giriş Yap
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-1.5 text-sm">
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
