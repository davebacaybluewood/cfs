import express from "express";
import { addLeads, getLeadByUserGuid, getLeadByAgentUserGuid } from "../controllers/leadsControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/addleads").post(protect, addLeads); 
router.route("/user/:userGuid").get(protect, getLeadByUserGuid);
router.route("/agent/:agentUserGuid").get(protect, getLeadByAgentUserGuid);

export default router;