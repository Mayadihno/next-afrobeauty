import React from "react";
import { Metadata } from "next";
import AboutUs from "@/components/aboutUs/AboutUs";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us : MayaBeauty store",
};

const page = () => {
  return <AboutUs />;
};

export default page;
