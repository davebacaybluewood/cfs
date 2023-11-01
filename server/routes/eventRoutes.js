import express from "express";
import eventControllers from "../controllers/eventControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import multerConfig from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .post(protect, multerConfig.single("thumbnail"), async (req, res, next) => {
    await eventControllers.createEvent(req, res, next);
  })
  .get(protect, async (req, res, next) => {
    await eventControllers.getEvents(req, res, next);
  });

router
  .route("/:eventId")
  .put(protect, multerConfig.single("thumbnail"), async (req, res, next) => {
    await eventControllers.updateEvent(req, res, next);
  })
  .delete(protect, async (req, res, next) => {
    await eventControllers.deleteEvent(req, res, next);
  })
  .get(async (req, res, next) => {
    await eventControllers.getSingleEvent(req, res, next);
  });

export default router;
