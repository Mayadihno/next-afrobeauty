import dbConnect from "@/lib/db";
import { productModel } from "@/models/productModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ErrorMessage("Product ID is required", 400);
    }
    await dbConnect();

    const product = await productModel.findById(id);
    const shopId = product.shopId;

    const totalProductsByVendor = await productModel.countDocuments({ shopId });

    if (!product) {
      return ErrorMessage("Product not found", 404);
    }

    return new NextResponse(
      JSON.stringify({ product, totalProductsByVendor }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorMessage("Server Error", 500);
  }
};
