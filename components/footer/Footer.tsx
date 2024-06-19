/* eslint-disable @next/next/no-img-element */
import React from "react";
import { customers, menu } from "./data";
import Link from "next/link";
import { ICONS } from "@/utils/icons";

const Footer = () => {
  return (
    <div className="mt-10">
      <div className="w-full h-fit bg-[#232223]">
        <div className="grid grid-cols-1 md:grid-cols-4 w-11/12 mx-auto font-ebgaramond py-10 gap-x-16 md:gap-y-0 gap-y-8">
          {/* For Customers Section */}
          <div className="customers">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h3 className="text-xl font-medium text-white">For Customers</h3>
            </div>
            <div className="text-white text-base font-ebgaramond font-normal mt-4 md:border-t-2 border-t-0 border-[#777777]">
              {customers.map((item) => (
                <div
                  className="flex flex-col py-2 md:border-b-2 border-b-0 border-[#777777]"
                  key={item.id}
                >
                  <Link href={item.link}>{item.label}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Menu Section */}
          <div className="quick menu">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h3 className="text-xl font-medium text-white">Quick Menu</h3>
            </div>
            <div className="text-white text-base font-ebgaramond font-normal mt-4 md:border-t-2 border-t-0 border-[#777777]">
              {menu.map((item) => (
                <div
                  className="flex flex-col py-2 md:border-b-2 border-b-0 border-[#777777]"
                  key={item.id}
                >
                  <Link href={item.link}>{item.label}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info Akure Section */}
          <div className="contact info-akure">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h3 className="text-xl font-medium text-white">
                Contact Info Akure
              </h3>
            </div>
            <div className="text-white text-base font-ebgaramond font-normal mt-4">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center ">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.location size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-3 md:ml-2">
                    <span> Address:</span>
                    <span className="text-[#777777] ml-2">
                      Futa South gate Akure, Ondo state, Nigeria
                    </span>
                  </h3>
                </div>
                <div className="flex items-center ">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.call size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-3 md:ml-2">
                    Phone:
                    <span className="text-[#777777] ml-2 text-nowrap">
                      +2348136908207
                    </span>
                  </h3>
                </div>
                <div className="flex items-center ">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.message size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-3 md:ml-2">
                    Email:
                    <span className="text-[#777777] ml-2 text-nowrap">
                      mayabeauty@gmail.com
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Lagos Section */}
          <div className="contact info-lagos">
            <div className="flex space-x-3 items-center">
              <div className="bg-[#B10C62] h-[20px] w-[3px]" />
              <h3 className="text-xl font-medium text-white">
                Contact Info Lagos
              </h3>
            </div>
            <div className="text-white text-base font-ebgaramond font-normal mt-4">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.location size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-2">
                    Address:
                    <span className="text-[#777777] ml-2">
                      N0 35 Allen Avenue, Ikeja, Lagos State, Nigeria.
                    </span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.call size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-3">
                    Phone:
                    <span className="text-[#777777] ml-2 text-nowrap">
                      +2348088060220
                    </span>
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="border-2 p-3 border-[#777777]">
                    <ICONS.message size={20} color="#B10C62" />
                  </div>
                  <h3 className="ml-3">
                    Email:
                    <span className="text-[#777777] ml-2 text-nowrap">
                      mayabeautyspa@gmail.com
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#1B1B1B] text-white font-ebgaramond text-center md:px-0 px-4 text-base py-4">
        <h3>Copyright 2024 - Designed for Mayabeauty by mayadihno</h3>
      </div>
    </div>
  );
};

export default Footer;
