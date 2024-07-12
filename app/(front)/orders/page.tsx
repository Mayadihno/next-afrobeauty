import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";
import React from "react";
import Orders from "../_components/orders/Orders";

const page = () => {
  return (
    <UserProtectedRoute>
      <Orders />
    </UserProtectedRoute>
  );
};

export default page;
