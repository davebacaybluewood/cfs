import express from "express";
import eventsRSVPController from "../controllers/eventsRSVPController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/:eventId")
  .post(eventsRSVPController.submitRSVP)
  .get(protect, eventsRSVPController.getEventRVPS);

export default router;
