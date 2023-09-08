import express from "express";
import {
  authUser,
  changePassword,
  checkEmail,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  getCheckUserId
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, registerUser).get(protect, getAllUsers);
router.route("/:id").delete(protect, deleteUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/email-check/account").post(checkEmail);
router.route("/change-password/account").post(changePassword);
router.route("/verifyuser/:userGuid").get(getCheckUserId);

export default router;
