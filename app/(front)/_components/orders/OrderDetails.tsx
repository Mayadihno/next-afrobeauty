"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { formatCurrency } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillBagFill } from "react-icons/bs";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { orders } = useAppSelector((state) => state.order);
  const order = orders.find((order) => order._id === orderId);
  return (
    <div className="w-[85%] mx-auto py-4 min-h-screen font-ebgaramond">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-1 text-[25px]">Order Details</h1>
        </div>
        <Link href={"/orders"}>
          <div
            className={` !bg-[black] px-6 py-3 !rounded-[4px] font-[600] text-white text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="flex w-full justify-between items-center pt-3">
        <h5 className="text-[#00000089]">
          Order ID: <span>#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#0000008b]">
          Placed On:
          <span className="text-base font-semibold">
            {order?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-3 gap-6">
        {order?.cartItems?.map((item) => (
          <div
            className="flex flex-col items-center justify-center space-y-2"
            key={item.id}
          >
            <Image src={item.image} alt={item.title} width={150} height={150} />
            <div className="w-full font-ebgaramond text-center">
              <h5 className="text-lg font-semibold text-nowrap">
                {item.title}
              </h5>
              <h5 className="text-base">
                {formatCurrency(item.price)} X {item.qty}
              </h5>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t flex justify-between items-center w-full font-ebgaramond">
        <div className="">
          {order?.shippingFee !== undefined ? (
            <>
              <h5 className="pt-3 text-[18px]">
                Shipping fee:
                <span className="text-base font-semibold pl-2">
                  {formatCurrency(Number(order.shippingFee.shippingPrice))}
                </span>
              </h5>
              <h5 className="text-lg pt-2">
                Shipping Company:{" "}
                <span className="capitalize">
                  {order.shippingFee.shippingCompany}
                </span>
              </h5>
            </>
          ) : (
            <h5 className="pt-3 text-[18px]">
              Shipping fee <strong>N/A</strong>
            </h5>
          )}
        </div>
        {order?.totalPrice !== undefined ? (
          <h5 className="pt-3 text-[18px]">
            Total price: <strong>{formatCurrency(order.totalPrice)}</strong>
          </h5>
        ) : (
          <h5 className="pt-3 text-[18px]">
            Total price <strong>N/A</strong>
          </h5>
        )}
      </div>
      <br />
      <div className="w-full md:flex items-center">
        <div className="w-full md:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address</h4>
          <h4 className="pt-3 text-[20px]">
            {order?.userData.address},{order?.userData.city},
          </h4>
          <h4 className="text-[20px] pt-1">
            {order?.userData.state},{order?.userData.country}
          </h4>
          <h4 className="text-[20px] pt-1">
            Phone Number: {order?.userData.phone}
          </h4>
        </div>
        <div className="w-full md:w-[40%] font-ebgaramond">
          <h4 className="pt-3 text-[20px] font-semibold pb-2">Payment Info:</h4>
          <h4 className="text-base font-medium pb-2">
            Payment Type:
            <span className="pl-2">
              {order?.paymentInfo ? order?.paymentInfo.type : "Not Paid"}
            </span>
          </h4>
          <h4 className="text-base font-medium">
            Payment Status: <span className="pl-2">Not Paid</span>
          </h4>
          <br />
          {order?.status === "Delivered" && (
            <div
              className={`!bg-[black] px-6 py-3 !rounded-[4px] font-[600} text-white`}
              //   onClick={refundHandler}
            >
              Give a refund
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
