import express from "express";
import {
  addOrUpdateItem,
  updateRatingNote,
  removeItem,
  getListByStatus,
  getBadges,
} from "../controllers/watchController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", addOrUpdateItem);
router.put("/:id", updateRatingNote);
router.delete("/:id", removeItem);
router.get("/badges", getBadges);
router.get("/:status", getListByStatus); // status: favorite | watchlist | watched

export default router;
