import RecentContact from "../models/recentContactModel.js";
import { v4 as uuidv4 } from "uuid";

const getRecentContacts = async (userGuid) => {
  return RecentContact.find({ userGuid }).sort({ createdAt: -1 }).limit(10);
};

const addRecentContact = async (userGuid, label) => {
  try {
    const existingContact = await RecentContact.findOne({
      userGuid,
      label,
    });

    if (existingContact) {
      const updatedContact = await RecentContact.findOneAndUpdate(
        { userGuid, label },
        { updatedAt: new Date() },
        { new: true }
      );

      return updatedContact;
    }

    const uniqueId = uuidv4();
    const newRecentContact = new RecentContact({
      userGuid,
      label,
      value: uniqueId,
    });

    const savedRecentContact = await newRecentContact.save();

    const recentContactsCount = await RecentContact.countDocuments({ userGuid });
    if (recentContactsCount > 10) {
      const oldestRecentContact = await RecentContact.findOneAndDelete(
        { userGuid },
        { sort: { createdAt: 1 } }
      );
    }

    return savedRecentContact;
  } catch (error) {
    console.error("Error adding recent contact:", error);
    throw error;
  }
};

export {
  getRecentContacts,
  addRecentContact,
};
