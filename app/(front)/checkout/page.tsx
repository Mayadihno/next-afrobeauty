import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";
import React from "react";
import Checkout from "../_components/checkout/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout page",
  description: "Checkout page : MayaBeauty store",
};

const page = () => {
  return (
    <div>
      <UserProtectedRoute>
        <Checkout />
      </UserProtectedRoute>
    </div>
  );
};

export default page;
