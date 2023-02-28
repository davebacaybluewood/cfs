import express from "express";
import {
  addAgentTestimonial,
  createAgent,
  deleteAgent,
  getAgents,
  getAgentsCount,
  getAllActiveWebinar,
  getSingleAgent,
  updateAgent,
  updateAgentStatus,
  updateAgentTestimonial,
  updateAgentWebinar,
} from "../controllers/agentControllers.js";
import { adminAuth, agentAuth, protect } from "../middleware/authMiddleware.js";
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
router.route("/:id/testimonials").put(addAgentTestimonial);
router.route("/:id/testimonials/update").put(protect, updateAgentTestimonial);
router
  .route("/:webinarGuid/:agentId/webinar")
  .put(protect, agentAuth, updateAgentWebinar);
router.route("/webinars/active").post(getAllActiveWebinar);

export default router;
