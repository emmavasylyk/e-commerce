import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.text();
    const data = JSON.parse(body);

    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: data.email,
          },
          unit_amount: data.totalAmount * 100,
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/?success=1`,
      cancel_url: `http://localhost:3000/?canceled=1`,
      metadata: {
        courseId: "course.id",
        userId: "user.id",
      },
    });

    console.log("session", session);

    return new NextResponse(session.url, { status: 200 });
  } catch (error) {
    // console.error("Error creating checkout session:", error);
    return new NextResponse("Internal Server Error", { status: 501 });
  }
}
