import express from "express";
import {
  agentMissionRegistration,
  getAgentMissionRegistration,
} from "../../controllers/events/missionControllers.js";
import multer from "../../utils/multer.js";

const router = express.Router();

router
  .route("/registration")
  .post(multer.single("profileImage"), agentMissionRegistration);

router.route("/registration/:userGuid").get(getAgentMissionRegistration);
export default router;
