import RecentContact from "../models/recentContactModel.js";
import { v4 as uuidv4 } from "uuid";

const RecentContactService = {
  async getRecentContacts(userGuid) {
    return RecentContact.find({ userGuid }).sort({ createdAt: -1 }).limit(10);
  },

  async addRecentContact(userGuid, label) {
    try {
      const uniqueId = uuidv4();

      const newRecentContact = new RecentContact({
        userGuid,
        label,
        value: uniqueId,
      });

      const savedRecentContact = await newRecentContact.save();

      const recentContactsCount = await RecentContact.countDocuments({ userGuid });
      if (recentContactsCount > 10) {       
        const oldestRecentContact = await RecentContact.findOneAndDelete({ userGuid }, { sort: { createdAt: 1 } });        
      }

      return savedRecentContact;
    } catch (error) {
      console.error("Error adding recent contact:", error);
      throw error;
    }
  },
};

export default RecentContactService;
