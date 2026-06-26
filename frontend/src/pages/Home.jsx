import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, isGuest, startGuestTrial } = useAuth();
  const navigate = useNavigate();

  const handleFreeTrial = () => {
    startGuestTrial();
    navigate("/mood");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
        <span className="bg-clip-text text-transparent bg-movia-gradient">Movia</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
        Ruh haline, zevkine ve izleme alışkanlıklarına göre kişiselleştirilmiş film ve dizi
        önerileri al. 🎬✨
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        {user || isGuest ? (
          <Link to="/mood" className="btn-primary text-lg">
            😄 Bugün kendini nasıl hissediyorsun?
          </Link>
        ) : (
          <>
            <button onClick={handleFreeTrial} className="btn-primary text-lg">
              🚀 Ücretsiz Dene (kayıt gerekmez)
            </button>
            <Link to="/register" className="btn-secondary text-lg">
              Kayıt Ol
            </Link>
            <Link to="/login" className="btn-secondary text-lg">
              Giriş Yap
            </Link>
          </>
        )}
      </div>
      {!user && !isGuest && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-16">
          "Ücretsiz Dene" ile hiçbir bilgi girmeden anında öneri akışını deneyebilirsin.
          Favorilere ekleme, puanlama ve istatistikler için sonradan ücretsiz hesap oluşturabilirsin.
        </p>
      )}
      {(user || isGuest) && <div className="mb-16" />}

      <div className="grid sm:grid-cols-3 gap-6 text-left">
        <Feature emoji="🎭" title="Ruh Haline Göre" desc="Mutlu, üzgün, yorgun, romantik... her ruh haline özel öneriler." />
        <Feature emoji="🧬" title="Film DNA'sı" desc="İzleme alışkanlıklarına göre kişisel tür profilini grafiklerle gör." />
        <Feature emoji="🏆" title="Rozetler" desc="Hedeflere ulaş, başarımlar kazan, izleme yolculuğunu takip et." />
      </div>
    </div>
  );
};

const Feature = ({ emoji, title, desc }) => (
  <div className="bg-white dark:bg-movia-card rounded-2xl p-6 card-shadow">
    <div className="text-3xl mb-2">{emoji}</div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

export default Home;
