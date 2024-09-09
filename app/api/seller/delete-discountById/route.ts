import dbConnect from "@/lib/db";
import { discountCodeModel } from "@/models/discountCode";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const discountId = req.nextUrl.searchParams.get("discountId");
  const shopId = req.nextUrl.searchParams.get("shopId");
  await dbConnect();

  try {
    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("Shop not found", 404);
    }

    const discountCode = await discountCodeModel.findByIdAndDelete(discountId);
    if (!discountCode) {
      return ErrorMessage("Discount code not found", 404);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Discount code deleted successfully",
      })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return ErrorMessage("Something went wrong. Try again later", 500);
  }
};
