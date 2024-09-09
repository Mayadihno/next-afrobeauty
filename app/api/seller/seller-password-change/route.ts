import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";

export const PATCH = async (request: NextRequest) => {
  const { oldPassword, newPassword, sellerId } = await request.json();
  await dbConnect();

  try {
    const user = await sellerModel.findById(sellerId).select("+password");
    if (!user) {
      return ErrorMessage("User not found", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return ErrorMessage("Incorrect password", 401);
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    await user.save();
    return new NextResponse(
      JSON.stringify({ message: "Password changed successfully welldone!!" }),
      { status: 201 }
    );
  } catch (error) {
    return ErrorMessage(error as string, 500);
  }
};
