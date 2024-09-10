"use client";
import React, { useEffect, useState } from "react";
import PayementCard from "./PayementCard";
import PaypalPayment from "./PaypalPayment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slice/cartSlice";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/rtk/orders";
const PaymentInfo = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [select, setSelect] = useState(1);
  const dispatch = useAppDispatch();
  const [orderData, setOrderData] = useState({
    shippingFee: { shippingCompany: "", shippingPrice: 0 },
    totalPrice: 0,
    userData: {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  const [createOrder] = useCreateOrderMutation();

  const cashOnDeliveryHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentInfo = {
      type: "Cash on delivery",
      value: "Not Paid",
    };

    const result = await createOrder({
      userData: orderData.userData,
      cartItems,
      shippingFee: orderData.shippingFee,
      totalPrice: orderData.totalPrice,
      paymentInfo,
    });
    if (result?.data) {
      toast.success("Order successfully created");
      localStorage.removeItem("orderData");
      dispatch(clearCart());
      router.push("/payment/success");
    }
  };
  return (
    <div className="w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="flex w-full items-center justify-center border-b">
            <PayementCard />
          </div>
        ) : null}
        <br />

        <div className="">
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(2)}
            >
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Paypal
            </h4>
          </div>
        </div>

        {/* pay with payement */}
        {select === 2 ? <PaypalPayment /> : null}

        <br />
        {/* cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Cash on Delivery
            </h4>
          </div>

          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex font-ebgaramond">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input
                  type="submit"
                  value="Payment on delivery"
                  className={` !bg-[#f63b60] p-3 text-[#fff] rounded-[5px] my-3 cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
