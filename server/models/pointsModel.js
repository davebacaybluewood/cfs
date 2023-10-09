import mongoose from "mongoose";

const pointsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    expirationDate: {
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

const Points = mongoose.model("Points", pointsSchema);

export default Points;
