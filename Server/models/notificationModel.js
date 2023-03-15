import mongoose from "mongoose";
import { NOTIFICATION_ENUMS } from "../constants/constants.js";

const notificationModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        NOTIFICATION_ENUMS.BLOGS.BLOGS_DRAFT,
        NOTIFICATION_ENUMS.BLOGS.BLOGS_DECLINED,
        NOTIFICATION_ENUMS.BLOGS.BLOGS_PUBLISHED,
        NOTIFICATION_ENUMS.BLOGS.BLOGS_REQUEST,
        NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_CANCELLED,
        NOTIFICATION_ENUMS.APPOINTMENTS.APPOINTMENT_NEW,
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

const Notifications = mongoose.model("Notifications", notificationModel);

export default Notifications;
