import express from "express";
import {
  createAgent,
  deleteAgent,
  getAgents,
  getSingleAgent,
  updateAgent,
} from "../controllers/agentControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAgents)
  .post(protect, multer.single("avatar"), createAgent)
  .put(multer.single("avatar"), updateAgent);
router.route("/:id").get(getSingleAgent).delete(protect, deleteAgent);

export default router;
