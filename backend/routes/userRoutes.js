import express from "express";
import {
  saveQuiz,
  saveMood,
  updateProfile,
  getProfileOverview,
  getStats,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/quiz", saveQuiz);
router.post("/mood", saveMood);
router.put("/profile", updateProfile);
router.get("/profile", getProfileOverview);
router.get("/stats", getStats);

export default router;
