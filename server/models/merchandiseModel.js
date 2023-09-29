import mongoose from "mongoose";

const merchandiseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Merchandise = mongoose.model("Merchandise", merchandiseSchema);

export default Merchandise;