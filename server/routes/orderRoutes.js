import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrdersHistoryByUserGuid } from "../controllers/orderControllers.js";

const router = express.Router();

router.route("/:userGuid").get(protect, getOrdersHistoryByUserGuid);

export default router;
