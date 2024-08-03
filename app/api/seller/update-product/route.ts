import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { data, shopId, productId } = await req.json();

  try {
    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("No shop found", 404);
    }
    const product = await productModel.findById(productId);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }

    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.discountPrice = data.discountPrice;
    product.quantity = data.quantity;
    product.category = data.category;
    product.subcategory = data.subcategory;
    product.quantiy = data.quantity;
    product.colors = data.colors;
    product.sizes = data.sizes;
    product.gender = data.gender;
    product.processingTime = data.processingTime;

    await product.save();

    return new NextResponse(
      JSON.stringify({
        message: "Product updated successfully",
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error) {
    return ErrorMessage("Something went wrong", 500);
  }
};
