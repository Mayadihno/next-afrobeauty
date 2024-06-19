import { product } from "@/utils/config/products";
import React from "react";
import Card from "../productCard/Card";

const RelatedProduct = ({ params }: { params: { id: number } }) => {
  const currentProduct = product.find((item) => item.id === Number(params.id));

  if (!currentProduct) {
    return <div>No related products found</div>;
  }

  const relatedProducts = product.filter(
    (item) =>
      item.category === currentProduct.category && item.id !== currentProduct.id
  );
  return (
    <div className="my-10 px-5 border-t-2">
      <h1 className="text-2xl font-ebgaramond font-medium py-3">
        Related Products
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-10 gap-y-5">
        {relatedProducts.map((item) => (
          <div className="md:px-16 " key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
