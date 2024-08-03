import { productModel } from "@/models/productModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get("shopId");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const gender = searchParams.get("sex");
  const price = searchParams.get("price");
  const processTime = searchParams.get("processTime");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!shopId) {
    return ErrorMessage("shopId is required", 400);
  }

  const query: any = { shopId };

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query["category.value"] = { $regex: category, $options: "i" };
  }

  if (gender) {
    query.gender = gender.toLowerCase();
  }

  if (processTime) {
    query["processingTime.value"] = processTime;
  }

  if (price) {
    const priceRange = price.split("-").map(Number);
    if (priceRange.length === 2) {
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }
  }

  try {
    const products = await productModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await productModel.countDocuments(query);

    return new NextResponse(
      JSON.stringify({
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorMessage(error.message, 500);
  }
};
