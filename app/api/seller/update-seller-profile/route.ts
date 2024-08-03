import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const formData = await req.formData();
  const shopId = formData.get("shopId") as string;
  const shopName = formData.get("shopName") as string;
  const fullName = formData.get("fullName") as string;
  const shopAddress = formData.get("shopAddress") as string;
  const phone = formData.get("phone") as string;
  const description = formData.get("description") as string;
  const accountType = formData.get("accountType") as string;
  const avatar = formData.get("avatar") as File;
  const email = formData.get("email") as string;
  try {
    const shop = await sellerModel.findById(shopId);
    if (!shop) {
      return ErrorMessage("Shop not Found", 404);
    }

    let imageUrl: string[] | string | null = shop.image;
    if (avatar && avatar.size > 0) {
      // Upload new avatar to Cloudinary if provided
      const folder = "sellerImage";
      try {
        const uploadedImageUrl = await uploadImageToCloudinary(avatar, folder);
        if (uploadedImageUrl && uploadedImageUrl.length > 0) {
          imageUrl = uploadedImageUrl[0];
        }
      } catch (uploadError: any) {
        console.error(uploadError.message);
        return ErrorMessage(uploadError.message, 500);
      }
    }

    const updatedData = {
      shopName,
      fullName,
      shopAddress,
      phone,
      description,
      accountType,
      image: imageUrl,
      email,
    };

    const updatedShop = await sellerModel.findByIdAndUpdate(
      shopId,
      updatedData,
      {
        new: true,
      }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Profile updated successfully",
        shop: updatedShop,
        status: 201,
      })
    );
  } catch (error) {
    return ErrorMessage("Something went wrong", 500);
  }
};
