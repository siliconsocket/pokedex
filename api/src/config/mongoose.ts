import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Mongo connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
