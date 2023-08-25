import express from "express";
import { registerSubscriberAccount } from "../controllers/subscriberAccountControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/").post(registerSubscriberAccount);

export default router;
