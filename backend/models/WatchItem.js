import mongoose from "mongoose";

const watchItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    tmdbId: { type: Number, required: true },
    mediaType: { type: String, enum: ["movie", "tv"], required: true },

    title: { type: String, required: true },
    posterPath: { type: String },
    genres: { type: [String], default: [] },
    runtime: { type: Number, default: 0 }, // minutes
    voteAverage: { type: Number, default: 0 },
    director: { type: String, default: "" },
    cast: { type: [String], default: [] },
    overview: { type: String, default: "" },
    releaseDate: { type: String, default: "" },

    status: {
      type: String,
      enum: ["favorite", "watchlist", "watched"],
      required: true,
    },

    userRating: { type: Number, min: 0, max: 10, default: null },
    note: { type: String, default: "" },
    watchedAt: { type: Date },
  },
  { timestamps: true }
);

// A user can have the same movie in multiple status lists (favorite + watched)
// but not the exact same status twice
watchItemSchema.index({ user: 1, tmdbId: 1, mediaType: 1, status: 1 }, { unique: true });

export default mongoose.model("WatchItem", watchItemSchema);
