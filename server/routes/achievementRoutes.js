import express from "express";
import {
  getUnitedNations,
  getOneYearTeam,
  getQuickDraw,
  getSmokingGun,
  getMasterAgent,
  getMachineGunner,
} from "../controllers/achievementControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/united-nations").get(protect, getUnitedNations);
router.route("/one-year-team").get(protect, getOneYearTeam);
router.route("/quick-draw").get(protect, getQuickDraw);
router.route("/smoking-gun").get(protect, getSmokingGun);
router.route("/master-agent/:userGuid").get(protect, getMasterAgent);
router.route("/machine-gunner/:userGuid").get(protect, getMachineGunner);
export default router;
