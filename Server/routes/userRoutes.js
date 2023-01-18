import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, registerUser).get(protect, getAllUsers);
router.route("/:id").delete(protect, deleteUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
