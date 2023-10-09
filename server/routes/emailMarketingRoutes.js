import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getEmailTemplates,
  getEmailTemplatesBySubscriber,
  getSingleEmailTemplate,
  saveEmailTemplate,
  sendEmailMarketing,
  updateEmailTemplate,
} from "../controllers/emailMarketingControllers.js";

const router = express.Router();

router.route("/").post(protect, sendEmailMarketing);
router
  .route("/template/:userGuid")
  .get(protect, getEmailTemplates)
  .post(protect, saveEmailTemplate);
router
  .route("/template/subscriber/:userGuid")
  .get(protect, getEmailTemplatesBySubscriber);
router
  .route("/template/:userGuid/:templateId")
  .get(protect, getSingleEmailTemplate)
  .put(protect, updateEmailTemplate);

export default router;
