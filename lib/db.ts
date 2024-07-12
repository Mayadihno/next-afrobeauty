import mongoose from "mongoose";

async function dbConnect() {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URI!);
    return conn;
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default dbConnect;
