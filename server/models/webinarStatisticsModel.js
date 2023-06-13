import mongoose from "mongoose";

const webinarStatisticsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    webinarGuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WebinarStatistics = mongoose.model(
  "WebinarStatistics",
  webinarStatisticsSchema
);

export default WebinarStatistics;
