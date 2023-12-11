import expressAsync from "express-async-handler";
import Blogs from "../models/blogModel.js";
import cloudinaryImport from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";
import mongoose from "mongoose";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Fetch all blogs
 * @route: GET /api/blogs
 * @acess: Public
 */

const getAllBlogs = expressAsync(async (req, res) => {
  try {
    const blogs = await Blogs.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.name",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ]);
    res.json(blogs);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});
/**
 * @desc: Fetch single blogs
 * @route: GET /api/blogs/:id
 * @acess: Public
 */
const getSingleBlog = expressAsync(async (req, res) => {
  try {
    let id = mongoose.Types.ObjectId(req.params.id);
    const singleBlog = await Blogs.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "singleBlogDoc",
        },
      },
      {
        $set: {
          singleAuthorName: {
            $first: "$singleBlogDoc.name",
          },
        },
      },
      {
        $unset: "singleBlogDoc",
      },
    ]);
    res.status(200).json(singleBlog);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch single blogs with title
 * @route: GET /api/blogs/:blogTitle
 * @acess: Public
 */
const getSingleBlogByTitle = expressAsync(async (req, res) => {
  try {
    let title = req.params.title;
    const singleBlogByTitle = await Blogs.aggregate([
      {
        $match: {
          title: {
            $regex: title,
            $options: "i",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "singleBlogDoc",
        },
      },
      {
        $set: {
          singleAuthorName: {
            $first: "$singleBlogDoc.name",
          },
        },
      },
      {
        $unset: "singleBlogDoc",
      },
    ]);
    res.status(200).json(singleBlogByTitle);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create a blog
 * @route: CREATE /api/blogs
 * @acess: Private
 */
const createBlog = expressAsync(async (req, res) => {
  try {
    const {
      metaTagTitle,
      metaTagDescription,
      metaTagKeywords,
      title,
      content,
      tags,
      author,
      thumbnailAlt,
    } = req.body;

    const blogThumbnailResult = await cloudinaryImport.v2.uploader.upload(
      req.file.path,
      {
        folder: "blogs",
        use_filename: true,
      }
    );
    const blog = new Blogs({
      metaTagTitle,
      metaTagDescription,
      metaTagKeywords,
      author,
      title,
      content,
      tags,
      thumbnailAlt,
      thumbnail: blogThumbnailResult.secure_url,
      thumbnailCloudinaryId: blogThumbnailResult.public_id,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: Update a blog
 * @route: UPDATE /api/blogs/:id
 * @acess: Private
 */
const updateBlog = expressAsync(async (req, res) => {
  try {
    let blogThumbnailResult;
    try {
      blogThumbnailResult = await cloudinaryImport.v2.uploader.upload(
        req.file.path,
        {
          folder: "blogs",
          use_filename: true,
        }
      );
    } catch (error) {
      blogThumbnailResult = req.body.thumbnail;
    }
    const blog = await Blogs.findById(req.params.id);
    if (blog) {
      blog.title = undefinedValidator(blog.title, req.body.title);
      blog.content = undefinedValidator(blog.content, req.body.content);
      blog.tags = undefinedValidator(blog.tags, req.body.tags);
      blog.author = undefinedValidator(blog.author, req.body.author);
      blog.thumbnailAlt = undefinedValidator(
        blog.thumbnailAlt,
        req.body.thumbnailAlt
      );
      blog.metaTagTitle = undefinedValidator(
        blog.metaTagTitle,
        req.body.metaTagTitle
      );
      blog.metaTagDescription = undefinedValidator(
        blog.metaTagDescription,
        req.body.metaTagDescription
      );
      blog.metaTagKeywords = undefinedValidator(
        blog.metaTagKeywords,
        req.body.metaTagKeywords
      );
      blog.thumbnail =
        blogThumbnailResult.secure_url ?? ""
          ? blogThumbnailResult.secure_url
          : blog.thumbnail;
      blog.thumbnailCloudinaryId =
        blogThumbnailResult.public_id ?? ""
          ? blogThumbnailResult.public_id
          : blog.thumbnailCloudinaryId;

      const updatedBlog = await blog.save();
      res.status(202).json(updatedBlog);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: Delete blogs
 * @route: DELETE /api/blogs/:id
 * @acess: Private
 */
const deleteBlog = expressAsync(async (req, res) => {
  try {
    const blog = await Blogs.deleteOne({
      _id: req.params.id,
    });

    if (blog) {
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "Error Occured" });
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Find by categoryIds
 * @route: GET /api/blogs/:id/categoryIds
 * @acess: Private
 */
const getBlogsByCategoryIds = expressAsync(async (req, res) => {
  try {
    const blog = await Blogs.aggregate([
      // Get just the docs that contain a shapes element where color is 'red'
      {
        $match: {
          "tags._id": mongoose.Types.ObjectId("641b7a61a2ddaa304bbdf3f9"),
        },
      },
      {
        $project: {
          tags: {
            $filter: {
              input: "$tags",
              as: "tag",
              cond: {
                $eq: [
                  "$$tag._id",
                  mongoose.Types.ObjectId("641b7a61a2ddaa304bbdf3f9"),
                ],
              },
            },
          },
          _id: 0,
        },
      },
    ]);

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(400).json({ message: "Error Occured" });
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getSingleBlogByTitle,
  getBlogsByCategoryIds,
};
