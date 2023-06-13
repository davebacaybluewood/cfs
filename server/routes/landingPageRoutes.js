import express from "express";
import { adminAuth, agentAuth, protect } from "../middleware/authMiddleware.js";
import {
  createLandingPage,
  getAllLandingPages,
  getSingleLandingPage,
} from "../controllers/landingPageControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllLandingPages)
  .post(protect, adminAuth, createLandingPage);
router.route("/:pageId").get(getSingleLandingPage);

export default router;
