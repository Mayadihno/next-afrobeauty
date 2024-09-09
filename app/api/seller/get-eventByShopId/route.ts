import dbConnect from "@/lib/db";
import { eventModel } from "@/models/eventModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const shopId = req.nextUrl.searchParams.get("shopId");
  await dbConnect();
  const shop = await sellerModel.findById(shopId);
  if (!shop) {
    return ErrorMessage("No shop found", 404);
  }

  try {
    const event = await eventModel
      .find({ shopId: shopId })
      .sort({
        createdAt: -1,
      })
      .limit(10);

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
