import express from "express";
import {
  createAgent,
  deleteAgent,
  getAgents,
  getAgentsCount,
  getSingleAgent,
  updateAgent,
  updateAgentStatus,
} from "../controllers/agentControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAgents)
  .post(multer.single("avatar"), createAgent)
  .put(multer.single("avatar"), updateAgent);
router.route("/:id").get(getSingleAgent).delete(protect, deleteAgent);
router.route("/agent-status/:id").put(protect, adminAuth, updateAgentStatus);
router.route("/agent-counts/all").get(protect, adminAuth, getAgentsCount);

export default router;
