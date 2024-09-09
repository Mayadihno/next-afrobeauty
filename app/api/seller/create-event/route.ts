import dbConnect from "@/lib/db";
import { eventModel } from "@/models/eventModel";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const images: File[] = [];
  formData.forEach((value, key) => {
    if (key === "images") {
      images.push(value as File);
    }
  });

  await dbConnect();

  const shop = await sellerModel.findById(shopId);
  if (!shop) {
    return ErrorMessage("No shop found", 404);
  }

  try {
    // Upload images to Cloudinary
    let imageUrl: string[] | string | null = null;
    const folder = "eventImages";
    if (images.length > 0) {
      try {
        imageUrl = await uploadImageToCloudinary(images, folder);
      } catch (uploadError: any) {
        console.error(uploadError.message);
        return ErrorMessage(uploadError.message, 500);
      }
    }
    const event = {
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
      startDate,
      endDate,
    };

    await eventModel.create(event);
    revalidatePath("/all-events");
    return new NextResponse(
      JSON.stringify({
        message: "Event Created successfully",
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return ErrorMessage("Something went wrong, Failed to create event", 500);
  }
};
