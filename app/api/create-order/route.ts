import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userData, cartItems, shippingFee, totalPrice, paymentInfo } =
    await request.json();

  try {
    // Create a single order containing all cart items
    const orders = await orderModel.create({
      cartItems,
      shippingFee,
      totalPrice,
      userData,
      paymentInfo,
    });

    return new NextResponse(
      JSON.stringify({ message: "Order Created Successfully", orders }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return ErrorMessage(error.message, 500);
  }
};
