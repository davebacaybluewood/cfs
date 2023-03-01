import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogControllers.js";
import { blogAuth, protect } from "../middleware/authMiddleware.js";
import multerConfig from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post(protect, blogAuth, multerConfig.single("thumbnail"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .put(protect, blogAuth, multerConfig.single("thumbnail"), updateBlog)
  .delete(deleteBlog);

export default router;
