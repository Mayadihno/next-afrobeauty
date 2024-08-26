import { Metadata } from "next";
import React from "react";
import SellerOrders from "../_components/sellerOrders/SellerOrders";

export const metadata: Metadata = {
  title: "Seller Orders page",
  description: "Seller Orders page : MayaBeauty store",
};

const page = () => {
  return <SellerOrders />;
};

export default page;
