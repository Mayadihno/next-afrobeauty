import React from "react";
import Register from "../(Auth)/register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account page",
  description: "Create Account : MayaBeauty store",
};

const page = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default page;
