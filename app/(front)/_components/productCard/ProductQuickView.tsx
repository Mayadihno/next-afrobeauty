/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addProductToCart } from "@/redux/slice/cartSlice";
import { Product } from "@/types/types";
import { formatCurrency } from "@/utils/formatter";
import { ICONS } from "@/utils/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type QuickView = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Product;
};

const ProductQuickView = ({ setOpen, item }: QuickView) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishListItems } = useAppSelector((state) => state.wishList);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    if (wishListItems && wishListItems.find((i) => i._id === item._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [item._id, wishListItems]);

  const decrementCount = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = (item: any) => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    const isItemExist = cartItems && cartItems.find((i) => i._id === item._id);
    if (isItemExist) {
      toast.error("Item already exist in cart");
      return;
    } else {
      if (item.quantity < count) {
        toast.error("Product Stock Limited");
      } else {
        const cartItem = {
          _id: item._id,
          name: item.name,
          category: item.category,
          price: item.price,
          shopId: item.shopId,
          shop: item.shop,
          image: item.image[0],
          qty: count,
          colors:
            selectedColor === null
              ? undefined
              : [{ label: selectedColor, value: selectedColor }],
          discountPrice: item.discountPrice,
          gender: item.gender,
          processingTime: item.processingTime,
          size: item.sizes?.[0],
        };
        dispatch(addProductToCart(cartItem));
        localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
        toast.success("Item added to cart successfully");
      }
    }
  };

  return (
    <div>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
        <div className=" relative w-[95%] md:w-[60%] overflow-y-scroll h-[85vh] md:h-[75vh] bg-white rounded-md p-4 shadow-sm md:mt-0 mt-[-50px] ">
          <ICONS.close
            size={30}
            className="absolute right-3 top-3 z-50"
            onClick={() => setOpen(false)}
          />
          {/* block w-full md:flex */}
          <div className="">
            <div className="w-full">
              <div className="flex md:justify-between flex-col md:flex-row md:space-x-8 md:mt-10">
                <div className="w-full md:h-[400px] h-[200px]">
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full font-ebgaramond">
                  <h3 className="md:text-3xl text-base font-medium">
                    {item.name}
                  </h3>
                  <div className="flex justify-between py-3">
                    <h3 className="text-2xl font-semibold flex items-center text-[#B10C62]">
                      {formatCurrency(item.price)}
                    </h3>
                    <div className="">
                      {click ? (
                        <ICONS.heartFilled
                          size={25}
                          color="red"
                          className="cursor-pointer"
                          onClick={() => {
                            setClick(false);
                          }}
                        />
                      ) : (
                        <ICONS.heart
                          size={25}
                          className="cursor-pointer"
                          onClick={() => {
                            setClick(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <hr className="mt-3" />
                  <div className="">
                    <h3 className="text-lg font-medium uppercase py-2">
                      Available Colors:
                      <span className="ml-2">{selectedColor}</span>
                    </h3>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-y-4 cursor-pointer">
                      {item.colors.map((colorObject, index) => (
                        <div
                          key={index}
                          className={`border text-center p-2 rounded-sm border-[#777777] ${
                            selectedColor === colorObject.label
                              ? "bg-[#B10C62] text-white border-[#B10C62]"
                              : ""
                          }`}
                          onClick={() => handleColorClick(colorObject.label)}
                        >
                          <p className="text-base font-medium">
                            {colorObject.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      {selectedColor && (
                        <h3
                          className="text-lg font-prociono font-medium border w-[90px] h-[30px] px-2 py-3 rounded-sm flex items-center"
                          onClick={() => setSelectedColor(null)}
                        >
                          <ICONS.clear
                            size={20}
                            className="mr-2 text-red-600"
                          />
                          <span>Clear</span>
                        </h3>
                      )}
                    </div>
                    <hr className="mt-5" />
                    <div className="mt-10 mb-6">
                      <div className="flex items-center justify-between pr-3">
                        <div className=" font-unkempt">
                          <button
                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white 
                            font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                            onClick={decrementCount}
                          >
                            -
                          </button>
                          <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                            {count}
                          </span>
                          <button
                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold
                             rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                            onClick={incrementCount}
                          >
                            +
                          </button>
                        </div>
                        <div
                          className="button font-prociono"
                          onClick={() => handleAddToCart(item)}
                        >
                          <button className="bg-[#B10C62] text-white py-2 px-4 rounded flex items-center">
                            <ICONS.addToCart size={20} className="mr-2" />
                            <span>Add to cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="mt-5">
                      <h3 className="text-lg font-medium font-ebgaramond">
                        Category:
                        {item.category
                          .map((category) => category.label)
                          .join(", ")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
