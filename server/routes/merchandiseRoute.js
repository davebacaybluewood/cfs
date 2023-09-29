import express from "express";
import {
  createMerchandise, deleteMerchandise, getMerchandise, getMerchandiseById, updateMerchandiseDetails, updateMerchandiseStatus
} from "../controllers/merchandiseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createMerchandise);
router.route("/:id").delete(protect, deleteMerchandise);
router.route("/").get(protect, getMerchandise);
router.route("/details/:id").put(protect, updateMerchandiseDetails);
router.route("/status/:id").put(protect, updateMerchandiseStatus);

export default router;
