import mongoose from "mongoose";

const webinarViewSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    webinarGuid: {
      type: String,
      required: true,
    },
    timeTracker: {
      type: Number,
      required: true,
    },
    timeSpent: {
      type: Number,
      required: true,
    },
    page: {
      type: String,
      required: true,
      default: "SHORT_VIDEO",
      enum: ["SHORT_VIDEO", "FULL_VIDEO"],
    },
  },
  {
    timestamps: true,
  }
);

const WebinarView = mongoose.model("WebinarView", webinarViewSchema);

export default WebinarView;
