import { UserModel } from "@/models/userModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendToken } from "@/lib/sendToken";

export const POST = async (request: NextRequest) => {
  const { data } = await request.json();
  const { email, password } = data;

  try {
    if (!email || !password) {
      return ErrorMessage("Please provide both email and password", 401);
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return ErrorMessage("User not Found", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ErrorMessage("Incorrect Password", 401);
    }
    const sessionToken = user.getJwtToken();
    const response = new NextResponse(
      JSON.stringify({
        message: "User signed in Successfully",
        user,
        sessionToken,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return sendToken(user, response);
  } catch (error: any) {
    return ErrorMessage(error.message || "Internal Server Error", 500);
  }
};
