import { Request, Response } from "express";
import Post from "../models/post.model";

// Function to create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, content } = req.body;
    const author = req.user?._id; // Assuming you have user information in the request

    const newPost = new Post({
      title,
      content,
      author,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Error creating post" });
  }
};

// Function to get all posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await Post.find().populate("author", "username");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
};

// Function to get a single post by ID
export const getPostById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching post" });
  }
};

// Function to update a post by ID
export const updatePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this post" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Error updating post" });
  }
};

// Function to delete a post by ID
export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId?.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this post" });
    }

    await post.deleteOne({ _id: id });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post" });
  }
};
