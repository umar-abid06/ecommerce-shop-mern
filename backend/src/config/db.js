import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
