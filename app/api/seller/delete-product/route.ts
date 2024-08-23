import { productModel } from "@/models/productModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }
    await productModel.findByIdAndDelete(id);
    revalidatePath("/seller-product");

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return ErrorMessage("Failed to delete product", 500);
  }
};
