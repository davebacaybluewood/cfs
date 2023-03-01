import expressAsync from "express-async-handler";
import Blogs from "../models/blogModel.js";
import cloudinaryImport from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";

/**
 * @desc: Fetch all blogs
 * @route: GET /api/blogs
 * @acess: Public
 */

const getAllBlogs = expressAsync(async (req, res) => {
  const blogs = await Blogs.find({});
  res.json(blogs);
});
/**
 * @desc: Fetch single blogs
 * @route: GET /api/blogs/:id
 * @acess: Public
 */
const getSingleBlog = expressAsync(async (req, res) => {
  const singleBlog = await Blogs.findById(req.params.id);
  res.status(200).json(singleBlog);
});

/**
 * @desc: Create a blog
 * @route: CREATE /api/blogs
 * @acess: Private
 */
const createBlog = expressAsync(async (req, res) => {
  const { title, content, tags, author } = req.body;
  try {
    const blogThumbnailResult = await cloudinaryImport.v2.uploader.upload(
      req.file.path,
      {
        folder: "blogs",
        use_filename: true,
      }
    );
    const blog = new Blogs({
      author,
      title,
      content,
      tags,
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
  console.log(req.params.id, "deletesss");
  const blog = await Blogs.deleteOne({
    _id: req.params.id,
  });

  if (blog) {
    res.status(200).json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Error Occured" });
  }
});

export { getAllBlogs, createBlog, updateBlog, deleteBlog, getSingleBlog };
