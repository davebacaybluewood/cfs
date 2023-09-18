import express from "express";
import { sendEmailConfirmation } from "../controllers/emailSubscriberController.js";

const router = express.Router();

router.route("/confirmation").post(sendEmailConfirmation); 

export default router;