import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
});

const blogSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnailCloudinaryId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [tagsSchema],
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
/**
 * Meta Tags
 */
const blogMetatagSchema = mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    blogMetatagTitle: {
      type: String,
      required: true,
    },
    blogMetatagDescription: {
      type: String,
      required: true,
    },
    blogMetatagKeywords: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogSchema);
export const MetaTags = mongoose.model("MetaTags", blogMetatagSchema);

export default Blogs;
