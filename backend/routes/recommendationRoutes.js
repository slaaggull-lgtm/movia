import express from "express";
import { getRecommendations, getGuestRecommendations } from "../controllers/recommendationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Misafir modu - giriş yapmadan deneme için (kişiselleştirme yok, sadece ruh hali)
router.post("/guest", getGuestRecommendations);

router.post("/", protect, getRecommendations);

export default router;
