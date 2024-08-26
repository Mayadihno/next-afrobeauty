import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userData, cartItems, shippingFee, totalPrice, paymentInfo } =
    await request.json();

  try {
    // Group cart items by shopId
    const shopItemsMap = new Map<string, typeof cartItems>();

    for (const item of cartItems) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId)?.push(item);
    }

    // Create orders for each shop
    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await orderModel.create({
        cartItems: items,
        shippingFee,
        totalPrice,
        userData,
        paymentInfo,
        shopId,
      });
      orders.push(order);
    }

    return new NextResponse(
      JSON.stringify({ message: "Orders Created Successfully", orders }),
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
