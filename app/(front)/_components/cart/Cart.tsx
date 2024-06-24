"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  CartItem,
  removeProductFromCart,
  updateCartItemQty,
} from "@/redux/slice/cartSlice";
import { formatCurrency, formatNumber } from "@/utils/formatter";
import { ICONS } from "@/utils/icons";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const subtotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10 md:grid md:grid-cols-4 md:gap-5 flex flex-col-reverse">
        <div className="overflow-x-auto md:col-span-3 bg-[#ffffff] shadow-md">
          <div className="border-b-2 font-ebgaramond py-2">
            <h3 className="px-4 text-xl font-medium">
              Cart Items({cartItems?.length})
            </h3>
          </div>
          {cartItems?.map((item) => (
            <div key={item.id} className="border-b-[1px] p-3">
              <SingleCart item={item} />
            </div>
          ))}
        </div>
        <div className="bg-[#ffffff] shadow-md h-fit md:pb-0 pb-8">
          <div className=" border-b-2">
            <h3 className=" font-ebgaramond text-xl font-medium px-4 py-2">
              Cart Summary
            </h3>
          </div>
          <div className="flex items-center justify-between px-4 pt-4 pb-2 font-ebgaramond text-xl font-medium">
            <h3 className="">Subtotal</h3>
            <h3 className="">{formatCurrency(subtotal)}</h3>
          </div>
          <div className="text-sm font-normal font-urbanist px-4 border-b-[1px] pb-3 text-gray-500">
            <h5>Delivery fees not included yet.</h5>
          </div>
          <div className="p-4 text-white font-ebgaramond pt-6 md:block hidden">
            <Button className="flex hover:bg-[#B10C62] !text-lg items-center !rounded-[10px] cursor-pointer justify-center space-x-2 bg-[#B10C62] w-full">
              <h3 className="">{formatCurrency(subtotal)}</h3>
              <span>Checkout</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 text-white font-ebgaramond pt-8 md:hidden block">
        <Button
          className="flex hover:bg-[#B10C62]
         !text-xl items-center py-8 !rounded-[10px] cursor-pointer justify-center space-x-2 bg-[#B10C62] w-full"
        >
          <h3 className="">{formatCurrency(subtotal)}</h3>
          <span>Checkout</span>
        </Button>
      </div>
    </div>
  );
};

export default Cart;

const SingleCart = ({ item }: { item: CartItem }) => {
  const [value, setValue] = useState(item.qty);
  const dispatch = useAppDispatch();

  const increment = () => {
    const newQty = value + 1;
    setValue(newQty);
    dispatch(updateCartItemQty({ id: item.id, qty: newQty }));
  };

  const decrement = () => {
    const newQty = value === 1 ? 1 : value - 1;
    setValue(newQty);
    dispatch(updateCartItemQty({ id: item.id, qty: newQty }));
  };

  const handleRemoveFromCart = (id: number) => {
    toast.success("Item successfully removed from cart");
    dispatch(removeProductFromCart(id));
  };

  const totalPrice = item.price * item.qty;

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="w-[80px] h-[80px]">
            <Image
              src={item.image}
              className="w-full h-full object-cover"
              alt={item.title}
            />
          </div>
          <div className="flex flex-col ml-4 font-ebgaramond space-y-2">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <h4 className="font-urbanist text-base font-normal">
              <span className="text-gray-400">Seller:</span>{" "}
              {item?.seller || "Maya Store"}
            </h4>
            <h4 className="font-urbanist text-base font-normal text-gray-400">
              {item.stock || "20"} in stock
            </h4>
          </div>
        </div>
        <div className="flex flex-col font-urbanist">
          <h3 className="text-sm text-gray-400 font-normal flex items-center">
            <span>
              {formatCurrency(item.price)} * {formatNumber(item.qty)}
            </span>
          </h3>
          <h2 className="flex items-center text-lg font-medium py-3">
            {formatCurrency(totalPrice)}
          </h2>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <div
          className="flex items-center font-ebgaramond cursor-pointer"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <ICONS.delete size={20} className="text-[#B10C62]" />
          <span className="text-[#B10C62] text-lg uppercase ml-2">Remove</span>
        </div>
        <div className="flex items-center text-white">
          <div
            className={`border w-[30px] h-[30px] justify-center 
                        cursor-pointer bg-[#B10C62] border-[#B10C62] flex items-center`}
            onClick={increment}
          >
            <ICONS.add size={20} />
          </div>
          <span className="px-[10px] text-black">{value}</span>
          <div
            onClick={decrement}
            className="flex items-center w-[30px] h-[30px] justify-center cursor-pointer bg-[#B10C62]"
          >
            <ICONS.minus size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
