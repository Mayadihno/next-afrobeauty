import React from "react";
import Login from "../(Auth)/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login page",
  description: "Login page : MayaBeauty store",
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
