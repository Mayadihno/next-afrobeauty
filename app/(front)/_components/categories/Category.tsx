"use client";
import { useFetchProducts } from "@/app/actions/useFetchAllProduct";
import React, { useState } from "react";
import Card from "../productCard/Card";
import Skeletons from "../skeleton/Skeleton";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Paginate from "../pagination/Paginate";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";

const Category = ({ category }: { category: string }) => {
  const [page, setPage] = useState(1);
  const { products, isLoading, isFetching } = useFetchProducts({
    category: category,
    page: page,
  });
  const router = useRouter();

  return (
    <div className="mb-10">
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center flex-grow">
            <h3>
              Shop By
              <span className="text-white hover:text-black pl-4">
                {category}
              </span>
            </h3>
            <div className="flex justify-center items-center space-x-2 pt-5">
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[180px] h-[10px] rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex justify-end mr-3">
            <Button
              className="bg-black px-6 py-2 rounded-[10px] hover:bg-black text-white"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
      {products.products.length > 0 ? (
        <div className="md:container md:mx-auto">
          {isLoading || isFetching ? (
            <div className="my-6">
              <ProductSkeleton count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 mt-10 px-4 md:px-0">
              {products &&
                products.products.map((item: Product) => {
                  return <Card item={item} key={item._id} />;
                })}
            </div>
          )}
          <div className="flex justify-end items-center my-8">
            <Paginate
              setPage={setPage}
              totalPages={products.totalPages}
              page={page}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-[50px]">
          <h1 className="text-3xl font-bold">
            No Products Avaialable for {category}
          </h1>
          <Button
            className="bg-black px-6 py-2 mt-3 rounded-[10px] hover:bg-black text-white"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
