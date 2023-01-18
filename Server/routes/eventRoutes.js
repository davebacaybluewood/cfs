import express from "express";
import {
  getEvents,
  getEventById,
  getEventByRefId,
  submitInvite,
  getEventInvites,
  deleteEventInvite,
  createEvent,
  deleteEvent,
  updateEvent,
  getCountInviteByEventId,
} from "../controllers/eventControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import multer from "../utils/multer.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, createEvent);
router.route("/eventInviteCount/:id").get(protect, getCountInviteByEventId);
router.route("/:id").get(getEventById).delete(protect, deleteEvent);
router
  .route("/invites/:id")
  .get(getEventByRefId)
  .delete(protect, deleteEventInvite);
router.route("/submit-invite").post(submitInvite);
router.route("/create-event").post(
  multer.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "ticket",
      maxCount: 1,
    },
  ]),
  createEvent
);
router.route("/update-event").put(
  multer.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "ticket",
      maxCount: 1,
    },
  ]),
  updateEvent
);
router.route("/event-invites/:id").get(protect, getEventInvites);

export default router;
