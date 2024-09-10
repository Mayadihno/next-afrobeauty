"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useFetchProducts } from "@/app/actions/useFetchAllProduct";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { products } = useFetchProducts({
    name: search,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full md:h-[70px] h-[100px] bg-[#B10C62] px-3 md:px-8 py-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center pb-1">
          <div className="flex space-x-5 mb-4 md:mb-0 text-white cursor-pointer">
            <ICONS.facebook size={25} />
            <ICONS.instagram size={25} />
          </div>
          <div className="ml-3 md:hidden block">
            <Button
              onClick={() => router.push("/start-selling")}
              variant={"secondary"}
              className="bg-black hover:bg-[#000000be] rounded-[5px] text-white p-5 text-lg font-ebgaramond font-semibold"
            >
              Become Seller
            </Button>
          </div>
        </div>
        <div className="relative flex-1 md:mx-10">
          <input
            type="search"
            value={search}
            placeholder="Search..."
            onChange={handleSearch}
            className="md:w-full w-full md:h-[45px] h-[35px] bg-transparent border
             outline-none px-3 placeholder:text-base placeholder:text-white 
             font-ebgaramond font-semibold text-white"
          />
          <div className="absolute text-white md:right-3 md:top-3 right-3 top-1 cursor-pointer">
            <ICONS.search size={24} />
          </div>
          {search && products?.products.length ? (
            <div className="absolute min-h-fit shadow-xl rounded-b-[10px] bg-slate-50 z-[999] p-4">
              {products.products.map((product, index) => (
                <div key={index}>
                  <Link
                    href={`/product/${product._id}`}
                    onClick={() => setSearch("")}
                  >
                    <div className="w-full border-b-2 flex items-start py-3">
                      <Image
                        src={product?.image[0]}
                        alt={product.name}
                        className="w-[40px] h-[40px] mr-[10px]"
                        width={40}
                        height={40}
                      />
                      <h1>{product.name}</h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="ml-3 md:block hidden">
          <Button
            onClick={() => router.push("/start-selling")}
            variant={"secondary"}
            className="bg-black hover:bg-[#000000be] rounded-[5px] text-white p-5 text-lg font-ebgaramond font-semibold"
          >
            Become Seller
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
