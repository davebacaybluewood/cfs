import mongoose from "mongoose";

const contactModel = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
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

const Contacts = mongoose.model("Contacts", contactModel);

export default Contacts;
