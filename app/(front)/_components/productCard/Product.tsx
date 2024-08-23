/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Card from "./Card";
import { Product as Products } from "@/types/types";
import Skeletons from "../skeleton/Skeleton";
import { useFetchProducts } from "@/app/actions/useFetchAllProduct";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";

const Product = () => {
  const { products, isLoading, isFetching } = useFetchProducts();
  const data = products.products?.slice(0, 8) || [];

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
        {isLoading || isFetching ? (
          <ProductSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 md:mt-20 mt-10 px-4 md:px-0">
            {products &&
              data.map((item: Products) => {
                return <Card item={item} key={item._id} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
