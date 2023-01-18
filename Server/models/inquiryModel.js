import mongoose from "mongoose";

const inquiryModel = mongoose.Schema(
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
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    inquiryType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiries = mongoose.model("Inquiries", inquiryModel);

export default Inquiries;
