import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    if (!userId) {
      return ErrorMessage("Please provide userId", 401);
    }

    const orders = await orderModel
      .find({ "userData.id": userId })
      .populate("cartItems")
      .sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify({ orders }), {
      status: 200,
    });
  } catch (error: unknown) {
    return ErrorMessage(error as string, 500);
  }
};
