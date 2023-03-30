import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleBlogByTitle,
  updateBlog,
} from "../controllers/blogControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import multerConfig from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post(protect, multerConfig.single("thumbnail"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .put(protect, multerConfig.single("thumbnail"), updateBlog)
  .delete(deleteBlog);
router.route("/:title/blog-title").get(getSingleBlogByTitle);

export default router;
