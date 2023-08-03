import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requestContractController } from "../controllers/contracingControllers.js";

const router = express.Router()

router.route('/').post(protect, requestContractController)

export default router
