import { sellerModel } from "@/models/sellerModel";
import { tokenModel } from "@/models/tokenModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import dbConnect from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const shopName = formData.get("shopName") as string;
    const phone = formData.get("phone") as string;
    const shopAddress = formData.get("shopAddress") as string;
    const accountType = formData.get("accountType") as string;
    const avatarFile = formData.get("avatar") as File;

    await dbConnect();

    // Find the token in the database
    const tokenDoc = await tokenModel.findOne({ email, token });
    if (!tokenDoc) {
      return ErrorMessage("Invalid or expired token", 400);
    }

    // Remove token after verification
    await tokenModel.deleteOne({ _id: tokenDoc._id });
    console.log("Token verified and deleted");

    // Upload image to Cloudinary
    let avatarUrl: string | null = null;
    const folder: string = "shopLogo";
    if (avatarFile) {
      try {
        const uploadResult = await uploadImageToCloudinary(avatarFile, folder);
        avatarUrl = uploadResult ? uploadResult[0] : null;
      } catch (uploadError: any) {
        return ErrorMessage(uploadError.message, 500);
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create new seller
    const newSeller = new sellerModel({
      fullName,
      email,
      shopName,
      password: hashPassword,
      shopAddress,
      accountType,
      phone,
      image: avatarUrl,
    });
    await newSeller.save();

    return new NextResponse(
      JSON.stringify({
        message: "Account verified and created successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("An error occurred while processing the request", error);
    return ErrorMessage("An error occurred while processing your request", 500);
  }
};
