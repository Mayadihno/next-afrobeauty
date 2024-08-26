import { Metadata } from "next";
import React from "react";
import OrderDetails from "../../_components/sellerOrders/OrderDetails";

export const metadata: Metadata = {
  title: "Seller Orders Details",
  description: "Seller Orders Details : MayaBeauty store",
};
const page = ({ params }: { params: { id: string } }) => {
  return <OrderDetails orderId={params.id} />;
};

export default page;
