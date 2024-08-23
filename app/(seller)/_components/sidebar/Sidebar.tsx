"use client";
import Link from "next/link";
import React from "react";
import { Home, Package, Package2, Settings, ShoppingCart } from "lucide-react";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";

export default function Sidebar() {
  const { seller } = useAppSelector((state) => state.users);
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      link: "/seller-dashboard",
      icons: Home,
    },
    {
      name: "Orders",
      link: "/seller-orders",
      icons: ShoppingCart,
      badgeCount: 6,
    },
    {
      name: "Product",
      link: "/seller-product",
      icons: Package,
    },
    {
      name: "Create Product",
      link: "/create-product",
      icons: AiOutlineFolderAdd,
    },
    {
      name: "Events",
      link: "/create-events",
      icons: MdOutlineLocalOffer,
    },
    {
      name: "All Events",
      link: "/all-events",
      icons: VscNewFile,
    },
    {
      name: "Shop Inbox",
      link: "/dashboard/customers",
      icons: BiMessageSquareDetail,
    },
    {
      name: "Discounts Codes",
      link: "/",
      icons: AiOutlineGift,
    },
    {
      name: "Withdrawal",
      link: "/",
      icons: CiMoneyBill,
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icons: Settings,
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block font-ebgaramond ">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/seller-dashboard" className="w-[45px] h-[45px]">
            <Image
              src={seller.data?.image || "/default-image.jpg"}
              alt="logo"
              width={50}
              height={50}
              className="rounded-full w-full h-full object-cover"
            />
          </Link>
          <div className="w-[20px] h-[20px] rounded-full flex justify-center items-center bg-green-500 animate-pulse" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start space-y-5 px-2 text-lg font-medium lg:px-4">
            {links.map((item, i) => {
              const Icon = item.icons;
              return (
                <Link
                  href={item.link}
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.link
                      ? " bg-slate-100 rounded-xl font-bold text-secondary"
                      : ""
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {item.name}
                  {item.badgeCount && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badgeCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
