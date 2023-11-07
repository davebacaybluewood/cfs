import express from "express";
import { createMissionAgents } from "../../controllers/events/missionControllers.js";
import multer from "../../utils/multer.js";

const router = express.Router();

router
  .route("/registration")
  .post(multer.single("profileImage"), createMissionAgents);

export default router;
