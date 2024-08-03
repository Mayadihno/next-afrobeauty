"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

const Navbar = () => {
  const { seller } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("sellerSessionToken");
    router.push("/");
  };
  return (
    <header className="flex justify-between h-14 font-ebgaramond items-center gap-4 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6">
      <h3 className="text-2xl">{seller.data?.shopName}</h3>
      <div className="flex space-x-5 items-center">
        <Link
          href={"/"}
          className="bg-black text-white p-2 hover:bg-[black] rounded-[5px]"
        >
          Profile
        </Link>
        <Button
          variant={"secondary"}
          onClick={handleLogout}
          className="bg-black text-white hover:bg-[black] p-2 rounded-[5px]"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
