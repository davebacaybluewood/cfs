import { API_RES_FAIL } from "../constants/constants.js";
import Contacts from "../models/contactModel.js";
import expressAsync from "express-async-handler";
import User from "../models/userModel.js";
import RecentContactService from "../services/recentContactServices.js";

/**
 * @desc: Fetch all contacts
 * @route: GET /api/contacts
 * @acess: Private
 */
const getContacts = expressAsync(async (req, res) => {
  try {
    const contacts = await Contacts.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch single contact
 * @route: GET /api/contacts/:id
 * @acess: Private
 */
const getSingleContact = expressAsync(async (req, res) => {
  try {
    const contact = await Contacts.findOne({
      _id: req.params.id,
    });

    if (contact) {
      res.json(contact);
    } else {
      res.status(404);
      throw new Error("Contact not found.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = expressAsync(async (req, res) => {
  try {
    const contact = await Contacts.deleteOne({
      _id: req.params.id,
    });

    if (contact) {
      res.json({ message: "Contact removed." });
    } else {
      res.status(404);
      throw new Error("Contact not found");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch all contacts by User
 * @route: GET /api/contacts/:userGuid/mailing-list/
 * @access  Private/Admin
 */
const getContactsByUser = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;

    if (!userGuid) {
      return res.status(400).send(API_RES_FAIL("userGuid is required!"));
    }

    const contacts = await Contacts.find({ userGuid: userGuid });

    res.json(contacts);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create Contact per User
 * @route: POST /api/contacts/:userGuid/mailing-list/
 * @access: Private/Admin
 */
const createUserContact = expressAsync(async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const deleteUserContact = expressAsync(async (req, res) => {
  try {
    const { contactId } = req.params;
    try {
      const contact = await Contacts.findOneAndDelete({ _id: contactId });

      res.json(contact);
    } catch (error) {
      res
        .status(400)
        .send(API_RES_FAIL("[Contacts] Error encountered: " + error));
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const recentContactsController = {
  async getRecentContacts(req, res) {
    const { userGuid } = req.params;

    try {
      const recentContacts = await RecentContactService.getRecentContacts(userGuid);
      res.json(recentContacts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async postRecentContact(req, res) {
    const { userGuid, label } = req.body;

    try {
      const newRecentContact = await RecentContactService.addRecentContact(userGuid, label);
      res.status(201).json(newRecentContact);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

export {
  getContacts,
  getSingleContact,
  deleteUserContact,
  getContactsByUser,
  createUserContact,
  deleteContact,
  recentContactsController as recentContactController,
};
