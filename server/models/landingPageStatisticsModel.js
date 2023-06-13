import mongoose from "mongoose";

const landingPageStatisticsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    pageId: {
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
  },
  {
    timestamps: true,
  }
);

const LandingPageStatistics = mongoose.model(
  "LandingPageStatistics",
  landingPageStatisticsSchema
);

export default LandingPageStatistics;
