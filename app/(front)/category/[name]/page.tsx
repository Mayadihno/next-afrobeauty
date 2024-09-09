import React from "react";
import Category from "../../_components/categories/Category";

const page = ({ params }: { params: { name: string } }) => {
  const decodedCategory = decodeURIComponent(params.name);
  return (
    <div>
      <Category category={decodedCategory} />
    </div>
  );
};

export default page;
