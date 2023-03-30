import express from "express";
import {
  createWebinarView,
  getWebinarViews,
} from "../controllers/webinarViewController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:webinarGuid/:page").get(protect, getWebinarViews);
router
  .route("/:webinarGuid/:userGuid/:timeTracker/:timeSpent")
  .post(createWebinarView);

export default router;
