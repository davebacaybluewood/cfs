import mongoose from "mongoose";

const recentContactSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecentContact = mongoose.model("RecentContact", recentContactSchema);

export default RecentContact;
