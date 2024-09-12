"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import { ICONS } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import { links } from "../sidebar/Sidebar";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { seller } = useAppSelector((state) => state.users);
  const [show, setShow] = useState(false);
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

  const closeSheet = () => {
    setShow(!show);
  };
  return (
    <header className="flex justify-between h-14 font-ebgaramond items-center gap-4 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6">
      <div className="block md:hidden">
        <Sheet open={show} onOpenChange={setShow}>
          <SheetTrigger>
            <ICONS.menu size={25} />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white w-[65%]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <span className="text-lg font-semibold font-urbanist">
                  Seller Menu
                </span>
              </SheetTitle>
              <SheetDescription className="h-[800px] overflow-y-scroll" asChild>
                <div className="flex-1">
                  <nav className="grid items-start space-y-5 text-lg font-medium">
                    {links.map((item, i) => {
                      const Icon = item.icons;
                      return (
                        <Link
                          href={item.link ?? ""}
                          key={i}
                          className={cn(
                            "flex items-center gap-3 rounded-lg py-2",
                            pathName === item.link
                              ? " bg-slate-100 text-lg rounded-xl"
                              : "",
                            item.mobileOnly ? "md:hidden" : ""
                          )}
                          onClick={closeSheet}
                        >
                          <Icon className="h-6 w-6" />
                          <span className="">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <h3 className="text-2xl">{seller.data?.shopName}</h3>
      <div className="flex md:hidden items-center space-x-2">
        <Link href="/seller-dashboard" className="w-[45px] h-[45px]">
          <Image
            src={seller.data?.image || "/default-image.jpg"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full w-full h-full object-cover"
          />
        </Link>
        <div className="" onClick={handleLogout}>
          <BiLogOutCircle size={25} />
        </div>
      </div>
      <div className="md:flex space-x-5 items-center hidden">
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
