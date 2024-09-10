"use client";
import React from "react";
import Card from "../productCard/Card";
import { Product } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/productskeleton/productSkeleton";
import { useGetShopProductByShopIdQuery } from "@/redux/rtk/products";

interface SellerShopProps {
  shopId: string;
}

const SellerShop = ({ shopId }: SellerShopProps) => {
  const { data, isLoading } = useGetShopProductByShopIdQuery(shopId);
  const router = useRouter();

  return (
    <div className="my-10">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex md:flex-row flex-col items-center md:space-x-4">
            <Button
              onClick={() => router.back()}
              className=" bg-black text-white rounded-[10px] px-5 py-2 hover:bg-black"
            >
              Back
            </Button>
            <h3 className="text-xl md:pt-0 pt-4 font-ebgaramond font-semibold">
              Shop Product
            </h3>
          </div>
          <div className="flex md:flex-row flex-col-reverse items-center space-x-4">
            <h3 className="text-lg font-ebgaramond font-semibold">
              {data && data?.shopName}
            </h3>
            <div className="w-[60px] h-[60px]">
              <Image
                src={data && data?.shopLogo}
                alt="seller-profile image"
                width={60}
                height={60}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="md:container md:mx-auto">
          {isLoading ? (
            <div className="my-5">
              <ProductSkeleton count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-12 md:mt-20 mt-10 px-4 md:px-0">
              {data.products &&
                data.products.map((item: Product) => {
                  return <Card item={item} key={item._id} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerShop;
