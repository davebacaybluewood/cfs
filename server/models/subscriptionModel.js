import mongoose from "mongoose";

const subscriptionModel = mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscriptions = mongoose.model("Subscriptions", subscriptionModel);

export default Subscriptions;
