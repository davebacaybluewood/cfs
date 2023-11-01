import mongoose from "mongoose";

const eventsSchema = mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    userGuid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    design: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    meetingLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Events = mongoose.model("Events", eventsSchema);

export default Events;
