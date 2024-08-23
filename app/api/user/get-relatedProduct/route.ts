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

    const product = await productModel.findById(id);

    if (!product) {
      return ErrorMessage("Product not found", 404);
    }

    const categoryLabels = product.category.map(
      (cat: { label: string }) => cat.label
    );

    // Find related products that have at least one matching category label
    const relatedProducts = await productModel.aggregate([
      {
        $match: {
          _id: { $ne: product._id }, // remove the current product
          "category.label": { $in: categoryLabels },
        },
      },
      { $sample: { size: 4 } },
    ]);

    return new NextResponse(JSON.stringify({ relatedProducts }), {
      status: 200,
    });
  } catch (error) {
    return ErrorMessage("Server Error", 500);
  }
};
