import express from "express";
import { subscribeFreeTrial } from "../controllers/portalSubscriptionController.js";
import { protect, subscriberAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/free-trial").post(subscriberAuth, subscribeFreeTrial);

export default router;
