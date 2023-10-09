import mongoose from "mongoose";

const redeemedPointsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    points: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RedeemedPoints = mongoose.model("RedeemedPoints", redeemedPointsSchema);

export default RedeemedPoints;
