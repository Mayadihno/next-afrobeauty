import React from "react";
import SellerHeader from "../../(seller)/_components/sellerHeader/SellerHeader";
import Auth from "../../(seller)/_components/seller-auth/Auth";

const page = () => {
  return (
    <div className="">
      <SellerHeader />
      <div className="">
        <Auth />
      </div>
    </div>
  );
};

export default page;
