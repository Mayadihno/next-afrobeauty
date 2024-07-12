import { Metadata } from "next";
import React from "react";
import Payment from "../_components/payment/Payment";
import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";

export const metadata: Metadata = {
  title: "Payment page",
  description: "Payment page : MayaBeauty store",
};

const page = () => {
  return (
    <div className="">
      <UserProtectedRoute>
        <Payment />
      </UserProtectedRoute>
    </div>
  );
};

export default page;
