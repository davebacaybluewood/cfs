import express from "express";
import subscriberController from "../controllers/subscriberController.js";

const router = express.Router();

router.route("/subscribe-email").post(async (req, res, next) => {
  await subscriberController.subscribeEmailConfirmation(req, res, next);
});

router.route("/subscribe-code").post(async (req, res, next) => {
  await subscriberController.subscriberRegistration(req, res, next);
});

export default router;
