import mongoose from "mongoose";
import { NOTIFICATION_ENUMS } from "../constants/constants.js";

const testimonialsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    emailAddress: { type: String, required: true },
    testimonialGuid: { type: String, required: true },
    isDisplayed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const webinarSchema = mongoose.Schema(
  {
    userGuid: { type: String, required: true },
    webinarGuid: { type: String, required: true },
    calendlyUrl: { type: String },
    status: {
      type: String,
      required: true,
      default: NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST,
      enum: [
        NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST,
        NOTIFICATION_ENUMS.WEBINARS.WEBINAR_DECLINED,
        NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED,
      ],
    },
  },
  {
    timestamps: true,
  }
);

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userGuid: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    calendlyLink: {
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
    password: {
      type: String,
      require: true,
    },
    testimonials: [testimonialsSchema],
    languages: [String],
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVATED", "DECLINED", "PENDING", "DEACTIVATED"],
    },
    telNumber: {
      type: String,
    },
    webinars: {
      type: [webinarSchema],
    },
    specialties: {
      type: [String],
    },
    isDeclined: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// agentSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// agentSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
