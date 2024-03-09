import express from "express";
import {
  createMerchandise,
  deleteMerchandise,
  emailRedeemMerchNotif,
  getMerchandise,
  getMerchandiseById,
  redeemMerchandise,
  updateMerchandiseDetails,
  updateMerchandiseStatus,
} from "../controllers/merchandiseController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router.route("/all").get(getMerchandise);
router.route("/rewards/:id").get(getMerchandiseById);
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

router
  .route("/redeem-merch/:merchandiseId")
  .post(protect, redeemMerchandise, emailRedeemMerchNotif);

export default router;
