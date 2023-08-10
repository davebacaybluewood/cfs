import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import multerConfig from "../utils/multer.js";
import { getEmail } from "../controllers/helpers/emailMarketingController.js";

const router = express.Router();

router.route("/").post(protect, multerConfig.single(""), getEmail);

export default router;
