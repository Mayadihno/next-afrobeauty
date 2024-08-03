"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleSearch = () => {
    console.log(search);
    setSearch("");
  };

  return (
    <div className="w-full md:h-[70px] h-[100px] bg-[#B10C62] px-3 md:px-8 py-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex space-x-5 mb-4 md:mb-0 text-white cursor-pointer">
          <ICONS.facebook size={25} />
          <ICONS.instagram size={25} />
        </div>
        <div className="relative flex-1 mx-10">
          <input
            type="search"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-full w-full md:h-[45px] h-[35px] bg-transparent border
             outline-none px-3 placeholder:text-base placeholder:text-white 
             font-ebgaramond font-semibold text-white"
          />
          <div className="absolute text-white md:right-3 md:top-3 right-3 top-1 cursor-pointer">
            <ICONS.search size={24} onClick={handleSearch} />
          </div>
        </div>
        <div className="ml-3">
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
