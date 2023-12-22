import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/categories/:userGuid")
  .post(protect, async (req, res, next) => {
    await categoryControllers.createCategory(req, res, next);
  })
  .get(protect, async (req, res, next) => {
    await categoryControllers.getAllCategoriesByUserGuid(req, res, next);
  });

router
  .route("/categories/:categoryId/single")
  .delete(protect, async (req, res, next) => {
    await categoryControllers.deleteCategory(req, res, next);
  });

export default router;
