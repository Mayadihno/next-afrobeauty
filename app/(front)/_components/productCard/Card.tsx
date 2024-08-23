/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/redux/slice/cartSlice";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "@/redux/slice/wishList";
import { ICONS } from "@/utils/icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductQuickView from "./ProductQuickView";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatter";
import Image from "next/image";
import { ProductProp } from "@/types/types";

const Card = ({ item }: any) => {
  const [existing, setExisting] = useState(false);
  const [open, setOpen] = useState(false);
  const [existingWishList, setExistingWishList] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishListItems } = useAppSelector((state) => state.wishList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if the product already exists in the cart
    const isExisting = cartItems.some((cartItem) => cartItem._id === item._id);
    setExisting(isExisting);

    // Check if the product already exists in the wishlist
    const isExistingInWishlist = wishListItems.some(
      (wishListItem) => wishListItem._id === item.id
    );
    setExistingWishList(isExistingInWishlist);
  }, [cartItems, wishListItems, item._id]);

  const handleAddToCart = (item: any) => {
    const cartItem = {
      _id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      shopId: item.shopId,
      shop: item.shop,
      image: item.image[0],
      qty: 1,
      colors: item.colors[0],
      discountPrice: item.discountPrice,
      gender: item.gender,
      processingTime: item.processingTime,
      size: item.sizes?.[0],
    };
    dispatch(addProductToCart(cartItem));
    localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
    setExisting(true);
    toast.success("Item added to cart successfully");
  };

  const handleAddToWishList = (item: any) => {
    const wishListItem = { ...item, image: item.image };
    dispatch(addProductToWishList(wishListItem));
    localStorage.setItem(
      "wishlist",
      JSON.stringify([...wishListItems, wishListItem])
    );
    setExistingWishList(true);
    toast.success("Item added to wishlist successfully");
  };

  const handleRemove = (_id: string) => {
    dispatch(removeProductFromCart(_id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((product) => product._id !== _id))
    );
  };

  const handleRemoveFromWishList = (id: string) => {
    dispatch(removeProductFromWishList(id));
    setExistingWishList(false);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishListItems.filter((product) => product._id !== id))
    );
  };

  return (
    <div className="flex flex-col justify-between h-full border p-4 cursor-pointer relative">
      <div className="flex-grow">
        <div className="md:w-64 w-full h-64 relative">
          <Link href={`/product/${item._id}`}>
            <Image
              src={item.image[0]}
              className="w-full h-full object-contain"
              alt={item.title}
              width={400}
              height={400}
            />
          </Link>
          <div className="absolute top-4 md:right-[-30px] right-0">
            <div className="flex flex-col md:space-y-4 space-y-6">
              <button>
                <ICONS.eye
                  size={20}
                  title="Quick View"
                  color="#333"
                  onClick={() => setOpen(!open)}
                />
              </button>
              {existingWishList ? (
                <button onClick={() => handleRemoveFromWishList(item._id)}>
                  <ICONS.heartFilled
                    size={20}
                    className=" cursor-pointer "
                    title="Remove from wishlist"
                    color={existingWishList ? "red" : "#333"}
                  />
                </button>
              ) : (
                <button onClick={() => handleAddToWishList(item)}>
                  <ICONS.heart
                    size={20}
                    className=" cursor-pointer"
                    title="Add to wishlist"
                    color={existingWishList ? "red" : "#333"}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <Link href={`/product/${item._id}`}>
          <div className="flex flex-col mt-4 font-urbanist">
            <h5 className="text-sm font-medium text-[#999999] line-clamp-1">
              {item.category.map((item: any) => item.value).join(",\u00A0")}
            </h5>
            <div className="flex justify-between items-center my-4">
              <h3 className=" text-[#B10C62] text-base line-through font-semibold font-ebgaramond">
                {formatCurrency(item.discountPrice)}
              </h3>
              <h3 className="text-center md:text-base text-lg line-clamp-1 font-semibold">
                {item.name}
              </h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h4 className="flex items-center text-[#B10C62]">
          <span className="text-2xl font-semibold font-ebgaramond">
            {formatCurrency(item.price)}
          </span>
        </h4>
        <div>
          {existing ? (
            <button
              className="bg-[#B10C62] text-white py-2 px-4 rounded flex items-center font-prociono"
              onClick={() => handleRemove(item.id)}
            >
              <ICONS.remove className="mr-2" />
              <span className=" text-nowrap">Remove item</span>
            </button>
          ) : (
            <button
              className="bg-[#B10C62] text-white py-2 px-4 rounded flex items-center font-prociono"
              onClick={() => handleAddToCart(item)}
            >
              <ICONS.addToCart className="mr-2" />
              <span>Add to cart</span>
            </button>
          )}
        </div>
      </div>
      {open && <ProductQuickView setOpen={setOpen} item={{ ...item }} />}
    </div>
  );
};

export default Card;
