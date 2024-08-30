import { Metadata } from "next";
import React from "react";
import DiscountCode from "../_components/DiscountCode/DiscountCode";

export const metadata: Metadata = {
  title: "Discount Codes",
  description: "Discount Codes : Mayabeauty store",
};

const page = () => {
  return <DiscountCode />;
};

export default page;
