import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*Read*/

router.get('/', getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);

/*Update*/

router.put('/:userId/likes', verifyToken, likePost);

export default router;

