import mongoose from "mongoose";

const eventOrderModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    rewardId: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventOrder = mongoose.model("EventOrder", eventOrderModel);

export default EventOrder;
