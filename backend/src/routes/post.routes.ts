import express from "express";
import * as postController from "../controllers/post.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", authenticate, postController.updatePost);
router.delete("/:id", authenticate, postController.deletePost);
router.get("/", postController.getAllPosts);

export default router;
