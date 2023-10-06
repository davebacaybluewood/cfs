import express from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  emailRedeemMerchNotif,
} from "../controllers/subscriptionControllers.js";
import { adminAuth, agentAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createSubscription)
  .get(protect, adminAuth, getSubscriptions);
router.route("/:_id").delete(protect, adminAuth, deleteSubscription);

router.route("/redeem-merch").post(protect, emailRedeemMerchNotif);

export default router;
