import express from "express";
import { allPosts, createPost, createComment, deletePost, getPost, likePost, unlikePost } from "../Controllers/PostController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";

const router = express.Router();

router.post('/posts/', authMiddleWare, createPost);
router.get('/posts/:id', getPost);
router.delete("/posts/:id", authMiddleWare, deletePost);
router.get('/all_posts', authMiddleWare, allPosts);
router.post('/like/:id', authMiddleWare, likePost);
router.post("/unlike/:id", authMiddleWare, unlikePost);
router.put('/comment/:id', authMiddleWare, createComment);
export default router;