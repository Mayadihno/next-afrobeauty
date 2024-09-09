"use client";
import React from "react";
import Card from "../productCard/Card";
import { useGetRelatedProductQuery } from "@/redux/rtk/products";
import { Product } from "@/types/types";

const RelatedProduct = ({ params }: { params: { id: string } }) => {
  const { data } = useGetRelatedProductQuery(params.id);

  if (!data) {
    return (
      <div className="text-2xl font-bold my-5 pl-5">
        No related products found
      </div>
    );
  }

  return (
    <div className="my-10 px-5 border-t-2">
      <h1 className="text-2xl font-ebgaramond font-medium py-3">
        Related Products
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-y-5 gap-x-7">
        {data &&
          data.relatedProducts.map((item: Product) => (
            <div className="" key={item._id}>
              <Card item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
