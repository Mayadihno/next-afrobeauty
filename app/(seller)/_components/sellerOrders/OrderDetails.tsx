"use client";
import { Button } from "@/components/ui/button";
import {
  useGetOrdersDetailsByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/rtk/orders";
import { formatCurrency } from "@/utils/formatter";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillBagFill } from "react-icons/bs";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { data, isFetching, isLoading } = useGetOrdersDetailsByIdQuery(
    orderId,
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statuss, setStatuss] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const totalPrice = data?.cartItems?.reduce(
    (a: any, b: any) => a + b.price,
    0
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle size={50} color="#e94560" />
      </div>
    );
  }

  const handleStatusUpdate = async () => {
    setLoading(true);
    const res = await updateOrderStatus({ orderId, orderStatus: statuss });
    if (res.data.message) {
      toast.success(res.data.message);
      setStatuss("");
      setLoading(false);
      router.back();
    } else {
      setLoading(false);
      toast.error(
        "Something went wrong. Please try again later or contact support."
      );
    }
  };
  const handleRefundStatus = async () => {};
  return (
    <div className={`py-4 min-h-screen font-ebgaramond`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-1 text-[25px]">Order Details</h1>
        </div>
        <Button
          onClick={() => router.back()}
          className="!bg-[#fce1e6] !rounded-[4px] font-[600] text-[#e94560] !h-[45px] text-[18px]"
        >
          Order List
        </Button>
      </div>
      <div className="flex w-full justify-between items-center pt-3">
        <h5 className="text-[#00000089]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#0000008b] font-medium">
          Placed On:
          <span className=" font-semibold">
            {data?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>
      <br />
      <br />
      {/* order items */}
      <div className="grid grid-cols-3 gap-6">
        {data &&
          data.cartItems?.map((item: any) => {
            return (
              <div key={item._id} className="w-full p-3 mb-5 border">
                <div className="flex justify-center items-center">
                  <Image
                    src={item?.image}
                    className="w-[220px] h-[220px] rounded-[4px]"
                    alt={item.name}
                    width={220}
                    height={220}
                  />
                </div>
                <div className="w-full pt-3">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg">{item.name}</h5>
                    <h5 className="text-base">
                      {formatCurrency(item.price)} X {item.qty}
                    </h5>
                  </div>
                  <div className="flex justify-between py-2 items-center text-base capitalize">
                    <h4>Gender: {item.gender}</h4>
                    <h4>Color: {item.colors.value}</h4>
                    <h4 className="">
                      Size: <span className=" uppercase">{item.size}</span>
                    </h4>
                  </div>
                  <h3>
                    Processing Time:
                    <span className="pl-1">{item.processingTime.label}</span>
                  </h3>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-b text-right pr-2 w-full">
        <h5 className="py-3 text-[18px]">
          Total price <strong>{formatCurrency(totalPrice)}</strong>
        </h5>
      </div>
      <div className="w-full md:flex py-4">
        <div className="w-full md:w-[60%]">
          <h4 className="text-lg font-semibold pb-2">Shipping Address</h4>
          <h4 className="text-[20px]">
            {data?.userData?.address},{data?.userData?.city}
          </h4>
          <h4 className="text-[20px] pt-1">
            {data?.userData?.state},{data?.userData?.country}
          </h4>
          <h4 className="text-[20px] pt-1">
            Phone Number: {data?.userData?.phone}
          </h4>
        </div>
        <div className="w-full md:w-[40%]">
          <h4 className="text-lg font-semibold pb-2">Payment Info:</h4>
          <h4>
            Status:
            <span className="pl-2">
              {data?.paymentInfo ? data?.paymentInfo?.type : "Not Paid"}
            </span>
          </h4>
        </div>

        {data?.status !== "Processing refund" && (
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold pb-2">Order Status</h4>
            <select
              className="w-[230px] rounded-[4px] border h-[35px]"
              value={statuss}
              onChange={(e) => setStatuss(e.target.value)}
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "Delivered",
                "On the way",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "Delivered",
                    "On the way",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="">
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={statuss}
            onChange={(e) => setStatuss(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null}
      </div>
      <div className="">
        <Button
          onClick={
            data?.status !== "Processing refund"
              ? handleStatusUpdate
              : handleRefundStatus
          }
          className="bg-black w-full text-lg rounded-[5px] text-white hover:bg-[#000000a4]"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <LoaderCircle size={15} className=" animate-spin" /> Upadting
              Order status...
            </span>
          ) : (
            " Update Order Status"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
