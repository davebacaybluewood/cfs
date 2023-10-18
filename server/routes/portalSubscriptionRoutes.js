import express from "express";
import { subscribeFreeTrial } from "../controllers/portalSubscriptionController.js";
import { protect, subscriberAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/free-trial").post(protect, subscriberAuth, subscribeFreeTrial);

export default router;
