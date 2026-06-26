import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";
import AvatarCircle from "../components/AvatarCircle";
import { AVATAR_OPTIONS } from "../utils/avatars";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", username: "", avatar: "" });

  const fetchProfile = async () => {
    setLoading(true);
    const { data } = await api.get("/users/profile");
    setData(data);
    setForm({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      username: data.user.username,
      avatar: data.user.avatar,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const { data: updated } = await api.put("/users/profile", form);
    updateUser(updated);
    setEditing(false);
    fetchProfile();
  };

  if (loading || !data) {
    return <div className="text-center py-20">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-8 mb-8 flex flex-col sm:flex-row items-center gap-6 fade-in">
        <AvatarCircle avatar={editing ? form.avatar : user.avatar} size={96} className="border-4 border-movia-purple" />
        <div className="flex-1 text-center sm:text-left">
          {editing ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  className="input-field"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                <input
                  className="input-field"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
              <input
                className="input-field"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />

              <div>
                <p className="text-sm font-medium mb-1">Avatarını değiştir:</p>
                <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.emoji}
                      onClick={() => setForm({ ...form, avatar: opt.emoji })}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
                        form.avatar === opt.emoji
                          ? "ring-2 ring-offset-2 ring-movia-purple scale-110"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      style={{ background: opt.bg }}
                      title={opt.emoji}
                    >
                      {opt.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-1">
                <button onClick={handleSave} className="btn-primary !px-4 !py-1.5 text-sm">Kaydet</button>
                <button onClick={() => setEditing(false)} className="btn-secondary !px-4 !py-1.5 text-sm">Vazgeç</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
              <button onClick={() => setEditing(true)} className="btn-secondary !px-4 !py-1.5 text-sm mt-2">
                ✏️ Profili düzenle
              </button>
            </>
          )}
        </div>

        <div className="flex gap-6 text-center">
          <StatBox label="Favori" value={data.counts.favorites} />
          <StatBox label="İzlendi" value={data.counts.watched} />
          <StatBox label="Listede" value={data.counts.watchlist} />
        </div>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        <Link to="/stats" className="btn-secondary text-sm">📊 İstatistiklerim</Link>
        <Link to="/badges" className="btn-secondary text-sm">🏆 Rozetlerim</Link>
        <Link to="/favorites" className="btn-secondary text-sm">⭐ Favorilerim</Link>
        <Link to="/watchlist" className="btn-secondary text-sm">🔖 İzleme Listem</Link>
        <Link to="/history" className="btn-secondary text-sm">📜 İzleme Geçmişim</Link>
      </div>

      <Section title="⭐ Favori Filmlerin" items={data.favorites.slice(0, 3)} />
      <Section title="✅ Son İzlediklerin" items={data.watched.slice(0, 3)} />
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div>
    <p className="text-2xl font-extrabold text-movia-purple">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

const Section = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MovieCard key={item._id} item={item} compact />
        ))}
      </div>
    </div>
  );
};

export default Profile;
