import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requestContractController } from "../controllers/contracingControllers.js";
import multerConfig from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .post(protect, multerConfig.single("licensePic"), requestContractController);

export default router;
