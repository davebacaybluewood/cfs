import express from "express";
import {
  getEventOrders,
  claimReward,
} from "../controllers/eventOrderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:userGuid").get(getEventOrders);
router.route("/claim-reward/:rewardId").post(claimReward);

//apply protect middleware after login front-end login integrated
// router.route("/:userGuid").get(protect, getEventOrders);
// router.route("/claim-reward/:rewardId").post(protect, claimReward);

export default router;
