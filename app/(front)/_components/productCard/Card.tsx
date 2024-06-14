/* eslint-disable @next/next/no-img-element */
import { ICONS } from "@/utils/icons";
import React from "react";

type CardProp = {
  item: {
    id: number;
    image: { src: string };
    title: string;
    category: string;
    price: string;
  };
};
const Card = ({ item }: CardProp) => {
  return (
    <div
      key={item.id}
      className="flex flex-col justify-between h-full border p-4 cursor-pointer relative"
    >
      <div className="flex-grow">
        <div className="md:w-64 w-full h-64 relative">
          <img
            src={item.image.src}
            className="w-full h-full object-contain"
            alt={item.title}
          />
          <div className="absolute top-4 md:right-[-30px] right-0">
            <div className="flex flex-col md:space-y-4 space-y-6">
              <button className="">
                <ICONS.eye size={20} className="" />
              </button>
              <button className="">
                <ICONS.heart size={20} className="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4 font-urbanist">
          <h5 className="text-center text-sm font-medium text-[#999999]">
            {item.category}
          </h5>
          <h3 className="text-center pt-2 md:text-base text-lg line-clamp-2 font-semibold">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h4 className=" flex items-center text-[#B10C62]">
          <ICONS.naira size={25} />
          <span className=" text-2xl font-semibold font-ebgaramond ">
            {item.price}
          </span>
        </h4>
        <div className="">
          <button className="bg-[#B10C62] text-white py-2 px-4 rounded flex items-center font-prociono">
            <ICONS.addToCart className="mr-2" />
            <span> Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
