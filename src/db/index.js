// require('dotenv').config({path: './env'})
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//connecting to database

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
    // console.dir(connectionInstance, { depth: null });
  } catch (error) {
    console.log("MongoDB connection error ", error);
    process.exit(1);
  }
};

export default connectDB;
