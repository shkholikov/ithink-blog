import { Request, Response } from "express";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

// Function to add a comment to a post
export const addCommentToPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const author = req.user?._id; // Assuming you have user information in the request

    // Ensure the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create and save the comment
    const comment = new Comment({ content, author, post: postId });
    await comment.save();

    // Optionally, add comment to post's comments array
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment" });
  }
};

// Function to get comments for a post
export const getCommentsForPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username"
    );
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comments" });
  }
};

// Function to update a comment
export const updateComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user?._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the author of the comment
    if (comment.author.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this comment" });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Error updating comment" });
  }
};

// Function to delete a comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the author of the comment
    if (comment.author.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this comment" });
    }

    await comment.deleteOne({ _id: commentId });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting comment" });
  }
};
