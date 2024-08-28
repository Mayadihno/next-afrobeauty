import React from "react";
import CreateEvents from "../_components/event/CreateEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event",
  description: "Create Events | Mayabeauty Store",
};

const page = () => {
  return <CreateEvents />;
};

export default page;
