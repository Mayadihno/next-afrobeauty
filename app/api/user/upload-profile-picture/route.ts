import dbConnect from "@/lib/db";
import { UserModel } from "@/models/userModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userId, profilePicture } = await request.json();
  await dbConnect();
  try {
    if (!userId || !profilePicture) {
      return ErrorMessage("Please provide both userId and profilePicture", 401);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return ErrorMessage("User not found", 404);
    }

    user.avatar = profilePicture;
    await user.save();

    return new NextResponse(
      JSON.stringify({
        message: "Profile picture uploaded successfully",
        user,
      }),
      { status: 201 }
    );
  } catch (error: unknown) {
    return ErrorMessage(error as string, 500);
  }
};
