/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { carouselImage } from "@/utils/config/data";

const Carousels = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {Array.isArray(carouselImage) &&
          carouselImage.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full md:h-[560px] h-[400px]">
                <img
                  src={item.image.src}
                  alt={`carousel image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute md:left-10 left-5 top-[200px] inset-0 flex flex-col justify-start text-white px-1 md:px-4">
                  <h3 className="md:text-6xl text-4xl font-bold font-prociono">
                    Welcome to
                  </h3>
                  <h3 className="md:text-6xl text-4xl font-bold font-prociono">
                    Maya Beauty Store
                  </h3>
                  <h5 className="text-2xl mt-3 font-unkempt">
                    Beauty at your doorstep
                  </h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Carousels;
