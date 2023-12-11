import express from "express";
import {
    registerSubscriberAccount,
    getSubscriberAccountByUserGuid,
    getSubscriberAccountByAgentUserGuid,
    getAllSubscriberAccounts,
    deleteSubscriberAccount,
    validateEmail
} from "../controllers/subscriberAccountControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerSubscriberAccount);
router.route("/user/:userGuid").get(protect, getSubscriberAccountByUserGuid).delete(protect, deleteSubscriberAccount);
router.route("/agentuser/:agentuserguid").get(protect, getSubscriberAccountByAgentUserGuid);
router.route("/").get(protect, getAllSubscriberAccounts);
router.route("/validateEmail").post(validateEmail);

export default router;
