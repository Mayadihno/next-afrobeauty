"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payments from "./Payments";
import { useMemo } from "react";
import convertToSubcurrency from "@/utils/convertTosubCurrency";
const PaymentCard = () => {
  const [stripeApiKey, setStripeApiKey] = useState<string>("");
  const [orderData, setOrderData] = useState({
    totalPrice: 0,
  });

  async function getStripeApiKey() {
    try {
      const res = await fetch("/api/stripeKey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch the Stripe API key");
      }

      const data = await res.json();
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  const amount = orderData?.totalPrice;

  // const amount = useMemo(
  //   () => ({
  //     amount: Math.round(orderData?.totalPrice),
  //   }),
  //   [orderData?.totalPrice]
  // );

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      {stripeApiKey && (
        <Elements
          stripe={loadStripe(stripeApiKey)}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <div className="">
            <Payments amount={amount} />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default PaymentCard;
