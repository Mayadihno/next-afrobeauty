/* eslint-disable @next/next/no-img-element */
"use client";
import { categoriesImage } from "@/utils/config/data";
import React from "react";

const Categories = () => {
  return (
    <div className="">
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <h3>
          Shop By{" "}
          <span className="text-white hover:text-black">Categories</span>
        </h3>
        <div className="flex justify-center items-center space-x-2 pt-5">
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="md:container md:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 md:mt-20 mt-10 px-4 md:px-0">
          {categoriesImage.map((item) => (
            <div key={item.id} className="w-full flex justify-center">
              <div className="w-full md:w-[200px] cursor-pointer h-fit flex flex-col items-center justify-center">
                <img
                  src={item.image.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
                <p className="md:text-lg text-base pt-2 font-prociono font-semibold text-center">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
