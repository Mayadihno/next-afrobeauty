import dbConnect from "@/lib/db";
import { discountCodeModel } from "@/models/discountCode";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const couponName = req.nextUrl.searchParams.get("couponName");

  await dbConnect();
  try {
    if (!couponName) {
      return ErrorMessage("Please enter Coupon code", 404);
    }

    const coupon = await discountCodeModel.findOne({
      couponName: couponName,
    });

    if (coupon === null) {
      return ErrorMessage("Coupon code does not valid for this shop", 404);
    }

    return new NextResponse(
      JSON.stringify({
        coupon,
        status: 201,
      })
    );
  } catch (error) {
    return ErrorMessage("An error occurred", 500);
  }
};
