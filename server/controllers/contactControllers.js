import Contacts from "../models/contactModel.js";
import expressAsync from "express-async-handler";

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

export { getContacts, getSingleContact, deleteContact };
