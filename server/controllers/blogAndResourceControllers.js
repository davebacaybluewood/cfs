import expressAsync from "express-async-handler";
import BlogsAndResource from "../models/blogAndResourceModel.js";


/**
 * @desc: Fetch all blogs
 * @route: GET /api/blog-and-resource
 * @access: Public
 */
const getAllBlogs = expressAsync(async (req, res) => {
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
                    $first: "$blogDoc.name" ? "$blogDoc.name" : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
                },
                authorThumbnail: {
                    $first: "$blogDoc.avatar",
                },
            },
        },
        {
            $unset: "blogDoc",
        },
    ]).sort({ _id: -1 }).limit(3)

    res.json(blogs)
});

/**
 * @desc: Fetch a single blog
 * @route: GET /api/blog-and-resource/${blogId}
 * @access: Public
 */
const getSingleBlogByTitle = expressAsync(async (req, res) => {
    const blogTitle = req.params.blogTitle

    try {
        const blog = await BlogsAndResource.aggregate([
            {
                $match: {
                    title: {
                        $regex: blogTitle,
                        $options: "i",
                    }
                }
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
                        $first: "$blogDoc.name" ? "$blogDoc.name" : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
                    },
                    authorThumbnail: {
                        $first: "$blogDoc.avatar",
                    },
                },
            },
            {
                $unset: "blogDoc",
            }
        ])

        res.json(blog[0])
    } catch (error) {
        res.status(404).json({ message: "Invalid" })
    }
})

/**
 * @desc: Fetch recent {N} blogs
 * @route: GET /api/blog-and-resource/recent/${number}
 * @access: Public
 */
const getRecentNumberedBlogs = expressAsync(async (req, res) => {
    const skipItemNumber = req.params.skipItemNumber;
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
                    $first: "$blogDoc.name" ? "$blogDoc.name" : "$blogDoc.firstName" + " " + "$blogDoc.lastName",
                },
                authorThumbnail: {
                    $first: "$blogDoc.avatar",
                },
            },
        },
        {
            $unset: "blogDoc",
        }
    ]).sort({ _id: -1 }).skip(parseInt(skipItemNumber))

    res.json(blogs)
});

/**
 * @desc: Create a blog
 * @route: CREATE /api/blogs
 * @acess: Private
 */
const createBlog = expressAsync(async (req, res) => {

});

export default {
    getAllBlogs,
    createBlog,
    getRecentNumberedBlogs,
    getSingleBlogByTitle
}