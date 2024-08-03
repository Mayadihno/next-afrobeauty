import { productModel } from "@/models/productModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = JSON.parse(formData.get("category") as string);
    const subcategory = JSON.parse(formData.get("subcategory") as string);
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const discountPrice = formData.get("discountPrice") as string;
    const quantity = formData.get("quantity") as string;
    const sizes = formData.get("sizes") as string;
    const colors = JSON.parse(formData.get("colors") as string);
    const processingTime = JSON.parse(formData.get("processingTime") as string);
    const gender = formData.get("gender") as string;
    const shopId = formData.get("shopId") as string;

    const images: File[] = [];
    formData.forEach((value, key) => {
      if (key === "images") {
        images.push(value as File);
      }
    });

    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("No shop found", 404);
    }

    // Upload images to Cloudinary
    let imageUrl: string[] | null = null;
    const folder = "productImages";
    if (images.length > 0) {
      try {
        imageUrl = await uploadImageToCloudinary(images, folder);
      } catch (uploadError: any) {
        console.error(uploadError.message);
        return ErrorMessage(uploadError.message, 500);
      }
    }

    const product = {
      name,
      category,
      subcategory,
      description,
      price,
      discountPrice,
      quantity,
      sizes,
      colors,
      processingTime,
      gender,
      image: imageUrl,
      shopId,
      shop,
    };

    await productModel.create(product);
    revalidatePath("/seller-product");
    return new NextResponse(
      JSON.stringify({
        message: "Product Created successfully",
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.message);
    return ErrorMessage("Something went wrong", 500);
  }
};
