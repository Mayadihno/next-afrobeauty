/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import image from "../../public/assets/myLogo.png";
import Navitems from "./Navitems";
import { ICONS } from "@/utils/icons";
import AccordionNav from "./AccordionNav";
import { useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishListItems } = useAppSelector((state) => state.wishList);
  const [show, setShow] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className={` w-full bg-[#FEFFFE] py-3 sticky top-0 z-50`}>
        <div className="flex justify-between items-center md:px-10 px-3">
          <Link href={"/"}>
            <img
              alt="logo"
              src={image.src}
              width={80}
              height={80}
              className="rounded-[10px]"
            />
          </Link>
          <div className="md:block hidden">
            <Navitems />
          </div>
          <div className="flex items-center space-x-6">
            {mounted && (
              <div className=" flex items-center space-x-1 font-prociono">
                <div className="relative md:block hidden cursor-pointer">
                  <ICONS.heart size={25} />
                  <span className="absolute font-ebgaramond -top-3 -right-3 bg-[#B10C62] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                    {wishListItems?.length}
                  </span>
                </div>
              </div>
            )}
            {mounted && (
              <div className="relative cursor-pointer">
                <ICONS.cart size={25} />
                <span className=" absolute font-ebgaramond -top-3 -right-3 bg-[#B10C62] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                  {cartItems?.length}
                </span>
              </div>
            )}
            <div className="block md:hidden" onClick={() => setShow(!show)}>
              {show ? <ICONS.close size={25} /> : <ICONS.menu size={25} />}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {show && (
          <div className="mt-3 border-t-[#B10C62] shadow-md border-b-[#B10C62] border-t-[2px] border-b-[2px] px-3 h-[380px] overflow-y-scroll">
            <div>
              <AccordionNav />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
