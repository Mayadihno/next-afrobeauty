"use client";
import {
  accessories,
  foods,
  hair,
  hairCare,
  kids,
  lounge,
  skinCare,
} from "@/utils/config/data";
import { ICONS } from "@/utils/icons";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import AccordionNav from "./AccordionNav";

const Navitems = () => {
  return (
    <div className="relative z-10 text-white p-4">
      <div className="hidden md:block">
        <div className="container mx-auto flex space-x-5">
          <div className="relative navbar">
            <Link href="/" className="focus:outline-none">
              Home
            </Link>
          </div>
          <div className="relative navbar">
            <Link href="/brands" className="focus:outline-none">
              Brands
            </Link>
          </div>

          <Dropdown
            title="Skin Care"
            items={skinCare}
            icon={<ICONS.down size={15} />}
          />
          <Dropdown
            title="Hair Care"
            items={hairCare}
            icon={<ICONS.down size={15} />}
          />
          <Dropdown title="Hair" items={hair} icon={<ICONS.down size={15} />} />
          <Dropdown title="Kids" items={kids} icon={<ICONS.down size={15} />} />
          <Dropdown
            title="Accessories"
            items={accessories}
            icon={<ICONS.down size={15} />}
          />
          <Dropdown
            title="Lounge"
            items={lounge}
            icon={<ICONS.down size={15} />}
          />
          <Dropdown
            title="Food"
            items={foods}
            icon={<ICONS.down size={15} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Navitems;
