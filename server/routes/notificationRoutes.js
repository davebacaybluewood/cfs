import express from "express";
import {
  createNotification,
  getAllNotifications,
} from "../controllers/notificationControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllNotifications).post(createNotification);

export default router;
