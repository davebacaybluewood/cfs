import express from "express";
import eventsRSVPController from "../controllers/eventsRSVPController.js";

const router = express.Router();

router.route("/:eventId").post(eventsRSVPController.submitRSVP);

export default router;
