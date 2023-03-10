import express from "express";
import {
  createWebinar,
  deleteWebinar,
  getActiveWebinars,
  getAgentWebinarAppointments,
  getAllWebinars,
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

export default router;
