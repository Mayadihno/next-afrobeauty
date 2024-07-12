import { NextRequest, NextResponse } from "next/server";
import { ErrorMessage } from "@/utils/ErrorMessage";

export const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Log out successful",
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.cookies.set({
      name: "sessionToken",
      value: "",
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return ErrorMessage(error.message || "Internal Server Error", 500);
  }
};
