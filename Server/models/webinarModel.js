import mongoose from "mongoose";

const webinarSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    webinarGuid: {
      type: String,
      required: true,
      unique: true,
    },
    introVideo: {
      type: String,
      required: true,
    },
    introVideoContent: {
      type: String,
      required: true,
    },
    introVideoTimeTracker: {
      type: Number,
      default: 1,
    },
    fullVideo: {
      type: String,
      required: true,
    },
    fullVideoContent: {
      type: String,
      required: true,
    },
    fullVideoTimeTracker: {
      type: Number,
      default: 1,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnail_cloudinary_id: {
      type: String,
      required: true,
    },
    calendlyLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Webinars = mongoose.model("Webinars", webinarSchema);

export default Webinars;
