import mongoose from "mongoose";

const raiseSupportSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['RESOLVED','PENDING'],
    },
    type: {
      type: String,
      required: true,
      enum: ['BUG','FEATURE','OTHER'],
    }
  },
  {
    timestamps: true,
  }
);

const RaiseSupport = mongoose.model("RaiseSupport", raiseSupportSchema);

export default RaiseSupport;
