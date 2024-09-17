const postModel = require('../Models/postModel.js');
const mongoose = require('mongoose');
const UserModel = require("../Models/userModel.js");

// Create new post
exports.createPost = async (req, res) => {
    const newPost = new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a post
exports.getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post updated successfully!");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully!");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Like/Dislike a post
exports.like_dislike_Post = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked.");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post unliked.");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get timeline posts
exports.timeline = async (req, res) => {
    const userId = req.params.id;

    try {
        const currenUserPosts = await postModel.find({ userId: userId });
        const followingUserPosts = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingUserPosts"
                }
            },
            { $project: { followingUserPosts: 1, _id: 0 } }
        ]);

        res.status(200).json(currenUserPosts.concat(...followingUserPosts[0].followingUserPosts).sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        res.status(500).json(error);
    }
};
