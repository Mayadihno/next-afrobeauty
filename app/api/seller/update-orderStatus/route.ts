import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { orderId, orderStatus } = await req.json();

  try {
    const order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { status: orderStatus }
    );

    if (!order) {
      return ErrorMessage("Order not found", 400);
    }
    return new NextResponse(
      JSON.stringify({ message: "Order Status updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorMessage("Something went wrong", 500);
  }
};
