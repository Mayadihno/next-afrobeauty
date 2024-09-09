/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  StripePaymentElementOptions,
  PaymentIntentResult,
} from "@stripe/stripe-js";
import convertToSubcurrency from "@/utils/convertTosubCurrency";
import { formatCurrency } from "@/utils/formatter";
import toast from "react-hot-toast";

const Payments = ({ amount }: { amount: number }) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] =
    useState<PaymentIntentResult | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const [orderData, setOrderData] = useState({
    shippingFee: { shippingCompany: "", shippingPrice: 0 },
    totalPrice: 0,
    userData: {
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
    },
  });

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [amount]);

  const handleOrderCreation = async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: orderData.userData,
          cartItems,
          shippingFee: orderData.shippingFee,
          totalPrice: amount,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        localStorage.removeItem("orderData");
        localStorage.removeItem("cartItems");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    if (stripe) {
      stripe.retrievePaymentIntent(clientSecret).then((result) => {
        setPaymentIntent(result);
        if (result && result.paymentIntent?.status === "succeeded") {
          toast.success("Payment succeeded!");
        } else {
          toast.error("Your payment was not successful, please try again.");
        }
      });
    }
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const res = await stripe
        .retrievePaymentIntent(clientSecret)
        .then((result) => {
          setPaymentIntent(result);
          if (result && result.paymentIntent?.status === "succeeded") {
            toast.success("Payment succeeded!");
          } else {
            toast.error("Your payment was not successful, please try again.");
          }
        });

      // const { error } = await stripe.confirmPayment({
      //   elements,
      //   clientSecret,
      //   confirmParams: {
      //     return_url: `http://localhost:3000/payment/success?amount=${amount}`,
      //   },
      // });
      console.log(res);
      console.log(paymentIntent);

      // if (error) {
      //   setErrorMessage(error.message);
      // }
    } catch (error) {
      setErrorMessage("An error occurred during payment processing.");
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement options={paymentElementOptions} />}

        {errorMessage && <div>{errorMessage}</div>}

        <button
          disabled={!stripe || loading}
          className="text-white w-full p-3 bg-[#B10C62] mt-3 rounded-md font-ebgaramond font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay ` + formatCurrency(amount) : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default Payments;
