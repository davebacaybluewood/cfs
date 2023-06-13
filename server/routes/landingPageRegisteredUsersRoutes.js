import express from "express";
import { adminAuth, protect } from "../middleware/authMiddleware.js";
import {
  getAllPageUserRegistered,
  getPageRegisteredUsers,
  updateLandingPageStatus,
} from "../controllers/landingPageRegisteredUserControllers.js";

const router = express.Router();

router.route("/").get(protect, getAllPageUserRegistered);
router
  .route("/:agentGuid/:pageId/:status")
  .post(protect, updateLandingPageStatus);
router.route("/:pageId").get(protect, getPageRegisteredUsers);

export default router;
