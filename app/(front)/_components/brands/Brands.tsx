/* eslint-disable @next/next/no-img-element */
"use client";
import { brandImage } from "@/utils/config/data";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  return (
    <div className="mt-10">
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <h3>
          Popular <span className="text-white hover:text-black">Brands</span>
        </h3>
        <div className="flex justify-center items-center space-x-2 pt-5">
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="md:container md:mx-auto">
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          modules={[Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {brandImage.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full flex justify-center my-10">
                <div className="w-full md:w-[200px] cursor-pointer h-fit flex flex-col items-center justify-center">
                  <img
                    src={item.image.src}
                    alt="brand"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
