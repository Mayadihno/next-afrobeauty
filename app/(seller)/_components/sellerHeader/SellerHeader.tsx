import React from "react";
import logo from "../../../../public/assets/myLogo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const SellerHeader = () => {
  return (
    <div className="bg-[#ffff] shadow-xl w-full py-3 px-6 text-center">
      <div className="flex justify-between items-center">
        <div className="image">
          <Image src={logo} alt="logo" width={80} height={80} />
        </div>
        <Link href="/">
          <Button
            variant={"secondary"}
            className="bg-black text-white hover:bg-[black] px-6 py-3 rounded-[10px]"
          >
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerHeader;
