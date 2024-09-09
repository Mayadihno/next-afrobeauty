import dbConnect from "@/lib/db";
import { discountCodeModel } from "@/models/discountCode";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const shopId = req.nextUrl.searchParams.get("shopId");
  await dbConnect();

  try {
    const shop = await sellerModel.findById(shopId);

    if (!shop) {
      return ErrorMessage("Shop not found", 400);
    }

    const discountCode = await discountCodeModel.find({ shopId: shopId }).sort({
      createdAt: -1,
    });

    return new NextResponse(
      JSON.stringify({
        discountCode,
      })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return ErrorMessage("Something went wrong. Try again later", 500);
  }
};
