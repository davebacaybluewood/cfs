import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
    }
})

const keywordsSchema = mongoose.Schema({
    keyword: {
        type: String,
        required: true,
    }
})

const bLogResourceSchema = new mongoose.Schema({
    userGuid: {
        type: String,
        required: true,
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
    }
},
    {
        timestamps: true,
    }
)



const BlogsAndResource = mongoose.model("BlogsAndResource", bLogResourceSchema);

export default BlogsAndResource;
