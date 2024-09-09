import { eventModel } from "@/models/eventModel";
import cron from "node-cron";
import dbConnect from "./db";

let isCronJobRunning = false;

const checkAndUpdateEventStatus = async () => {
  if (isCronJobRunning) return;

  isCronJobRunning = true;
  try {
    await dbConnect();
    const currentDate = new Date();

    const expiredEvents = await eventModel.find({
      endDate: { $lt: currentDate },
      status: "Running",
    });

    if (expiredEvents.length > 0) {
      await eventModel.updateMany(
        { endDate: { $lt: currentDate }, status: "Running" },
        { $set: { status: "End" } }
      );
      console.log(`Updated ${expiredEvents.length} events to status 'end'`);
    }
  } catch (error) {
    console.error("Error updating event status:", error);
  } finally {
    isCronJobRunning = false;
  }
};

// Schedule the cron job to run every day at midnight
cron.schedule("0 0 * * *", checkAndUpdateEventStatus);

export default checkAndUpdateEventStatus;
