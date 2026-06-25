import WatchItem from "../models/WatchItem.js";
import User from "../models/User.js";
import { calculateNewBadges } from "../utils/badges.js";

// Add/update an item in a status list (favorite / watchlist / watched)
export const addOrUpdateItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      tmdbId,
      mediaType,
      title,
      posterPath,
      genres,
      runtime,
      voteAverage,
      director,
      cast,
      overview,
      releaseDate,
      status,
      userRating,
      note,
    } = req.body;

    if (!tmdbId || !mediaType || !title || !status) {
      return res.status(400).json({ message: "Eksik alanlar var." });
    }

    const update = {
      user: userId,
      tmdbId,
      mediaType,
      title,
      posterPath,
      genres,
      runtime,
      voteAverage,
      director,
      cast,
      overview,
      releaseDate,
      status,
    };

    if (status === "watched") {
      update.watchedAt = new Date();
      if (userRating !== undefined) update.userRating = userRating;
      if (note !== undefined) update.note = note;
    }

    const item = await WatchItem.findOneAndUpdate(
      { user: userId, tmdbId, mediaType, status },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    let newBadges = [];
    if (status === "watched" || status === "favorite") {
      newBadges = await checkAndAwardBadges(userId);
    }

    res.status(201).json({ item, newBadges });
  } catch (error) {
    res.status(500).json({ message: "Öğe kaydedilemedi.", error: error.message });
  }
};

// Update rating/note on an already-watched item
export const updateRatingNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userRating, note } = req.body;

    const item = await WatchItem.findOne({ _id: id, user: req.user._id });
    if (!item) return res.status(404).json({ message: "Kayıt bulunamadı." });

    if (userRating !== undefined) item.userRating = userRating;
    if (note !== undefined) item.note = note;
    await item.save();

    const newBadges = await checkAndAwardBadges(req.user._id);

    res.json({ item, newBadges });
  } catch (error) {
    res.status(500).json({ message: "Güncellenemedi.", error: error.message });
  }
};

// Remove from a list (favorite / watchlist / watched)
export const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await WatchItem.findOneAndDelete({ _id: id, user: req.user._id });
    if (!item) return res.status(404).json({ message: "Kayıt bulunamadı." });
    res.json({ message: "Kaldırıldı.", id });
  } catch (error) {
    res.status(500).json({ message: "Kaldırılamadı.", error: error.message });
  }
};

export const getListByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const items = await WatchItem.find({ user: req.user._id, status }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Liste alınamadı.", error: error.message });
  }
};

export const getBadges = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.badges);
};

async function checkAndAwardBadges(userId) {
  const watched = await WatchItem.find({ user: userId, status: "watched" });
  const favorites = await WatchItem.find({ user: userId, status: "favorite" });

  const totalMinutes = watched.reduce((s, i) => s + (i.runtime || 0), 0);
  const uniqueGenres = new Set(watched.flatMap((i) => i.genres || [])).size;
  const ratedCount = watched.filter((i) => i.userRating !== null && i.userRating !== undefined).length;

  const stats = {
    watchedCount: watched.length,
    totalMinutes,
    uniqueGenres,
    ratedCount,
    favoriteCount: favorites.length,
  };

  const user = await User.findById(userId);
  const existingKeys = user.badges.map((b) => b.key);
  const newBadges = calculateNewBadges(stats, existingKeys);

  if (newBadges.length > 0) {
    user.badges.push(...newBadges);
    await user.save();
  }

  return newBadges;
}
