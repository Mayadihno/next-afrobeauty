import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return ErrorMessage("Order ID is required", 400);
    }

    const order = await orderModel.findOne({ _id: orderId });

    return new NextResponse(JSON.stringify(order), {
      status: 200,
    });
  } catch (error) {
    return ErrorMessage("Server Error", 500);
  }
};
