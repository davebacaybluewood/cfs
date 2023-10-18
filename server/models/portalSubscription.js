import mongoose from "mongoose";

const portalSubscriptionSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PortalSubscription = mongoose.model(
  "PortalSubscription",
  portalSubscriptionSchema
);

export default PortalSubscription;
