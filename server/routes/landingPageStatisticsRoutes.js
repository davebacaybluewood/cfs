import express from "express";
import { createLandingPageView } from "../controllers/landingPageStatisticsControllers.js";

const router = express.Router();

router.route("/:userGuid/:pageId").post(createLandingPageView);

export default router;
