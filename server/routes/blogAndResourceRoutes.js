import express from 'express'
import multerConfig from "../utils/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import blogAndResourceControllers from '../controllers/blogAndResourceControllers.js';

const router = express.Router()

router.route("/").get(blogAndResourceControllers.getAllBlogs).post(protect, multerConfig.single("thumbnail"), blogAndResourceControllers.createBlog);
router.route("/numbered-recent-blogs/:skipItemNumber/:limit").get(blogAndResourceControllers.getRecentNumberedBlogs)
router.route("/:blogTitle").get(blogAndResourceControllers.getSingleBlogByTitle)
router.route("/search").post(blogAndResourceControllers.searchBlogByTitle)

export default router