import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";
import React from "react";
import ChangePassword from "../_components/changePassword/ChangePassword";

const page = () => {
  return (
    <div>
      <UserProtectedRoute>
        <ChangePassword />
      </UserProtectedRoute>
    </div>
  );
};

export default page;
