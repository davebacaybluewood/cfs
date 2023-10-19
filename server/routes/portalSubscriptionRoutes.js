import express from "express";
import { subscribeFreeTrial, getAllSubscribeFreeTrial } from "../controllers/portalSubscriptionController.js";
import { protect, subscriberAuth, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/free-trial")
        .post(protect, subscriberAuth, subscribeFreeTrial)
        .get(protect, adminAuth, getAllSubscribeFreeTrial);

export default router;
