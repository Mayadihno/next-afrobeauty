import { NextResponse } from "next/server";

export const SuccessMessage = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
