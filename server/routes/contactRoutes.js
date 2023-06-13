import express from "express";
import {
  deleteContact,
  getContacts,
  getSingleContact,
} from "../controllers/contactControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getContacts);
router.route("/:id").get(protect, getSingleContact);
router
  .route("/:id")
  .get(protect, getSingleContact)
  .delete(protect, deleteContact);

export default router;
