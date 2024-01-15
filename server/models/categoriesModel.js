import mongoose from "mongoose";

const categoryModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categoryModel);

export default Categories;
