import dbConnect from "@/lib/db";
import { productModel } from "@/models/productModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { productId, newStatus } = await req.json();
  await dbConnect();

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return ErrorMessage("Product not found", 400);
    }

    product.isAvailable = newStatus;
    await product.save();

    revalidatePath("/seller-product");

    return new NextResponse(
      JSON.stringify({
        message: "Product status updated successfully",
        status: 201,
        product,
      }),
      { status: 201 }
    );
  } catch (error) {
    return ErrorMessage("Something went wrong", 500);
  }
};
