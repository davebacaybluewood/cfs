import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
});
const keywordsSchema = mongoose.Schema({
  keyword: {
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
    metaTagTitle: {
      type: String,
      required: true,
    },
    metaTagDescription: {
      type: String,
      required: true,
    },
    metaTagKeywords: [keywordsSchema],
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnailCloudinaryId: {
      type: String,
      required: true,
    },
    thumbnailAlt: {
      type: String
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

const Blogs = mongoose.model("Blogs", blogSchema);

export default Blogs;
