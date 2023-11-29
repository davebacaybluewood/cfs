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
      validate:
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(.){1}[a-zA-Z0-9-]+(.){1}[a-zA-Z0-9-]+$/,
    },
  },
  {
    timestamps: true,
  }
);

contactModel.index({ userGuid: 1, emailAddress: 1 }, { unique: true });
const Contacts = mongoose.model("Contacts", contactModel);

export default Contacts;
