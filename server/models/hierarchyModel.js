import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
  {
    channelId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const hierarchyModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    recruiterUserGuid: {
      type: String,
    },
    hierarchyId: {
      type: String,
      required: true,
    },
    hierarchyCode: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
    },
    agentCode: {
      type: String,
    },
    source: {
      type: String,
    },
    channels: {
      type: [channelSchema],
    },
  },
  {
    timestamps: true,
  }
);

const hierarchy = mongoose.model("Hierarchy", hierarchyModel);

export default hierarchy;
