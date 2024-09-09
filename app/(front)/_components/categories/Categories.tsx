/* eslint-disable @next/next/no-img-element */
"use client";
import { category } from "@/utils/config/data";
import Link from "next/link";
import React from "react";
import Card from "../productCard/Card";
import { Product } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useFetchProducts } from "@/app/actions/useFetchAllProduct";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";

const Categories = () => {
  const { products, isLoading } = useFetchProducts();
  const data = products.products || [];

  return (
    <div className="">
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <h3>
          Shop By
          <span className="text-white hover:text-black">Categories</span>
        </h3>
        <div className="flex justify-center items-center space-x-2 pt-5">
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
          <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className=" bg-slate-50 shadow-xl h-[500px] overflow-y-auto font-ebgaramond rounded-[10px] w-[13%] custom-scrollbar">
            {category.map((item) => (
              <Link href={`/category/${item.cat}`} key={item.id}>
                <div className="flex items-center space-x-1 my-2 py-2 pl-4">
                  <item.icon size={25} />
                  <p className=" text-lg font-unkempt font-medium">
                    {item.cat}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-[87%] pl-4">
            <h3 className="text-2xl font-semibold font-ebgaramond my-4">
              Lastest Products
            </h3>
            <Swiper
              spaceBetween={20}
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
              {isLoading ? (
                <div className="my-5">
                  <ProductSkeleton count={4} />
                </div>
              ) : (
                data.map((item: Product) => (
                  <SwiperSlide key={item._id}>
                    <Card item={item} />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
