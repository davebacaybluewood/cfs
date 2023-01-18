import express from "express";
import {
  deleteInquiry,
  getInquiries,
  getSingleInquiry,
  submitInquiry,
} from "../controllers/inquiryControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getInquiries).post(submitInquiry);
router.route("/:id").get(protect, getSingleInquiry);
router
  .route("/:id")
  .get(protect, getSingleInquiry)
  .delete(protect, deleteInquiry);

export default router;
