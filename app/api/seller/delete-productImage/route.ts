import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { index, id, shopId } = await req.json();

    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("Shop not found", 404);
    }
    const product = await productModel.findById(id);
    if (!product) {
      return ErrorMessage("Product not found", 404);
    }
    if (index < 0 || index >= product.image.length) {
      return ErrorMessage("Invalid image index", 400);
    }
    product.image.splice(index, 1);
    await product.save();

    revalidatePath("/seller-product");
    revalidatePath(`/seller-product/${id}`);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete image" },
      { status: 500 }
    );
  }
};
