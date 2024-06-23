/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import React from "react";
import image from "../../../../public/assets/product/cart1.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cart from "./Cart";
const CartItems = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <div className="">
      {cartItems?.length === 0 ? (
        <div className="md:w-1/2 w-full mx-auto mt-10 bg-[#FEFFFE] shadow-lg">
          <div className=" flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full">
                <img
                  src={image.src}
                  alt="cart image"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="md:text-lg text-base font-medium font-ebgaramond">
                Your cart is empty!
              </h4>
              <h5 className=" font-urbanist md:text-base text-sm font-normal pt-5">
                Browse our categories and discover our best product for you!
              </h5>
              <div className="my-10">
                <button className="bg-[#B10C62] py-3 text-white px-10">
                  <Link href={"/"}>Start Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Cart />
      )}
    </div>
  );
};

export default CartItems;
