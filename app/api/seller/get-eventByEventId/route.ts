import dbConnect from "@/lib/db";
import { eventModel } from "@/models/eventModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const eventId = req.nextUrl.searchParams.get("eventId");
  await dbConnect();

  try {
    if (!eventId) {
      return ErrorMessage(
        "No event with eventId. Please check the eventId again.",
        404
      );
    }
    const event = await eventModel.findById(eventId);
    if (!event) {
      return ErrorMessage("No event found", 404);
    }

    return new NextResponse(
      JSON.stringify({
        event,
        status: 201,
      })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return ErrorMessage("Something went wrong. Try again later", 500);
  }
};
