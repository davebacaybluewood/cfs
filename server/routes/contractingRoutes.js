import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requestContractController } from "../controllers/contracingControllers.js";
import multerConfig from "../utils/multer.js";

const router = express.Router();

router.route("/").post(
  protect,
  multerConfig.fields([
    {
      name: "licensePic",
      maxCount: 1,
    },
    {
      name: "eAndO",
      maxCount: 1,
    },
  ]),
  requestContractController
);

export default router;
