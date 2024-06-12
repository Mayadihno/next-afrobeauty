"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";

interface DropdownItem {
  id: number;
  label: string;
  link: string;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  icon: ReactNode;
}
const Dropdown = ({ title, items, icon }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="navbar">
        <Link
          href="#"
          className="flex items-center space-x-1 focus:outline-none"
        >
          <span>{title}</span> {icon}
        </Link>
      </div>
      <div className="mt-3">
        {isOpen && (
          <div className="absolute border-t-[#B10C62] border-t-[2px] bg-white font-ebgaramond text-sm text-black w-56 border shadow-sm">
            {items.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="block px-3 py-2 hover:bg-gray-200 border-b-1 border-t-0 border-l-0 border-r-0 border"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
