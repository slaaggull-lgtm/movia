import { useEffect, useState } from "react";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await api.get("/watch/watchlist");
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const remove = async (id) => {
    await api.delete(`/watch/${id}`);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const markWatched = async (item) => {
    await api.post("/watch", { ...item, status: "watched" });
    remove(item._id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">🔖 Daha Sonra İzleyeceklerin</h1>
      {loading ? (
        <p className="text-center py-10">Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-10 text-gray-500">Listende henüz bir şey yok.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="relative">
              <MovieCard item={item} compact onWatched={markWatched} />
              <button
                onClick={() => remove(item._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg text-sm"
                title="Listeden kaldır"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
