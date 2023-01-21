import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        likes: [],
        unlikes: [],
        comments: [{
            userId: {
                type: String,
                required: true
            },
            comment : {
                type: String,
                required: true                                                        
            }
        }],
    },
    {
        timestamps: true
    }
);

const PostModel  = mongoose.model("Posts", postSchema);
export default PostModel;