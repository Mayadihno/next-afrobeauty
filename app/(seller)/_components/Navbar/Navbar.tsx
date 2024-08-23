"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { seller } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("sellerSessionToken");
    toast.success("Logout successfull");
    router.push("/seller-login");
  };
  return (
    <header className="flex justify-between h-14 font-ebgaramond items-center gap-4 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6">
      <h3 className="text-2xl">{seller.data?.shopName}</h3>
      <div className="flex space-x-5 items-center">
        {pathName === "/seller-profile" ? (
          <Button
            onClick={() => router.back()}
            className="bg-black text-white py-2 px-4 hover:bg-[black] rounded-[5px]"
          >
            Back
          </Button>
        ) : (
          <Link
            href={"/seller-profile"}
            className="bg-black text-white p-2 hover:bg-[black] rounded-[5px]"
          >
            Profile
          </Link>
        )}
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
