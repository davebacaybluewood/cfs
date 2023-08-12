import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendEmailMarketing } from "../controllers/emailMarketingControllers.js";

const router = express.Router();

router.route("/").post(protect, sendEmailMarketing);

export default router;
