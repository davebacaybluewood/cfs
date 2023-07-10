import express from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
} from "../controllers/subscriptionControllers.js";
import { adminAuth, agentAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createSubscription)
  .get(protect, adminAuth, getSubscriptions);
router.route("/:_id").delete(protect, adminAuth, deleteSubscription);

export default router;
