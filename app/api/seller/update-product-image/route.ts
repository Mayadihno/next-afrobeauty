import dbConnect from "@/lib/db";
import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const shopId = formData.get("shopId") as string;
  const productId = formData.get("productId") as string;
  await dbConnect();
  const images: File[] = [];
  formData.forEach((value, key) => {
    if (key === "images") {
      images.push(value as File);
    }
  });
  try {
    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("No shop found", 404);
    }
    const product = await productModel.findById(productId);
    if (!product) {
      return ErrorMessage("No product found", 404);
    }

    // Upload images to Cloudinary
    let imageUrl: string | string[] | null = null;
    const folder = "productImages";
    if (images.length > 0) {
      try {
        imageUrl = await uploadImageToCloudinary(images, folder);
      } catch (uploadError: any) {
        console.error(uploadError.message);
        return ErrorMessage(uploadError.message, 500);
      }
    }

    const updatedImages = product.image.concat(imageUrl || []);
    product.image = updatedImages;
    await product.save();
    return new NextResponse(
      JSON.stringify({
        message: "Image added successfully",
        image: updatedImages,
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error) {
    return ErrorMessage("Something went wrong", 500);
  }
};
