import express from "express";
import { addLeads } from "../controllers/leadsControllers.js";

const router = express.Router();

router.route("/addleads").post(addLeads);

export default router;