import ContactUs from "@/components/contactUs/ContactUs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us : MayaBeauty store",
};

const page = () => {
  return <ContactUs />;
};

export default page;
