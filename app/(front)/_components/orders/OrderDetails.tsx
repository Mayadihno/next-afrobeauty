"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks/hooks";
import { CartItem } from "@/types/types";
import { formatCurrency } from "@/utils/formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { orders } = useAppSelector((state) => state.order);
  const order = orders.find((order) => order._id === orderId);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | undefined>();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const totalPrice = order?.cartItems?.reduce(
    (a: any, b: any) => a + b.price * b.qty,
    0
  );

  const refundHandler = () => {};
  const handleSubmit = () => {};
  return (
    <div className="w-[85%] mx-auto py-4 min-h-screen font-ebgaramond">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-1 text-[25px]">Order Details</h1>
        </div>
        <Button
          className="bg-black text-white px-8 hover:bg-black rounded-[5px]"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div className="flex w-full justify-between items-center pt-2">
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
            className="flex flex-col p-3 border items-center justify-center space-y-2"
            key={item.id}
          >
            <div className="flex justify-center items-center">
              <Image
                src={item?.image}
                className="w-[220px] h-[220px] rounded-[4px]"
                alt={item.name ?? ""}
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
                <h4>Color: {item.colors?.value}</h4>
                <h4 className="">
                  Size: <span className=" uppercase">{item.size}</span>
                </h4>
              </div>
              <div className="flex justify-between items-center">
                <h3>
                  Processing Time:
                  <span className="pl-1">{item.processingTime?.label}</span>
                </h3>
                {order?.status === "Delivered" ? (
                  <div
                    className={`w-[120px] bg-black h-[35px] my-3 flex items-center justify-center rounded-[10px] cursor-pointer text-[#fff]`}
                    onClick={() => {
                      setOpen(true);
                      setSelectedItem(item);
                    }}
                  >
                    Write a review
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* review pop modal */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#00000054] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-white shadow rounded-md p-3">
            <div className="w-full flex justify-end">
              <RxCross1
                onClick={() => setOpen(false)}
                size={30}
                className="pr-2 cursor-pointer"
              />
            </div>
            <h2 className=" text-center font-Poppins font-[500] text-[30px]">
              Give a Review
            </h2>
            <br />
            <div className="flex w-full justify-between">
              <Image
                src={selectedItem?.image ?? ""}
                className="w-[100px] h-[100px]"
                alt=""
                width={100}
                height={100}
              />
              <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
              <h4 className="pl-3 text-[20px]">
                {formatCurrency(selectedItem?.price ?? 0)} X {selectedItem?.qty}
              </h4>
            </div>
            <br />
            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    size={25}
                    color="rgb(246,186,0)"
                    className="mr-1 cursor-pointer"
                    key={i}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    size={25}
                    color="rgb(246,186,0)"
                    className="mr-1 cursor-pointer"
                    key={i}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500] mb-2">
                write a comment
                <span className="font-[400] text[16px] ml-1 text-[#0000005c]">
                  (optional)
                </span>
              </label>
              <textarea
                name="commet"
                placeholder="Say something about this product"
                cols={50}
                rows={4}
                className="w-[95%] p-2 border outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <Button
              className={` bg-black hover:bg-black text-white ml-3 text-[20px]`}
              onClick={rating > 1 ? handleSubmit : undefined}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      <div className="border-b flex justify-between items-center pr-2 w-full">
        <div className="">
          {order?.shippingFee !== undefined ? (
            <>
              <h5 className="pt-3 text-[18px]">
                Shipping fee:
                <span className="text-base font-semibold pl-2">
                  {formatCurrency(Number(order.shippingFee.shippingPrice))}
                </span>
              </h5>
            </>
          ) : (
            <h5 className="pt-3 text-[18px]">
              Shipping fee <strong>N/A</strong>
            </h5>
          )}
        </div>
        <h5 className="py-3 text-[18px]">
          Total price <strong>{formatCurrency(totalPrice)}</strong>
        </h5>
      </div>
      <br />
      <div className="w-full md:flex items-center">
        <div className="w-full md:flex py-4">
          <div className="w-full md:w-[60%]">
            <h4 className="text-lg font-semibold pb-2">Shipping Address</h4>
            <h4 className="text-[20px]">
              {order?.userData?.address},{order?.userData?.city}
            </h4>
            <h4 className="text-[20px] pt-1">
              {order?.userData?.state},{order?.userData?.country}
            </h4>
            <h4 className="text-[20px] pt-1">
              Phone Number: {order?.userData?.phone}
            </h4>
          </div>
          <div className="w-full md:w-[40%]">
            <h4 className="text-lg font-semibold pb-1">Payment Info:</h4>
            <h4 className="py-2">
              <span className=" font-semibold"> Payment Status:</span>
              <span className="pl-2">
                {order?.paymentInfo ? order?.paymentInfo?.value : "Not Paid"}
              </span>
            </h4>
            <h4>
              <span className=" font-semibold">Payment Type:</span>
              <span className="pl-2">
                {order?.paymentInfo ? order?.paymentInfo?.type : "Cash"}
              </span>
            </h4>
          </div>
          <br />
          {order?.status === "Delivered" && (
            <Button
              className={`!bg-[black] px-6 py-3 !rounded-[4px] font-[600} text-white`}
              onClick={refundHandler}
            >
              Ask for refund
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
