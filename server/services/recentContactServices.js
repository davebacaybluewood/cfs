import RecentContact from "../models/recentContactModel.js";

const RecentContactService = {
  async getRecentContacts(userGuid) {
    return RecentContact.find({ userGuid }).sort({ createdAt: -1 }).limit(10);
  },

  async addRecentContact(userGuid, emailAddress) {
    const recentContact = new RecentContact({ userGuid, emailAddress });

    const recentContactsCount = await RecentContact.countDocuments({ userGuid });
    if (recentContactsCount >= 10) {
      const oldestRecentContact = await RecentContact.findOneAndDelete({ userGuid }, { sort: { createdAt: 1 } });
      console.log("Deleted oldest recent contact:", oldestRecentContact);
    }

    return recentContact.save();
  },
};

export default RecentContactService;
