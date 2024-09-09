import React from "react";
import Subcategory from "../../_components/subcategory/Subcategory";

const page = ({ params }: { params: { name: string } }) => {
  const decodedCategory = decodeURIComponent(params.name);
  return <Subcategory subCategory={decodedCategory} />;
};

export default page;
