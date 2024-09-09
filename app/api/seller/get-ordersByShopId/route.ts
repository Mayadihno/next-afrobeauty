import dbConnect from "@/lib/db";
import orderModel from "@/models/orderModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("id");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!shopId) {
      return ErrorMessage("Shop ID is required", 400);
    }

    await dbConnect();

    const orders = await orderModel
      .find({ "cartItems.shopId": shopId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalOrders = await orderModel.countDocuments({
      "cartItems.shopId": shopId,
    });

    return new NextResponse(JSON.stringify({ orders, totalOrders }), {
      status: 200,
    });
  } catch (error) {
    return ErrorMessage("Server Error", 500);
  }
};
