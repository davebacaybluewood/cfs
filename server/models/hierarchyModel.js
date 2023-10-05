import mongoose from "mongoose";

const hierarchyModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const hierarchy = mongoose.model("Hierarchy", hierarchyModel);

export default hierarchy;
