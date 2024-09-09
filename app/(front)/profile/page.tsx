import { Metadata } from "next";
import React from "react";
import Profile from "../_components/profile/Profile";
import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";

export const metadata: Metadata = {
  title: "User profile page",
  description: "User profile : MayaBeauty store",
};
const page = () => {
  return (
    <div>
      <UserProtectedRoute>
        <Profile />
      </UserProtectedRoute>
    </div>
  );
};

export default page;
