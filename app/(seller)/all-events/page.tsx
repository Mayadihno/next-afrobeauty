import { Metadata } from "next";
import React from "react";
import AllEvent from "../_components/event/AllEvent";

export const metadata: Metadata = {
  title: "All Events",
  description: "All Events | Mayabeauty Store",
};

const page = () => {
  return <AllEvent />;
};

export default page;
