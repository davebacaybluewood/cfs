import express from "express";
import { subscribeFreeTrial, getAllSubscribeFreeTrial } from "../controllers/portalSubscriptionController.js";
import { protect, subscriberAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/free-trial")
        .post(protect, subscriberAuth, subscribeFreeTrial)
        .get(protect, getAllSubscribeFreeTrial);

export default router;
