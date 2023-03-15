import express from "express";
import {
  createWebinar,
  deleteWebinar,
  getActiveWebinars,
  getAgentFilteredWebinars,
  getAgentWebinarAppointments,
  getAllWebinars,
  getSingleAgentWebinar,
  getSingleWebinar,
  submitAgentWebinar,
  submitAppointment,
  updateWebinar,
} from "../controllers/webinarControllers.js";
import { admin, adminAuth, protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllWebinars)
  .post(protect, adminAuth, multer.single("thumbnail"), createWebinar);
router
  .route("/:id")
  .get(getSingleWebinar)
  .delete(protect, adminAuth, deleteWebinar)
  .put(protect, adminAuth, multer.single("thumbnail"), updateWebinar);
router
  .route("/:agentId/agent-appointments-count")
  .get(protect, getAgentWebinarAppointments);
router.route("/:webinarId/agents").get(getActiveWebinars);
router.route("/:webinarId/:agentId/submit-webinar").post(submitAgentWebinar);
router.route("/:agentId/submit-appointment").post(submitAppointment);
router.route("/filtered/:status").post(protect, getAgentFilteredWebinars);
router
  .route("/single-agent-webinar/:webinarGuid/:agentGuid")
  .get(getSingleAgentWebinar);

export default router;
