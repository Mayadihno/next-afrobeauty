import dbConnect from "@/lib/db";
import { discountCodeModel } from "@/models/discountCode";
import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  await dbConnect();

  try {
    // Check if the shop exists
    const shop = await sellerModel.findOne({ _id: body.shopId });
    if (!shop) {
      return ErrorMessage("Shop not found", 404);
    }

    // Check if the coupon code already exists
    const isCouponCodeExist = await discountCodeModel.findOne({
      couponName: body.couponName,
    });
    if (isCouponCodeExist) {
      return ErrorMessage("Coupon code already exists", 400);
    }

    if (body.minAmount !== "" || body.maxAmount !== "") {
      const query: any = { shopId: body.shopId };

      if (body.minAmount !== "") {
        query.price = { ...query.price, $gte: body.minAmount };
      }
      if (body.maxAmount !== "") {
        query.price = { ...query.price, $lte: body.maxAmount };
      }
      const products = await productModel.find(query);

      if (products.length === 0) {
        return ErrorMessage(
          "No products found for this shop within the specified range",
          404
        );
      }
    }

    // Create the discount code
    const discountCode = {
      couponName: body.couponName,
      discountPercentage: body.discountPercentage,
      minAmount: body.minAmount,
      maxAmount: body.maxAmount,
      shopId: body.shopId,
    };

    await discountCodeModel.create(discountCode);

    return NextResponse.json({
      message: "Discount code created successfully",
    });
  } catch (error) {
    console.error("Error creating discount code:", error);
    return ErrorMessage("Internal Server Error", 500);
  }
};
