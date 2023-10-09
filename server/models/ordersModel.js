import mongoose from "mongoose";

const ordersModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    merchandiseId: {
      type: String,
      ref: "merchandises",
    },
    points: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", ordersModel);

export default Orders;
