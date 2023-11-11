import express, { Application } from "express";
import connectDB from "./db";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
