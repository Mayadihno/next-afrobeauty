import { UserModel } from "@/models/userModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (request: NextRequest) => {
  const { newPassword, email } = await request.json();

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return ErrorMessage("User not found", 404);
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
