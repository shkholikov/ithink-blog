import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}`);
    console.log("MongoDB Connected");
  } catch (error) {
    if (error instanceof Error) {
      // Now 'error' is typed as 'Error', and you can access 'error.message'
      console.error("MongoDB Connection Failed:", error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
