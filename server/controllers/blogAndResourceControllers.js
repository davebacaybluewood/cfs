import expressAsync from "express-async-handler";
import BlogsAndResource from "../models/blogAndResourceModel.js";
import cloudinaryImport from "../utils/cloudinary.js";
import Agents from "../models/agentModel.js";
import mongoose from "mongoose";
import undefinedValidator from "./helpers/undefinedValidator.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Fetch all blogs
 * @route: GET /api/blog-and-resource
 * @access: Public
 */
const getAllBlogs = expressAsync(async (req, res) => {
  try {
    const blogs = await BlogsAndResource.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.name"
              ? "$blogDoc.name"
              : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
          },
          authorThumbnail: {
            $first: "$blogDoc.avatar",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ])
      .sort({ _id: -1 })
      .limit(3);

    res.json(blogs);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch a single blog
 * @route: GET /api/blog-and-resource/${blogTitle}
 * @access: Public
 */
const getSingleBlogByTitle = expressAsync(async (req, res) => {
  try {
    const blogTitle = req.params.blogTitle;
    const blog = await BlogsAndResource.aggregate([
      {
        $match: {
          title: {
            $regex: blogTitle,
            $options: "i",
          },
        },
      },

      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.name"
              ? "$blogDoc.name"
              : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
          },
          authorThumbnail: {
            $first: "$blogDoc.avatar",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ]);

    const filteredBlog = await Promise.all(
      blog?.map(async (data) => {
        const author = await Agents.find({ userGuid: data.userGuid });
        const authorData = author[0];
        return {
          ...data,
          authorName: authorData?.firstName
            ? `${authorData.firstName} ${authorData.lastName}`
            : authorData.name,
        };
      })
    );

    res.json(filteredBlog[0]);
  } catch (error) {
    res.status(404).json({ message: "Invalid" });
  }
});

/**
 * @desc: Fetch a single blog
 * @route: GET /api/blog-and-resource/${blogId}
 * @access: Public
 */
const getSingleBlogById = expressAsync(async (req, res) => {
  try {
    const blogId = mongoose.Types.ObjectId(req.params.id);
    const blog = await BlogsAndResource.aggregate([
      {
        $match: { _id: blogId },
      },

      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.name"
              ? "$blogDoc.name"
              : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
          },
          authorThumbnail: {
            $first: "$blogDoc.avatar",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ]);

    const filteredBlog = await Promise.all(
      blog?.map(async (data) => {
        const author = await Agents.find({ userGuid: data.userGuid });
        const authorData = author[0];
        return {
          ...data,
          authorName: authorData?.firstName
            ? `${authorData.firstName} ${authorData.lastName}`
            : authorData.name,
        };
      })
    );

    res.json(filteredBlog[0]);
  } catch (error) {
    res.status(404).json({ message: "Invalid" });
  }
});

/**
 * @desc: Fetch recent {N} blogs
 * @route: GET /api/blog-and-resource/recent/${number}
 * @access: Public
 */
const getRecentNumberedBlogs = expressAsync(async (req, res) => {
  try {
    const skipItemNumber = req.params.skipItemNumber;
    const limit = req.params.limit ? parseInt(req.params.limit) : 100;
    const blogs = await BlogsAndResource.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.firstName",
          },
          authorThumbnail: {
            $first: "$blogDoc.avatar",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ])
      .sort({ _id: -1 })
      .skip(parseInt(skipItemNumber))
      .limit(limit);

    const blogLength = await BlogsAndResource.find({}).count();

    const filteredBlogs = await Promise.all(
      blogs?.map(async (data) => {
        const author = await Agents.find({ userGuid: data.userGuid });
        const authorData = author[0];
        return {
          ...data,
          authorName: authorData?.firstName
            ? `${authorData.firstName} ${authorData.lastName}`
            : authorData.name,
        };
      })
    );

    res.json({
      blogLength: blogLength,
      blogs: filteredBlogs,
    });
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create a blog
 * @route: POST /api/blog-and-resource
 * @acess: Private
 */
const createBlog = expressAsync(async (req, res) => {
  try {
    const {
      metaTagTitle,
      metaTagDescription,
      metaTagKeywords: bodyMetatagkeywords,
      title,
      content,
      tags: bodyTags,
      authorID: userGuid,
      thumbnailAlt,
    } = req.body;

    const blogThumbnailResult = await cloudinaryImport.v2.uploader.upload(
      req.file.path,
      {
        folder: "blogs",
        use_filename: true,
      }
    );

    const tags = bodyTags?.map((data) => {
      return {
        label: data,
      };
    });
    const metaTagKeywords = bodyMetatagkeywords?.map((data) => {
      return {
        keyword: data,
      };
    });
    const blog = new BlogsAndResource({
      metaTagTitle,
      metaTagDescription,
      metaTagKeywords,
      userGuid,
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
    res.status(500);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: Update a blog
 * @route: PUT /api/blog-and-resource/{blogId}
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
      console.log(error);
      blogThumbnailResult = req.body.thumbnail;
    }
    const blog = await BlogsAndResource.findById(req.params.id);
    if (blog) {
      blog.title = undefinedValidator(blog.title, req.body.title);
      blog.content = undefinedValidator(blog.content, req.body.content);
      blog.tags = undefinedValidator(blog.tags, req.body.tags);
      blog.userGuid = undefinedValidator(blog.userGuid, req.body.userGuid);
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
 * @desc: Search a blog by title
 * @route: GET /api/blog-and-resource/search
 * @access: Public
 */

const searchBlogByTitle = expressAsync(async (req, res) => {
  try {
    const title = req.body.title;

    const result = await BlogsAndResource.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: title, $options: "i" } },
            { content: { $regex: title, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "blogDoc",
        },
      },
      {
        $set: {
          authorName: {
            $first: "$blogDoc.name"
              ? "$blogDoc.name"
              : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
          },
          authorThumbnail: {
            $first: "$blogDoc.avatar",
          },
        },
      },
      {
        $unset: "blogDoc",
      },
    ]);
    const blogTotalLength = await BlogsAndResource.find({}).count();

    res.json({
      blogs: result,
      blogTotalLength,
    });
  } catch (error) {
    console.error("Search error", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
});

/**
 * @desc: Delete blogs
 * @route: DEL /api/blog-and-resource/:id
 * @acess: Private
 */
const deleteBlog = expressAsync(async (req, res) => {
  try {
    const blog = await BlogsAndResource.deleteOne({
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

export default {
  searchBlogByTitle,
  getAllBlogs,
  createBlog,
  updateBlog,
  getRecentNumberedBlogs,
  getSingleBlogByTitle,
  getSingleBlogById,
  deleteBlog,
};
