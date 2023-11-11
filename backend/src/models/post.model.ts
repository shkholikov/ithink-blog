import mongoose, { Document } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId; // Reference to User
  comments: mongoose.Schema.Types.ObjectId[]; // References to Comments
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
