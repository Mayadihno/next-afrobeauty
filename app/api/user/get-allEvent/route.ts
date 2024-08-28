import dbConnect from "@/lib/db";
import { eventModel } from "@/models/eventModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const events = await eventModel.find().sort({ createdAt: -1 }).limit(10);
    return new NextResponse(
      JSON.stringify({
        events,
        status: 201,
      })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Something went wrong. Try again later" },
      { status: 500 }
    );
  }
};
