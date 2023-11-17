import express from "express";
import { getAchievement } from "../controllers/achievementControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/united-nations").get(protect, getAchievement);

export default router;
