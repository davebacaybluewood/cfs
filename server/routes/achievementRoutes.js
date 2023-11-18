import express from "express";
import { getUnitedNations, getOneYearTeam, getQuickDraw } from "../controllers/achievementControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/united-nations").get(protect, getUnitedNations);
router.route("/one-year-team").get(protect, getOneYearTeam);
router.route("/quick-draw").get(protect, getQuickDraw);

export default router;
