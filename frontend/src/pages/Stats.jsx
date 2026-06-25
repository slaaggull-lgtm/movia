import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";

const COLORS = ["#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6", "#F472B6"];

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/users/stats").then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <div className="text-center py-20">Yükleniyor...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">📊 İstatistiklerin</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <Card label="Toplam İzlenen" value={stats.totalWatched} emoji="🎬" />
        <Card label="Toplam Süre" value={`${stats.totalHours} sa`} emoji="⏱️" />
        <Card label="Ort. Verdiğin Puan" value={stats.averageRatingGiven ?? "—"} emoji="🌟" />
        <Card label="Favori Sayısı" value={stats.favoriteCount} emoji="❤️" />
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-6">
          <h2 className="font-bold mb-4">🧬 Film DNA'sı</h2>
          {stats.filmDNA.length === 0 ? (
            <p className="text-sm text-gray-500">Henüz izlenen bir yapım yok.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stats.filmDNA}
                  dataKey="percentage"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ genre, percentage }) => `${genre} ${percentage}%`}
                >
                  {stats.filmDNA.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-6">
          <h2 className="font-bold mb-4">📅 Haftalık İzleme Özeti</h2>
          {stats.weeklySummary.length === 0 ? (
            <p className="text-sm text-gray-500">Henüz veri yok.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.weeklySummary}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="İzlenen" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-6 mt-8">
        <h2 className="font-bold mb-4">🔥 En Çok Tercih Edilen Türler</h2>
        <div className="flex flex-wrap gap-2">
          {stats.topGenres.map((g) => (
            <span key={g.genre} className="bg-movia-purple/10 text-movia-purple dark:bg-movia-purple/20 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium">
              {g.genre} · {g.percentage}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value, emoji }) => (
  <div className="bg-white dark:bg-movia-card rounded-2xl card-shadow p-5 text-center">
    <div className="text-2xl mb-1">{emoji}</div>
    <p className="text-xl font-extrabold">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

export default Stats;
