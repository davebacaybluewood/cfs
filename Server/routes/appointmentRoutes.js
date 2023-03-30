import express from "express";
import {
  cancelAppointment,
  getAgentAppointments,
  getScheduleAppointments,
  getSingleAppointment,
  getWebinarNumberOfAppointments,
} from "../controllers/appointmentControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAgentAppointments);
router
  .route("/:appointmentId")
  .get(protect, getSingleAppointment)
  .put(protect, cancelAppointment);
router.route("/:webinarGuid/:agentGuid").get(protect, getScheduleAppointments);
router
  .route("/webinar-statistics/appointment-count/:webinarGuid")
  .get(protect, getWebinarNumberOfAppointments);

export default router;
