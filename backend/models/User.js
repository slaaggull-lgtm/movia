import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=Movia",
    },

    // Personality quiz results
    quiz: {
      favoriteGenres: { type: [String], default: [] }, // e.g. ["Action","Comedy"]
      preferredType: { type: String, enum: ["movie", "tv", "both"], default: "both" },
      likesAnimation: { type: Boolean, default: false },
      likesAnime: { type: Boolean, default: false },
      preferredDuration: {
        type: String,
        enum: ["short", "medium", "long", "any"],
        default: "any",
      }, // short <90min, medium 90-150, long 150+
      bingeStyle: {
        type: String,
        enum: ["binge", "casual", "weekend"],
        default: "casual",
      },
      completedAt: { type: Date },
    },

    lastMood: { type: String, default: null },

    badges: [
      {
        key: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
