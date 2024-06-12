"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    console.log(search);
    setSearch("");
  };
  return (
    <div className="w-full md:h-[70px] h-[100px] bg-[#B10C62] px-3 md:px-8 py-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex space-x-5 mb-4 md:mb-0 text-white">
          <ICONS.facebook size={25} />
          <ICONS.instagram size={25} />
        </div>
        <div className="relative">
          <input
            type="search"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-60 w-full md:h-[45px] h-[35px] bg-transparent border
             outline-none px-3 placeholder:text-base placeholder:text-white 
             font-ebgaramond font-semibold text-white"
          />
          <div className="absolute text-white md:right-3 md:top-3 right-3 top-1 cursor-pointer">
            <ICONS.search size={24} onClick={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
