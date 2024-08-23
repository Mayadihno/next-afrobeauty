import Faq from "@/components/faq/Faq";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "F.A.Q",
  description: "F.A.Q : MayaBeauty store",
};

const page = () => {
  return <Faq />;
};

export default page;
