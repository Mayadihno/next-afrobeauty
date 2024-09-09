import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  try {
    const { amount } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return new NextResponse(
      JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return new NextResponse(`Error processing request: ${error.message}`, {
      status: 500,
    });
  }
};
