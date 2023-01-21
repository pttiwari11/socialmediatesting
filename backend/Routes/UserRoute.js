import express from "express";
import { followUser, getUser, unfollowUser } from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";
const router = express.Router();

router.get('/user', getUser);
router.put('/follow/:id', authMiddleWare, followUser);
router.put('/unfollow/:id', authMiddleWare, unfollowUser);
export default router;