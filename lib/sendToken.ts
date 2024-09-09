import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

export const sendToken = (user: any, res: NextResponse): NextResponse => {
  const token = user.getJwtToken();

  // Options for cookies
  const cookieOptions: ResponseCookie = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    name: "sessionToken",
    value: token,
  };

  // Set the cookie in the response
  res.cookies.set("sessionToken", token, cookieOptions);

  return res;
};
