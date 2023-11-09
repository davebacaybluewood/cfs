import mongoose from "mongoose";

export const positionSchema = mongoose.Schema(
  {
    value: { type: String },
    label: { type: String },
  },
  {
    timestamps: true,
  }
);
const preProfileSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    state: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    userGuid: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    facebook: {
      type: String,
    },
    weChat: {
      type: String,
    },
    discordId: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    languages: [String],
    roles: {
      type: [positionSchema],
    },
    position: {
      type: [positionSchema],
    },
    specialties: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const PreProfile = mongoose.model("PreProfile", preProfileSchema);

export default PreProfile;
