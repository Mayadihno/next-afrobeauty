import React from "react";
import StartSelling from "../../(seller)/_components/start-selling/StartSelling";
import SellerHeader from "../../(seller)/_components/sellerHeader/SellerHeader";

const page = () => {
  return (
    <div className="">
      <SellerHeader />
      <div className="my-10">
        <StartSelling />
      </div>
    </div>
  );
};

export default page;
