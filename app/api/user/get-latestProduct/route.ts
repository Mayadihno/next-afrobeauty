import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const latestProduct = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10);
    return NextResponse.json(latestProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "No product available" },
      { status: 404 }
    );
  }
};
