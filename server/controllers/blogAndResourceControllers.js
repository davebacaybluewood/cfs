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
    ]).sort({ _id: -1 }).skip(parseInt(skipItemNumber)).limit(limit)

    const blogLength = await BlogsAndResource.find({}).count()

    res.json({
        blogLength: blogLength,
        blogs: blogs
    })
});

/**
 * @desc: Create a blog
 * @route: CREATE /api/blog-and-resource
 * @acess: Private
 */
const createBlog = expressAsync(async (req, res) => {

});


/**
 * @desc: Search a blog by title
 * @route: CREATE /api/blog-and-resource/search
 * @access: Public
 */

const searchBlogByTitle = expressAsync(async (req, res) => {
    const title = req.body.title

    try {
        const result = await BlogsAndResource.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: title, $options: 'i' } },
                        { content: { $regex: title, $options: 'i' } },
                    ]
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
        ]);
        const blogTotalLength = await BlogsAndResource.find({}).count()

        res.json({
            blogs: result, blogTotalLength
        });
    } catch (error) {
        console.error('Search error', error);
        res.status(500).json({ error: 'An error occurred during the search' });
    }
});

export default {
    searchBlogByTitle,
    getAllBlogs,
    createBlog,
    getRecentNumberedBlogs,
    getSingleBlogByTitle
}