"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slice/userSlice";
import { removeItem } from "@/utils/config/storage";

const Dropdown = () => {
  const { isAuthenticated, buyer } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        dispatch(logout());
        removeItem("sessionToken");
        router.push("/");
        toast.success("Logged out successfully");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="pt-2">
      {isAuthenticated && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {buyer ? (
                <CircleUser className="h-[30px] w-[30px]" />
              ) : (
                <AvatarFallback>MOB</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#b10c61c1] text-white rounded-xl border-[#b10c61c1] font-ebgaramond font-normal"
          >
            <DropdownMenuLabel className="text-xs">
              {buyer.data?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem className="text-center" onClick={closeDropdown}>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem onClick={closeDropdown}>
              <Link href={"/orders"}>Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem onClick={closeDropdown}>
              <Link href={"/change-password"}>Change Password</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
            >
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Dropdown;
