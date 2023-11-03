import { API_RES_FAIL } from "../constants/constants.js";
import Contacts from "../models/contactModel.js";
import expressAsync from "express-async-handler";
import User from "../models/userModel.js";

/**
 * @desc: Fetch all contacts
 * @route: GET /api/contacts
 * @acess: Private
 */
const getContacts = expressAsync(async (req, res) => {
  const contacts = await Contacts.find({});
  res.json(contacts);
});

/**
 * @desc: Fetch single contact
 * @route: GET /api/contacts/:id
 * @acess: Private
 */
const getSingleContact = expressAsync(async (req, res) => {
  const contact = await Contacts.findOne({
    _id: req.params.id,
  });

  if (contact) {
    res.json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found.");
  }
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = expressAsync(async (req, res) => {
  const contact = await Contacts.deleteOne({
    _id: req.params.id,
  });

  if (contact) {
    res.json({ message: "Contact removed." });
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

/**
 * @desc: Fetch all contacts by User
 * @route: GET /api/contacts/:userGuid/mailing-list/
 * @access  Private/Admin
 */
const getContactsByUser = expressAsync(async (req, res) => {
  const userGuid = req.params.userGuid;

  if (!userGuid) {
    return res.status(400).send(API_RES_FAIL("userGuid is required!"));
  }

  const contacts = await Contacts.find({ userGuid: userGuid });

  res.json(contacts);
});

/**
 * @desc: Create Contact per User
 * @route: POST /api/contacts/:userGuid/mailing-list/
 * @access: Private/Admin
 */
const createUserContact = expressAsync(async (req, res) => {
  const { emailAddress } = req.body;
  const { userGuid } = req.params;

  const user = await User.findOne({ userGuid: userGuid });

  if (!user) res.status(400).send(API_RES_FAIL("User provided not found"));

  try {
    const contact = new Contacts({
      emailAddress: emailAddress,
      userGuid: userGuid,
    });
    await contact.save();

    res.json(contact);
  } catch (error) {
    res
      .status(400)
      .send(API_RES_FAIL("[Contacts] Error encountered: " + error));
  }
});

const deleteUserContact = expressAsync(async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findOneAndDelete({ _id: contactId });

    res.json(contact);
  } catch (error) {
    res
      .status(400)
      .send(API_RES_FAIL("[Contacts] Error encountered: " + error));
  }
});

export {
  getContacts,
  getSingleContact,
  deleteUserContact,
  getContactsByUser,
  createUserContact,
  deleteContact,
};
