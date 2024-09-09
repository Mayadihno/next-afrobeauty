import { sellerModel } from "@/models/sellerModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const user = await sellerModel.findOne({ email }).select("+password");
    if (!user) {
      return ErrorMessage("User not found", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ErrorMessage("Incorrect email or password", 400);
    }

    const sellerAccessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const sellerRefreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user,
      token: sellerAccessToken,
    });
    response.cookies.set("sellerAccessToken", sellerAccessToken, {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.cookies.set("sellerRefreshToken", sellerRefreshToken, {
      maxAge: 604800000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return ErrorMessage("Internal Server Error", 500);
  }
};
