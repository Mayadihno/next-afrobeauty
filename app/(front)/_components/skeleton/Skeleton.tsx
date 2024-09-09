/* eslint-disable react/no-unescaped-entities */
"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
const Skeletons = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">Scrapping results</h1>
      <h2 className=" mb-5 text-gray-400">We won't be long</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
        <Skeleton className="w-[300px] h-[300px] rounded-[10px] bg-gray-100 shadow-md" />
      </div>
    </div>
  );
};

export default Skeletons;
