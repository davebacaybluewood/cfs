import mongoose from "mongoose";

const contactModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    mobileNumber: {
      type: String,
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

const Contacts = mongoose.model("Contacts", contactModel);

export default Contacts;
