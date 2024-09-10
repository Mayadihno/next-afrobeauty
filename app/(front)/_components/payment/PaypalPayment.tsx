"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ICONS } from "@/utils/icons";
import { clearCart } from "@/redux/slice/cartSlice";

const PaypalPayment = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
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
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: any) => {
        return orderID;
      });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      const { payer } = details;

      if (payer) {
        await paypalPaymentHandler(payer);
      }
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const paypalPaymentHandler = async (payerInfo: any) => {
    try {
      const paymentInfo = {
        type: "Paypal",
        value: "Paid",
      };

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: orderData.userData,
          cartItems,
          shippingFee: orderData.shippingFee,
          totalPrice: orderData.totalPrice,
          paymentInfo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order successfully created");
        localStorage.removeItem("orderData");
        dispatch(clearCart());
        router.push("/payment/success");
      } else {
        console.error("Error creating order:", data.message);
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error handling PayPal payment:", error);
      toast.error(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="w-full flex border-b">
        <div
          className="bg-[#f63b60] text-white p-3 my-3 rounded-[5px] cursor-pointer text-[18px] font-[600]"
          onClick={() => setOpen(true)}
        >
          Pay with Paypal
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
            <div className=" relative w-[95%] md:w-[60%] overflow-y-scroll h-[85vh] md:h-[65vh] bg-white rounded-md p-4 shadow-sm md:mt-0 mt-[-50px]">
              <div className="w-full flex justify-end p-3">
                <ICONS.close
                  size={30}
                  className="cursor-pointer absolute top-3 right-3"
                  onClick={() => setOpen(!open)}
                />
              </div>
              <div className="w-[70%] mx-auto pt-28">
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "Ac3msFfs4xVs9feSbuipVSpUKseIIYeA_C9CxeFAHoI4HbYKyM7ZTgSiJ1hS_sGru1su5sbMxMb6q8Oh",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaypalPayment;
