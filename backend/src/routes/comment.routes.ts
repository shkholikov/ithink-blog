import express from "express";
import {
  addCommentToPost,
  deleteComment,
  getCommentsForPost,
  updateComment,
} from "../controllers/comment.controller";
import { authenticate } from "../middleware/auth.middleware"; // Replace with your actual auth middleware

const router = express.Router();

router.post("/posts/:postId/comments", authenticate, addCommentToPost);
router.get("/posts/:postId/comments", authenticate, getCommentsForPost);
router.put("/comments/:commentId", authenticate, updateComment);
router.delete("/comments/:commentId", authenticate, deleteComment);

export default router;
