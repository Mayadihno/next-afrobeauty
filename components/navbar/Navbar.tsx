"use client";
import Image from "next/image";
import React, { useState } from "react";
import image from "../../public/assets/myLogo.png";
import Navitems from "./Navitems";
import { ICONS } from "@/utils/icons";
import AccordionNav from "./AccordionNav";

const Navbar = () => {
  const [active, setActive] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full bg-[#FEFFFE] py-3`}
      >
        <div className="flex justify-between items-center md:px-10 px-3">
          <div className="logo">
            <Image
              alt="logo"
              src={image}
              width={80}
              height={80}
              className=" rounded-[10px]"
            />
          </div>
          <div className="md:block hidden">
            <Navitems />
          </div>
          <div className="flex items-center space-x-6">
            <div className=" flex items-center space-x-1 font-prociono">
              <div className="relative md:block hidden">
                <ICONS.heart size={25} />
                <span className=" absolute font-ebgaramond -top-3 -right-3 bg-[#B10C62] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                  4
                </span>
              </div>
            </div>
            <div className="relative">
              <ICONS.cart size={25} />
              <span className=" absolute font-ebgaramond -top-3 -right-3 bg-[#B10C62] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                84
              </span>
            </div>
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
