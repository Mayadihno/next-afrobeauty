// cronJobs.ts
import { eventModel } from "@/models/eventModel";
import cron from "node-cron";
import dbConnect from "./db";

// Function to check and update event status
const checkAndUpdateEventStatus = async () => {
  try {
    await dbConnect();
    const currentDate = new Date();

    // Find events that have ended
    const expiredEvents = await eventModel.find({
      endDate: { $lt: currentDate },
      status: "Running", // Only check for events that are still running
    });

    if (expiredEvents.length > 0) {
      // Update the status of expired events to 'end'
      await eventModel.updateMany(
        { endDate: { $lt: currentDate }, status: "Running" },
        { $set: { status: "End" } }
      );
      console.log(`Updated ${expiredEvents.length} events to status 'end'`);
    }
  } catch (error) {
    console.error("Error updating event status:", error);
  }
};

// Schedule the cron job to run every day at midnight
cron.schedule("0 0 * * *", checkAndUpdateEventStatus);
