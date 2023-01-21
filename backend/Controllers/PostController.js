import PostModel from "../Models/PostModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";

// Create new post
export const createPost = async (req, res) => {
    
    const newPost = new PostModel(req.body);

    try {
      const post = await newPost.save();
      const createdAt = post.createdAt.toUTCString();
      res
        .status(200)
        .json(`${newPost._id}, ${newPost.title}, ${newPost.description}, ${createdAt}`);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await PostModel.findById(postId);
        if(post) {
            res
              .status(200)
              .json(
                `${postId},${post.likes.length}, ${post.unlikes.length}, ${post.createdAt.toUTCString()}`
              );
        } else {
            res.status(403).json("Post doesn't exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        if(PostModel.findById(postId)) {
                await PostModel.findByIdAndDelete(postId);
                res.status(200).json("Post deleted");
        } else {
            res.status(403).json("Post doesn't exists");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const allPosts = async (req, res) => {
    const { userId } = req.body;

    try {
        if(PostModel.find({userId: userId})) {
            const userPosts = await PostModel
                                            .find({ userId: userId })
                                            .sort({createdAt: 1,});
            res.status(200).json(userPosts);
        } else {
            res.status(403).json("You have not posted anything yet");
        } 
    } catch (error) {
        res.status(500).json(error);
    }
    
};

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if(!post.likes.includes(userId)) {
            if(post.unlikes.includes(userId)) {
                await post.updateOne({ $pull: { unlikes: userId }});
            }
            await post.updateOne({ $push: { likes: userId }});
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId }});
            res.status(200).json("like revoked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const unlikePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post.unlikes.includes(userId)) {
        if (post.likes.includes(userId)) {
          await post.updateOne({ $pull: { likes: userId } });
        }
      await post.updateOne({ $push: { unlikes: userId } });
      res.status(200).json("Post unliked");
    } else {
      await post.updateOne({ $pull: { unlikes: userId } });
      console.log("else");
      res.status(200).json("Unlike revoked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createComment = async (req, res) => {
    const postId = req.params.id;

    const { userId, comment } = req.body;

    try {
        await PostModel.findById(postId).updateOne({ $push: { comments: {userId, comment}}});
        const post = await PostModel.findById(postId);
        const comments = post.comments;
        const index = comments.length-1;
        res.status(200).json(comments[index]._id);
    } catch (error) {
        res.status(500).json(error);
    }
};