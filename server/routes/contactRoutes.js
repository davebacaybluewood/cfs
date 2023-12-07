import express from "express";
import {
  deleteContact,
  getContacts,
  getSingleContact,
  getContactsByUser,
  createUserContact,
  deleteUserContact,
  recentContactController
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

router.route("/recent/:userGuid").get(async (req, res, next) => {
  await recentContactController.getRecentContacts(req, res, next);
});

router.route("/recent").post(async (req, res, next) => {
  await recentContactController.postRecentContact(req, res, next);
});

export default router;
