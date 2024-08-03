import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  email: string;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sellerAccessToken")?.value;

  if (!accessToken) {
    const renewed = await renewToken(req);
    if (renewed) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ valid: false, message: "No Access Token" });
    }
  } else {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY as string
      ) as DecodedToken;
      (req as any).email = decoded.email;
      (req as any).id = decoded.id;
      return NextResponse.next();
    } catch (err) {
      console.error("Token verification error:", err);
      return NextResponse.json({ valid: false, message: "Invalid Token" });
    }
  }
}

async function renewToken(req: NextRequest) {
  const refreshToken = req.cookies.get("sellerRefreshToken")?.value;

  if (!refreshToken) {
    return false;
  } else {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY as string
      ) as DecodedToken;
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      const response = NextResponse.next();
      response.cookies.set("sellerAccessToken", newAccessToken, {
        maxAge: 86400000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return true;
    } catch (err) {
      console.error("Refresh token verification error:", err);
      return false;
    }
  }
}
