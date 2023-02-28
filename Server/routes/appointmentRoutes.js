import express from "express";
import { getAgentAppointments } from "../controllers/appointmentControllers.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAgentAppointments);

export default router;
