import express from "express";
import {
  deleteContact,
  getContacts,
  getSingleContact,
  getContactsByUser,
  createUserContact,
  deleteUserContact,
} from "../controllers/contactControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getContacts);
router.route("/:id").get(protect, getSingleContact);
router
  .route("/:id")
  .get(protect, getSingleContact)
  .delete(protect, deleteContact);
router
  .route("/mailing-list/:userGuid")
  .get(protect, getContactsByUser)
  .post(protect, createUserContact);
router.route("/mailing-list/:contactId").delete(protect, deleteUserContact);

export default router;
