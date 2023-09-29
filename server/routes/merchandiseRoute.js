import express from "express";
import {
  getMerchandise, getMerchandiseById
} from "../controllers/merchandiseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMerchandise);
router.route("/:id").get(protect, getMerchandiseById);

export default router;
