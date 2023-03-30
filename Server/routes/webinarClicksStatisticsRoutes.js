import express from "express";
import {
  createWebinarClick,
  getAdminWebinarVisitsCount,
  getWebinarClicks,
} from "../controllers/webinarStatisticsControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/:webinarGuid/:userGuid")
  .get(protect, getWebinarClicks)
  .post(createWebinarClick);
router.route("/:webinarGuid").get(protect, getAdminWebinarVisitsCount);

export default router;
