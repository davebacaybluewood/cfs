import mongoose from "mongoose";

const channelModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hierarchyCode: {
      type: String,
    },
    displayOrder: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Channels = mongoose.model("Channels", channelModel);

export default Channels;
