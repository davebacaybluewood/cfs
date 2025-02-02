import express from "express";
import {
  createRaiseSupport,
  getRaiseSupport,
  getRaiseSupportById,
  markRaiseSupportAsResolved,
  changeRaiseSupportType
} from "../controllers/raiseSupportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getRaiseSupport)
  .post(protect, createRaiseSupport);
router
  .route("/:id")
  .get(protect, getRaiseSupportById)
  .put(protect, markRaiseSupportAsResolved);
router
  .route("/type/:id")
  .put(protect, changeRaiseSupportType);

export default router;
