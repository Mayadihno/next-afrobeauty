import { productModel } from "@/models/productModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const result = await productModel.aggregate([
      {
        $match: {
          shopId: id,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          products: [{ $limit: 10 }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const products = result[0].products;
    const totalCount = result[0].totalCount[0]?.count || 0;
    let shopName = null;
    let shopLogo = null;
    if (products.length > 0) {
      shopName = products[0].shop.shopName;
      shopLogo = products[0].shop.image;
    }

    return new NextResponse(
      JSON.stringify({ products, totalCount, shopName, shopLogo }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorMessage("Server Error", 500);
  }
};
