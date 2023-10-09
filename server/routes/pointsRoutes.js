import express from "express";
import pointsControllers from "../controllers/pointsControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:userGuid").get(protect, async (req, res, next) => {
  await pointsControllers.getPointsByUserGuid(req, res, next);
});

router.route("/subscribers/:userGuid").get(protect, async (req, res, next) => {
  await pointsControllers.getSubscribersByUserGuid(req, res, next);
});

export default router;
