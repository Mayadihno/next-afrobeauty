import React from "react";
import EditProduct from "../../_components/Products/EditProduct";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EditProduct productId={params.id} />
    </div>
  );
};

export default page;
