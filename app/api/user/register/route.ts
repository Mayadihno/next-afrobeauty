import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { UserModel } from "@/models/userModel";
import { ErrorMessage } from "@/utils/ErrorMessage";

export const POST = async (request: NextRequest) => {
  try {
    const { userData } = await request.json();

    // db connection
    await dbConnect();

    //check if your already exist with this email address
    const email = userData.email;
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return ErrorMessage("User already exists with this email address", 401);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // destructure the userData
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    };

    const user = await UserModel.create(newUser);
    if (user) {
      return new NextResponse(
        JSON.stringify({ message: "User Created Successfully", user }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return ErrorMessage("User Registration Failed", 401);
    }
  } catch (error: any) {
    return ErrorMessage(error.message || "Internal Server Error", 500);
  }
};
