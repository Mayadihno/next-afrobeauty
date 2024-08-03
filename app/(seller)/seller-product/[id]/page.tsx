import React from "react";
import ViewProduct from "../../_components/Products/ViewProduct";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ViewProduct productId={params.id} />
    </div>
  );
};

export default page;
