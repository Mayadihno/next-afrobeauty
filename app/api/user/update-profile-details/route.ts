import { UserModel } from "@/models/userModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
export const POST = async (request: NextRequest) => {
  const { userId, fullName, email, phoneNumber, password } =
    await request.json();

    await dbConnect();

  try {
    if (!userId || !fullName || !email || !phoneNumber || !password) {
      return ErrorMessage("Please provide all required fields", 401);
    }

    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      return ErrorMessage("User not found", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return ErrorMessage("Incorrect password", 401);
    }

    user.name = fullName;
    user.email = email;
    user.phone = phoneNumber;
    await user.save();

    return new NextResponse(
      JSON.stringify({
        message: "Profile details updated successfully",
        user,
      }),
      { status: 201 }
    );
  } catch (error: unknown) {
    return ErrorMessage(error as string, 500);
  }
};
