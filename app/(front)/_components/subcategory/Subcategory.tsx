"use client";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useFetchProducts } from "@/app/actions/useFetchAllProduct";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";
import { Product } from "@/types/types";
import { category } from "@/utils/config/data";
import Paginate from "../pagination/Paginate";
import Card from "../productCard/Card";

const Subcategory = ({ subCategory }: { subCategory: string }) => {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState<number[]>([1000]);
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();

  const { products, isLoading, isFetching } = useFetchProducts({
    subcategory: subCategory,
    page: page,
    name: search,
    gender: gender,
    price: price,
    sortOrder: sortOrder,
    limit: 8,
  });

  const handleFilter = (e: any) => {
    e.preventDefault();
    console.log(price.toString());
  };
  const handleClearFilter = (e: any) => {
    e.preventDefault();
    setSearch("");
    setGender("");
    setPrice([1000]);
    setSortOrder("");
    setPage(1);
  };
  return (
    <div>
      <div className="bg-[#B10C62] w-full py-5 text-center font-abril font-bold text-4xl md:text-5xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center flex-grow">
            <h3>
              Shop By
              <span className="text-white hover:text-black pl-4">
                {subCategory}
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
      <div className="md:container md:mx-auto">
        <div className="flex space-x-5 my-10">
          <div className="relative">
            <input
              type="search"
              className="border w-72 h-10 border-[#9FEEA7] py-1 px-3 outline-none"
              placeholder="Search Product..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className=" absolute right-2 top-2">
              <ICONS.search size={20} />
            </div>
          </div>
          <div className="">
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger className="w-[180px] bg-blue-100 border-none shadow-md">
                <SelectValue placeholder="Filter by gender" />
              </SelectTrigger>
              <SelectContent className="bg-black border-none text-white shadow-xl rounded-[5px] mt-[-3px] cursor-pointer">
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="woman">Women</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full font-ebgaramond h-10">
            <Slider
              defaultValue={[1000]}
              min={1000}
              max={200000}
              step={500}
              value={price}
              className=" !rounded-[10px]"
              onValueChange={(value) => setPrice(value)}
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm">
                Price: {price.toLocaleString()} Naira
              </span>
              <button
                onClick={handleFilter}
                className=" text-sm p-1 rounded-[1px] border-[#B10C62] border text-black"
              >
                Filter
              </button>
            </div>
          </div>
          <div className="">
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <SelectTrigger className="w-[250px] border-none !shadow-md bg-green-100">
                <SelectValue placeholder="Default sorting" />
              </SelectTrigger>
              <SelectContent className="bg-black border-none shadow-xl rounded-[5px] text-white mt-[-3px] cursor-pointer">
                <SelectItem value="popular">Sort by popularity</SelectItem>
                <SelectItem value="latest">Sort by latest</SelectItem>
                <SelectItem value="low">Sort by price: low to high</SelectItem>
                <SelectItem value="high">Sort by price: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Button
              onClick={handleClearFilter}
              className="bg-[#B10C62] text-white hover:bg-[#B10C62]"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
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
              No Products Avaialable for {subCategory}
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
    </div>
  );
};

export default Subcategory;
