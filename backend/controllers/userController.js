import User from "../models/User.js";
import WatchItem from "../models/WatchItem.js";

// Save quiz results (personality test)
export const saveQuiz = async (req, res) => {
  try {
    const { favoriteGenres, preferredType, likesAnimation, likesAnime, preferredDuration, bingeStyle } =
      req.body;

    const user = await User.findById(req.user._id);
    user.quiz = {
      favoriteGenres: favoriteGenres || [],
      preferredType: preferredType || "both",
      likesAnimation: !!likesAnimation,
      likesAnime: !!likesAnime,
      preferredDuration: preferredDuration || "any",
      bingeStyle: bingeStyle || "casual",
      completedAt: new Date(),
    };
    await user.save();

    res.json({ message: "Kişilik testi kaydedildi.", quiz: user.quiz });
  } catch (error) {
    res.status(500).json({ message: "Test kaydedilemedi.", error: error.message });
  }
};

// Save today's mood selection
export const saveMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const user = await User.findById(req.user._id);
    user.lastMood = mood;
    await user.save();
    res.json({ message: "Ruh hali kaydedildi.", lastMood: user.lastMood });
  } catch (error) {
    res.status(500).json({ message: "Ruh hali kaydedilemedi.", error: error.message });
  }
};

// Update basic profile info (name, username, avatar)
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, username, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: "Profil güncellenemedi.", error: error.message });
  }
};

// Profile page data: favorite genres, favorite movies, watched, ratings, basic stats
export const getProfileOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const [favorites, watched, watchlist] = await Promise.all([
      WatchItem.find({ user: userId, status: "favorite" }).sort({ createdAt: -1 }),
      WatchItem.find({ user: userId, status: "watched" }).sort({ createdAt: -1 }),
      WatchItem.find({ user: userId, status: "watchlist" }).sort({ createdAt: -1 }),
    ]);

    res.json({
      user: req.user,
      favorites,
      watched,
      watchlist,
      counts: {
        favorites: favorites.length,
        watched: watched.length,
        watchlist: watchlist.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Profil verileri alınamadı.", error: error.message });
  }
};

// Statistics screen + "Film DNA" genre breakdown
export const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const watched = await WatchItem.find({ user: userId, status: "watched" });

    const totalMinutes = watched.reduce((sum, item) => sum + (item.runtime || 0), 0);

    const genreCounts = {};
    watched.forEach((item) => {
      (item.genres || []).forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });

    const totalGenreTags = Object.values(genreCounts).reduce((a, b) => a + b, 0) || 1;
    const filmDNA = Object.entries(genreCounts)
      .map(([genre, count]) => ({
        genre,
        count,
        percentage: Math.round((count / totalGenreTags) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    // Weekly watch summary - group watched items by ISO week (last 8 weeks)
    const weekly = {};
    watched.forEach((item) => {
      const date = item.watchedAt || item.createdAt;
      const d = new Date(date);
      const weekLabel = `${d.getFullYear()}-W${getWeekNumber(d)}`;
      weekly[weekLabel] = (weekly[weekLabel] || 0) + 1;
    });
    const weeklySummary = Object.entries(weekly)
      .map(([week, count]) => ({ week, count }))
      .sort((a, b) => (a.week > b.week ? 1 : -1))
      .slice(-8);

    const ratedItems = watched.filter((w) => w.userRating !== null && w.userRating !== undefined);
    const favoriteCount = await WatchItem.countDocuments({ user: userId, status: "favorite" });

    res.json({
      totalWatched: watched.length,
      totalMinutes,
      totalHours: Math.round((totalMinutes / 60) * 10) / 10,
      filmDNA,
      weeklySummary,
      topGenres: filmDNA.slice(0, 5),
      averageRatingGiven:
        ratedItems.length > 0
          ? Math.round(
              (ratedItems.reduce((s, i) => s + i.userRating, 0) / ratedItems.length) * 10
            ) / 10
          : null,
      favoriteCount,
      ratedCount: ratedItems.length,
    });
  } catch (error) {
    res.status(500).json({ message: "İstatistikler alınamadı.", error: error.message });
  }
};

function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}
