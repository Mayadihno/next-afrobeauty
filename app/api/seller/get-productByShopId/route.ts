import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get("shopId");
  const productId = searchParams.get("productId");

  if (!shopId || !productId) {
    return ErrorMessage("Missing shopId or productId", 400);
  }

  try {
    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("Shop Not Found", 404);
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return ErrorMessage("Product Not Found", 404);
    }

    return NextResponse.json({ product, status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get product" },
      { status: 500 }
    );
  }
};
