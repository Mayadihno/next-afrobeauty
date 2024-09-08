import mongoose from "mongoose";
import checkAndUpdateEventStatus from "./cronJon";

async function dbConnect() {
  try {
    // Connect to the database
    let conn = await mongoose.connect(process.env.MONGODB_URI!);

    // Run the cron job after the database connection is established
    checkAndUpdateEventStatus();

    return conn;
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default dbConnect;
