import express from "express";
import { getUnitedNations, getOneYearTeam } from "../controllers/achievementControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/united-nations").get(protect, getUnitedNations);
router.route("/one-year-team").get(protect, getOneYearTeam);

export default router;
