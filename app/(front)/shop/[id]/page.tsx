import React from "react";
import SellerShop from "../../_components/shop/SellerShop";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SellerShop shopId={params.id} />
    </div>
  );
};

export default page;
