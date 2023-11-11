import mongoose, { Document } from "mongoose";

interface IComment extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId; // Reference to User
  post: mongoose.Schema.Types.ObjectId; // Reference to Post
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
