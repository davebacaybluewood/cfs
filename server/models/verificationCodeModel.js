import mongoose from "mongoose";

const verificationCodeSchema = mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema
);
export default VerificationCode;
