import express from "express";
import backOfficeController from "../controllers/backOfficeController.js";

const router = express.Router();

router.route("/login-email").post(async (req, res, next) => {
  await backOfficeController.loginUsingEmail(req, res, next);
});

router.route("/login-code").post(async (req, res, next) => {
  await backOfficeController.loginUsingCode(req, res, next);
});

export default router;
