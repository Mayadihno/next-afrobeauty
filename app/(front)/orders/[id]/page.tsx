import UserProtectedRoute from "@/components/protectedRoute/UserProtectedRoute";
import React from "react";
import OrderDetails from "../../_components/orders/OrderDetails";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <UserProtectedRoute>
      <OrderDetails orderId={params.id} />
    </UserProtectedRoute>
  );
};

export default page;
