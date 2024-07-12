import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const stripeApiKey = process.env.NEXT_STRIPE_API_KEY;

    if (!stripeApiKey) {
      return NextResponse.json(
        { message: "Stripe API key not found" },
        { status: 500 }
      );
    }

    return NextResponse.json({ stripeApiKey }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: `Error fetching Stripe API key: ${message}` },
      { status: 500 }
    );
  }
};
