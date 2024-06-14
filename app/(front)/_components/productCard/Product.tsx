/* eslint-disable @next/next/no-img-element */
import { product } from "@/utils/config/products";
import { ICONS } from "@/utils/icons";
import React from "react";
import Card from "./Card";

const Product = () => {
  return (
    <div>
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <h3>
          Shop By <span className="text-white hover:text-black">Products</span>
        </h3>
        <div className="flex justify-center items-center space-x-2 pt-5">
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="md:container md:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 md:mt-20 mt-10 px-4 md:px-0">
          {product.map((item) => {
            return <Card item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
