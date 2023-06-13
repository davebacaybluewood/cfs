import express from "express";
import { adminAuth, agentAuth, protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";
import {
  changePassword,
  editProfile,
  fetchPreProfile,
  getProfile,
  listProfile,
  preCreateProfile,
  registerPreProfile,
  savePreProfile,
  updatePositionAndRole,
  updateProfileSettings,
} from "../controllers/profileControllers.js";

const router = express.Router();

router
  .route("/:userGuid")
  .get(getProfile)
  .put(protect, multer.single("avatar"), editProfile);
router.route("/:userGuid/change-password").put(protect, changePassword);
router.route("/:userGuid/profile-settings").put(protect, updateProfileSettings);
router.route("/pre-profile/register").post(registerPreProfile);
router
  .route("/")
  .get(protect, adminAuth, listProfile)
  .post(multer.single("avatar"), preCreateProfile, fetchPreProfile)
  .put(multer.single("avatar"), savePreProfile);
router
  .route("/position-roles/:userGuid")
  .put(protect, adminAuth, updatePositionAndRole);

export default router;
