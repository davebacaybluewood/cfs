import express from "express";
import {
  createMerchandise,
  deleteMerchandise,
  getMerchandise,
  getMerchandiseById,
  updateMerchandiseDetails,
  updateMerchandiseStatus,
} from "../controllers/merchandiseController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getMerchandise)
  .post(protect, multer.single("image"), createMerchandise);
router
  .route("/:id")
  .get(protect, getMerchandiseById)
  .delete(protect, deleteMerchandise);
router
  .route("/details/:id")
  .put(protect, multer.single("image"), updateMerchandiseDetails);
router.route("/status/:id").put(protect, updateMerchandiseStatus);

export default router;
