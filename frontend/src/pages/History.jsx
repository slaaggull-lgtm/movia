import { useEffect, useState } from "react";
import api from "../api/axios";
import BadgeToast from "../components/BadgeToast";

const History = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBadges, setNewBadges] = useState([]);

  const fetchItems = async () => {
    const { data } = await api.get("/watch/watched");
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateField = (id, field, value) => {
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, [field]: value } : i)));
  };

  const saveRating = async (item) => {
    const { data } = await api.put(`/watch/${item._id}`, {
      userRating: item.userRating,
      note: item.note,
    });
    if (data.newBadges?.length) setNewBadges(data.newBadges);
  };

  const remove = async (id) => {
    await api.delete(`/watch/${id}`);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">📜 İzleme Geçmişin</h1>
      {loading ? (
        <p className="text-center py-10">Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-10 text-gray-500">Henüz hiçbir şey izlemedin.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-4 flex gap-4">
              {item.posterPath && (
                <img src={item.posterPath} alt={item.title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <button onClick={() => remove(item._id)} className="text-red-500 text-sm">✕ Sil</button>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {item.mediaType === "movie" ? "🎬 Film" : "📺 Dizi"} · {(item.genres || []).join(", ")}
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm">Senin puanın:</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={item.userRating ?? ""}
                    onChange={(e) => updateField(item._id, "userRating", parseFloat(e.target.value))}
                    onBlur={() => saveRating(item)}
                    className="input-field !w-20 !py-1"
                  />
                  <span className="text-sm text-gray-400">/ 10</span>
                </div>

                <textarea
                  placeholder="Notunu ekle..."
                  value={item.note || ""}
                  onChange={(e) => updateField(item._id, "note", e.target.value)}
                  onBlur={() => saveRating(item)}
                  className="input-field text-sm w-full"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <BadgeToast badges={newBadges} onClose={() => setNewBadges([])} />
    </div>
  );
};

export default History;
